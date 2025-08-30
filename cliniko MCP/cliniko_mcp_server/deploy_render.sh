#!/bin/bash

# Render Deployment Script for Cliniko MCP Server
# Usage: ./deploy_render.sh

set -e

echo "🚀 Preparing Cliniko MCP Server for Render deployment..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit: Cliniko MCP Server"
fi

# Check if remote origin exists
if ! git remote get-url origin >/dev/null 2>&1; then
    echo "⚠️  No git remote found. You'll need to:"
    echo "   1. Create a new repository on GitHub/GitLab"
    echo "   2. Add it as remote: git remote add origin <your-repo-url>"
    echo "   3. Push: git push -u origin main"
    echo ""
    echo "Then connect your repository to Render."
else
    echo "📤 Pushing to git remote..."
    git add .
    git commit -m "Deploy to Render: Cliniko MCP Server" || echo "No changes to commit"
    git push origin main
fi

echo "✅ Code pushed to repository!"
echo ""
echo "🌐 Next steps for Render deployment:"
echo ""
echo "1. Go to https://render.com"
echo "2. Sign up/Login to your account"
echo "3. Click 'New' → 'Web Service'"
echo "4. Connect your GitHub/GitLab repository"
echo "5. Configure the service:"
echo "   - Runtime: Python 3"
echo "   - Build Command: pip install -r requirements.txt"
echo "   - Start Command: python main.py"
echo "   - Plan: Free (750 hours/month)"
echo ""
echo "6. Set Environment Variables:"
echo "   - CLINIKO_API_KEY: [Your Cliniko API key]"
echo "   - HOST: 0.0.0.0"
echo "   - PORT: 10000"
echo ""
echo "7. Deploy!"
echo ""
echo "🎉 Your MCP server will be live at: https://your-app.onrender.com"
echo ""
echo "📋 After deployment:"
echo "   - Test health: https://your-app.onrender.com/health"
echo "   - Configure Eleven Labs with the deployment URL"
echo ""
echo "Need help? Check the render.yaml file for configuration details."
