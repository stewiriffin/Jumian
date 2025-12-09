import axios from 'axios'
import { env } from './env'
import logger from './logger'

interface MpesaAuthResponse {
  access_token: string
  expires_in: string
}

interface STKPushRequest {
  phoneNumber: string
  amount: number
  accountReference: string
  transactionDesc: string
}

interface STKPushResponse {
  MerchantRequestID: string
  CheckoutRequestID: string
  ResponseCode: string
  ResponseDescription: string
  CustomerMessage: string
}

interface STKQueryResponse {
  ResponseCode: string
  ResponseDescription: string
  MerchantRequestID: string
  CheckoutRequestID: string
  ResultCode: string
  ResultDesc: string
}

/**
 * M-Pesa Daraja API integration service
 */
class MpesaService {
  private baseUrl: string
  private consumerKey: string
  private consumerSecret: string
  private shortcode: string
  private passkey: string
  private environment: 'sandbox' | 'production'

  constructor() {
    this.environment = (process.env.MPESA_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox'
    this.baseUrl =
      this.environment === 'production'
        ? 'https://api.safaricom.co.ke'
        : 'https://sandbox.safaricom.co.ke'

    this.consumerKey = env.MPESA_CONSUMER_KEY || ''
    this.consumerSecret = env.MPESA_CONSUMER_SECRET || ''
    this.shortcode = env.MPESA_SHORTCODE || ''
    this.passkey = env.MPESA_PASSKEY || ''

    if (!this.consumerKey || !this.consumerSecret) {
      logger.warn('M-Pesa credentials not configured')
    }
  }

  /**
   * Check if M-Pesa is configured
   */
  public isConfigured(): boolean {
    return !!(
      this.consumerKey &&
      this.consumerSecret &&
      this.shortcode &&
      this.passkey
    )
  }

  /**
   * Get OAuth access token from M-Pesa API
   */
  private async getAccessToken(): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('M-Pesa not configured')
    }

    try {
      const auth = Buffer.from(
        `${this.consumerKey}:${this.consumerSecret}`
      ).toString('base64')

      const response = await axios.get<MpesaAuthResponse>(
        `${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
        {
          headers: {
            Authorization: `Basic ${auth}`,
          },
          timeout: 10000,
        }
      )

      logger.debug('M-Pesa access token obtained')
      return response.data.access_token
    } catch (error) {
      logger.error('M-Pesa authentication failed', error as Error)
      throw new Error('Failed to authenticate with M-Pesa')
    }
  }

  /**
   * Generate password and timestamp for STK Push
   */
  private generatePassword(): { password: string; timestamp: string } {
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:TZ.]/g, '')
      .slice(0, 14)

    const password = Buffer.from(
      `${this.shortcode}${this.passkey}${timestamp}`
    ).toString('base64')

    return { password, timestamp }
  }

  /**
   * Format phone number to M-Pesa format (254XXXXXXXXX)
   */
  private formatPhoneNumber(phoneNumber: string): string {
    // Remove spaces and special characters
    let formatted = phoneNumber.replace(/[\s\-\(\)]/g, '')

    // Remove + prefix if present
    formatted = formatted.replace(/^\+/, '')

    // Handle different Kenyan formats
    if (formatted.startsWith('0')) {
      // 0712345678 -> 254712345678
      formatted = '254' + formatted.slice(1)
    } else if (formatted.startsWith('254')) {
      // Already in correct format
      formatted = formatted
    } else if (formatted.startsWith('7') || formatted.startsWith('1')) {
      // 712345678 -> 254712345678
      formatted = '254' + formatted
    } else {
      throw new Error('Invalid phone number format')
    }

    // Validate length (should be 12 digits: 254XXXXXXXXX)
    if (formatted.length !== 12) {
      throw new Error('Phone number must be 9 digits after country code')
    }

    return formatted
  }

  /**
   * Initiate STK Push (Lipa Na M-Pesa Online)
   */
  public async initiateSTKPush(
    request: STKPushRequest
  ): Promise<STKPushResponse> {
    if (!this.isConfigured()) {
      throw new Error('M-Pesa not configured. Add credentials to .env file.')
    }

    try {
      const accessToken = await this.getAccessToken()
      const { password, timestamp } = this.generatePassword()
      const phoneNumber = this.formatPhoneNumber(request.phoneNumber)

      const payload = {
        BusinessShortCode: this.shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.ceil(request.amount), // M-Pesa requires integer
        PartyA: phoneNumber,
        PartyB: this.shortcode,
        PhoneNumber: phoneNumber,
        CallBackURL: `${env.NEXTAUTH_URL}/api/mpesa/callback`,
        AccountReference: request.accountReference,
        TransactionDesc: request.transactionDesc,
      }

      logger.info('Initiating STK Push', {
        phoneNumber,
        amount: request.amount,
        reference: request.accountReference,
      })

      const response = await axios.post<STKPushResponse>(
        `${this.baseUrl}/mpesa/stkpush/v1/processrequest`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      )

      if (response.data.ResponseCode === '0') {
        logger.info('STK Push initiated successfully', {
          merchantRequestId: response.data.MerchantRequestID,
          checkoutRequestId: response.data.CheckoutRequestID,
        })
      } else {
        logger.warn('STK Push returned non-zero response code', {
          responseCode: response.data.ResponseCode,
          responseDescription: response.data.ResponseDescription,
        })
      }

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('STK Push request failed', {
          status: error.response?.status,
          data: error.response?.data,
        })
        throw new Error(
          error.response?.data?.errorMessage ||
            error.response?.data?.ResponseDescription ||
            'Failed to initiate M-Pesa payment'
        )
      }

      logger.error('STK Push failed', error as Error)
      throw new Error('Failed to initiate M-Pesa payment')
    }
  }

  /**
   * Query STK Push transaction status
   */
  public async querySTKPushStatus(
    checkoutRequestId: string
  ): Promise<STKQueryResponse> {
    if (!this.isConfigured()) {
      throw new Error('M-Pesa not configured')
    }

    try {
      const accessToken = await this.getAccessToken()
      const { password, timestamp } = this.generatePassword()

      const payload = {
        BusinessShortCode: this.shortcode,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestId,
      }

      logger.info('Querying STK Push status', { checkoutRequestId })

      const response = await axios.post<STKQueryResponse>(
        `${this.baseUrl}/mpesa/stkpushquery/v1/query`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          timeout: 15000,
        }
      )

      logger.info('STK Push status queried', {
        checkoutRequestId,
        resultCode: response.data.ResultCode,
        resultDesc: response.data.ResultDesc,
      })

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('STK Push query failed', {
          status: error.response?.status,
          data: error.response?.data,
        })
        throw new Error(
          error.response?.data?.errorMessage ||
            'Failed to query M-Pesa payment status'
        )
      }

      logger.error('STK Push query failed', error as Error)
      throw new Error('Failed to query M-Pesa payment status')
    }
  }

  /**
   * Validate phone number format
   */
  public validatePhoneNumber(phoneNumber: string): boolean {
    try {
      this.formatPhoneNumber(phoneNumber)
      return true
    } catch {
      return false
    }
  }

  /**
   * Parse M-Pesa callback result
   */
  public parseCallbackResult(callbackData: any): {
    success: boolean
    resultCode: string
    resultDesc: string
    amount?: number
    mpesaReceiptNumber?: string
    transactionDate?: string
    phoneNumber?: string
  } {
    const stkCallback = callbackData.Body?.stkCallback

    if (!stkCallback) {
      return {
        success: false,
        resultCode: '1',
        resultDesc: 'Invalid callback data',
      }
    }

    const result: any = {
      success: stkCallback.ResultCode === 0,
      resultCode: stkCallback.ResultCode?.toString(),
      resultDesc: stkCallback.ResultDesc,
    }

    // Extract callback metadata if payment was successful
    if (stkCallback.CallbackMetadata?.Item) {
      const items = stkCallback.CallbackMetadata.Item
      const findItem = (name: string) =>
        items.find((item: any) => item.Name === name)?.Value

      result.amount = findItem('Amount')
      result.mpesaReceiptNumber = findItem('MpesaReceiptNumber')
      result.transactionDate = findItem('TransactionDate')?.toString()
      result.phoneNumber = findItem('PhoneNumber')?.toString()
    }

    return result
  }
}

// Export singleton instance
export const mpesa = new MpesaService()

// Export types
export type {
  STKPushRequest,
  STKPushResponse,
  STKQueryResponse,
}
