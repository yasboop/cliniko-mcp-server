#!/bin/bash

# Railway Deployment Script for Cliniko MCP Server
# Usage: ./deploy_railway.sh

set -e

echo "🚀 Deploying Cliniko MCP Server to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Login to Railway
echo "🔑 Logging into Railway..."
railway login

# Initialize project
echo "📁 Initializing Railway project..."
railway init --name cliniko-mcp-server --source . || echo "Project already exists"

# Set environment variables
echo "⚙️  Setting environment variables..."
echo "Please enter your Cliniko API key:"
read -s CLINIKO_API_KEY

railway variables set CLINIKO_API_KEY="$CLINIKO_API_KEY"
railway variables set HOST="0.0.0.0"
railway variables set PORT="8000"

# Deploy
echo "🚀 Deploying to Railway..."
railway up

# Get the deployment URL
echo "🌐 Getting deployment URL..."
sleep 5
DEPLOYMENT_URL=$(railway domain)

echo "✅ Deployment complete!"
echo "🌐 Your MCP server is available at: $DEPLOYMENT_URL"
echo "🏥 Health check: $DEPLOYMENT_URL/health"
echo ""
echo "📋 Next steps:"
echo "1. Test the health endpoint: curl $DEPLOYMENT_URL/health"
echo "2. Configure Eleven Labs with this URL"
echo "3. Test the MCP tools with Eleven Labs"

echo ""
echo "🎉 Ready for production!"
