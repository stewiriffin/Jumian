import nodemailer from 'nodemailer'
import { env, isEmailConfigured } from './env'
import logger from './logger'

// Create transporter (only if email is configured)
let transporter: nodemailer.Transporter | null = null

if (isEmailConfigured) {
  try {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: parseInt(env.SMTP_PORT || '587'),
      secure: env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    })

    // Verify connection
    transporter.verify((error) => {
      if (error) {
        logger.error('Email transporter verification failed:', error)
      } else {
        logger.info('Email transporter is ready')
      }
    })
  } catch (error) {
    logger.error('Failed to initialize email transporter:', error)
  }
}

interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
}

/**
 * Send an email
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  if (!transporter) {
    logger.warn('Email not configured, skipping email send', { to, subject })
    return {
      success: false,
      error: 'Email not configured',
    }
  }

  try {
    const info = await transporter.sendMail({
      from: env.SMTP_FROM || env.SMTP_USER,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML tags for text version
    })

    logger.info('Email sent successfully', {
      messageId: info.messageId,
      to: Array.isArray(to) ? to : [to],
      subject,
    })

    return {
      success: true,
      messageId: info.messageId,
    }
  } catch (error) {
    logger.error('Failed to send email', error as Error, { to, subject })
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Email template: Order Confirmation
 */
export function orderConfirmationEmail(orderData: {
  id: string
  customerName: string
  total: number
  items: Array<{ name: string; quantity: number; price: number }>
  shippingAddress: any
}) {
  const itemsHtml = orderData.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">KES ${item.price.toFixed(2)}</td>
    </tr>
  `
    )
    .join('')

  return {
    subject: `Order Confirmation - #${orderData.id.slice(0, 8)}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #F68B1E 0%, #FF6B35 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Thank You for Your Order!</h1>
        </div>

        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px;">Hi ${orderData.customerName},</p>

          <p>We've received your order and we're getting it ready. You'll receive another email when your order ships.</p>

          <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h2 style="margin-top: 0; color: #F68B1E;">Order Details</h2>
            <p><strong>Order ID:</strong> #${orderData.id.slice(0, 8)}</p>

            <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
              <thead>
                <tr style="background: #f5f5f5;">
                  <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Product</th>
                  <th style="padding: 10px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
                  <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
                  <td style="padding: 10px; text-align: right; font-weight: bold; color: #F68B1E;">KES ${orderData.total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>

            <h3 style="color: #F68B1E;">Shipping Address</h3>
            <p style="margin: 5px 0;">${orderData.shippingAddress.address}</p>
            <p style="margin: 5px 0;">${orderData.shippingAddress.city}, ${orderData.shippingAddress.state || ''} ${orderData.shippingAddress.zipCode}</p>
            <p style="margin: 5px 0;">${orderData.shippingAddress.country || 'Kenya'}</p>
          </div>

          <p>If you have any questions, please don't hesitate to contact us.</p>

          <div style="text-align: center; margin-top: 30px;">
            <a href="${env.NEXTAUTH_URL}/orders/${orderData.id}" style="background: #F68B1E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Track Your Order</a>
          </div>
        </div>

        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
          <p>© ${new Date().getFullYear()} Jumian. All rights reserved.</p>
        </div>
      </body>
      </html>
    `,
  }
}

/**
 * Email template: Order Shipped
 */
export function orderShippedEmail(orderData: {
  id: string
  customerName: string
  trackingNumber?: string
}) {
  return {
    subject: `Your Order Has Shipped - #${orderData.id.slice(0, 8)}`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #F68B1E 0%, #FF6B35 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Your Order is on Its Way! 📦</h1>
        </div>

        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px;">Hi ${orderData.customerName},</p>

          <p>Great news! Your order has been shipped and is on its way to you.</p>

          <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h2 style="margin-top: 0; color: #F68B1E;">Shipping Information</h2>
            <p><strong>Order ID:</strong> #${orderData.id.slice(0, 8)}</p>
            ${orderData.trackingNumber ? `<p><strong>Tracking Number:</strong> ${orderData.trackingNumber}</p>` : ''}
          </div>

          <p>You should receive your order within 3-5 business days.</p>

          <div style="text-align: center; margin-top: 30px;">
            <a href="${env.NEXTAUTH_URL}/orders/${orderData.id}" style="background: #F68B1E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Track Your Order</a>
          </div>
        </div>

        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
          <p>© ${new Date().getFullYear()} Jumian. All rights reserved.</p>
        </div>
      </body>
      </html>
    `,
  }
}

/**
 * Email template: Welcome Email
 */
export function welcomeEmail(userData: { name: string; email: string }) {
  return {
    subject: 'Welcome to Jumian! 🎉',
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #F68B1E 0%, #FF6B35 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Welcome to Jumian! 🎉</h1>
        </div>

        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px;">Hi ${userData.name},</p>

          <p>Welcome to Jumian, your one-stop shop for everything you need!</p>

          <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h2 style="margin-top: 0; color: #F68B1E;">What's Next?</h2>
            <ul style="padding-left: 20px;">
              <li>Browse our wide selection of products</li>
              <li>Add items to your wishlist</li>
              <li>Get exclusive deals and promotions</li>
              <li>Enjoy fast and secure checkout</li>
            </ul>
          </div>

          <p>We're excited to have you with us!</p>

          <div style="text-align: center; margin-top: 30px;">
            <a href="${env.NEXTAUTH_URL}" style="background: #F68B1E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Start Shopping</a>
          </div>
        </div>

        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
          <p>© ${new Date().getFullYear()} Jumian. All rights reserved.</p>
        </div>
      </body>
      </html>
    `,
  }
}

/**
 * Email template: Password Reset
 */
export function passwordResetEmail(userData: {
  name: string
  resetToken: string
}) {
  const resetUrl = `${env.NEXTAUTH_URL}/auth/reset-password?token=${userData.resetToken}`

  return {
    subject: 'Reset Your Password - Jumian',
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #F68B1E 0%, #FF6B35 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Reset Your Password</h1>
        </div>

        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px;">Hi ${userData.name},</p>

          <p>We received a request to reset your password. Click the button below to create a new password:</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background: #F68B1E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
          </div>

          <p style="color: #666; font-size: 14px;">If you didn't request this, you can safely ignore this email. Your password won't change.</p>

          <p style="color: #666; font-size: 14px;">This link will expire in 1 hour.</p>
        </div>

        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
          <p>© ${new Date().getFullYear()} Jumian. All rights reserved.</p>
        </div>
      </body>
      </html>
    `,
  }
}

/**
 * Test email configuration
 */
export async function testEmailConfig(): Promise<boolean> {
  if (!transporter) {
    logger.error('Email not configured')
    return false
  }

  try {
    await transporter.verify()
    logger.info('Email configuration is valid')
    return true
  } catch (error) {
    logger.error('Email configuration test failed', error as Error)
    return false
  }
}
