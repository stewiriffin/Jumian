#!/bin/bash

# Wait for any running npm processes to complete
echo "Waiting for ongoing npm installations to complete..."
while pgrep -f "npm install" > /dev/null 2>&1; do
    sleep 5
    echo "Still waiting..."
done

echo "Installing remaining production dependencies..."
npm install --save ioredis winston nodemailer pg @sentry/nextjs axios

echo ""
echo "✅ All dependencies installed!"
echo ""
echo "Installed production dependencies:"
echo "  - ioredis (Redis client)"
echo "  - winston (Logging)"
echo "  - nodemailer (Email)"
echo "  - pg (PostgreSQL)"
echo "  - @sentry/nextjs (Error tracking)"
echo "  - axios (HTTP client)"
echo ""
echo "Installed development dependencies:"
echo "  - jest + @testing-library/* (Testing)"
echo "  - @playwright/test (E2E testing)"
echo "  - @types/* (TypeScript types)"
echo ""
echo "Next steps:"
echo "1. Add test scripts to package.json"
echo "2. Configure environment variables (.env)"
echo "3. Run 'npm run dev' to start"
