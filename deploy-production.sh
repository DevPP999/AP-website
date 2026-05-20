#!/bin/bash

# Production Deployment Script
# Run this script to deploy to production

echo "🚀 Starting Production Deployment..."

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    echo "❌ Error: .env.production file not found!"
    echo "Please copy env.production.example to .env.production and fill in your values."
    exit 1
fi

# Check if all required environment variables are set
echo "🔍 Checking environment variables..."

required_vars=(
    "NEXT_PUBLIC_SITE_URL"
    "GOOGLE_CLIENT_EMAIL"
    "GOOGLE_PRIVATE_KEY"
    "GOOGLE_SHEET_ID"
    "DISCORD_WEBHOOK_URL"
    "NEXT_PUBLIC_GA_ID"
)

missing_vars=()

for var in "${required_vars[@]}"; do
    if ! grep -q "^${var}=" .env.production || grep -q "^${var}=$" .env.production || grep -q "^${var}=your_" .env.production; then
        missing_vars+=("$var")
    fi
done

if [ ${#missing_vars[@]} -ne 0 ]; then
    echo "❌ Error: Missing or incomplete environment variables:"
    printf '%s\n' "${missing_vars[@]}"
    echo "Please update .env.production with your actual values."
    exit 1
fi

echo "✅ Environment variables check passed!"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Run linting
echo "🔍 Running linting..."
npm run lint

# Run type checking
echo "🔍 Running type checking..."
npm run type-check

# Build the application
echo "🏗️ Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix the errors before deploying."
    exit 1
fi

echo "✅ Build successful!"

# Run production tests (if available)
if [ -f "package.json" ] && grep -q '"test:prod"' package.json; then
    echo "🧪 Running production tests..."
    npm run test:prod
fi

# Create production build info
echo "📝 Creating production build info..."
cat > build-info.json << EOF
{
  "buildTime": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "version": "$(node -p "require('./package.json').version")",
  "nodeVersion": "$(node --version)",
  "npmVersion": "$(npm --version)",
  "gitCommit": "$(git rev-parse HEAD 2>/dev/null || echo 'unknown')",
  "gitBranch": "$(git branch --show-current 2>/dev/null || echo 'unknown')"
}
EOF

echo "✅ Production build ready!"
echo ""
echo "📋 Next steps:"
echo "1. Upload the .next folder and other files to your server"
echo "2. Set up your web server (Nginx/Apache) to serve the application"
echo "3. Configure your domain and SSL certificate"
echo "4. Set up monitoring and logging"
echo "5. Test the application thoroughly"
echo ""
echo "🔗 Useful URLs:"
echo "- Health Check: https://yourdomain.com/api/health"
echo "- Sitemap: https://yourdomain.com/sitemap.xml"
echo "- Robots: https://yourdomain.com/robots.txt"
echo ""
echo "🎉 Deployment preparation complete!"
