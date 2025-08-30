# 🚀 Deploy Cliniko MCP Server to Render

This guide will help you deploy your Cliniko MCP server to Render for production use with Eleven Labs.

## 📋 Prerequisites

- ✅ Cliniko API key (from Cliniko dashboard)
- ✅ GitHub/GitLab account
- ✅ Render account (free tier available)

## 🎯 Step-by-Step Deployment

### **Step 1: Prepare Your Code**

1. **Initialize Git Repository** (if not already done):
```bash
cd cliniko_mcp_server
git init
git add .
git commit -m "Initial commit: Cliniko MCP Server"
```

2. **Create GitHub/GitLab Repository**:
   - Go to GitHub.com → "New repository"
   - Name it `cliniko-mcp-server` or similar
   - Don't initialize with README (we already have files)

3. **Connect Local Repository**:
```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

### **Step 2: Deploy to Render**

#### **Option A: Automated Script** (Recommended)
```bash
cd cliniko_mcp_server
./deploy_render.sh
```

#### **Option B: Manual Deployment**

1. **Go to Render Dashboard**:
   - Visit [render.com](https://render.com)
   - Sign up/Login to your account

2. **Create New Web Service**:
   - Click **"New"** → **"Web Service"**
   - Connect your **GitHub/GitLab repository**
   - Select the repository you just created

3. **Configure the Service**:
   ```
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: python main.py
   Plan: Free (750 hours/month)
   ```

4. **Set Environment Variables**:
   ```
   CLINIKO_API_KEY = your_cliniko_api_key_here
   HOST = 0.0.0.0
   PORT = 10000
   ```

5. **Deploy**:
   - Click **"Create Web Service"**
   - Wait for deployment to complete (~2-3 minutes)

### **Step 3: Verify Deployment**

1. **Check Health Endpoint**:
```bash
curl https://your-app-name.onrender.com/health
```

Expected response:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2025-08-30T22:35:00Z",
  "api_key_configured": true
}
```

2. **Test MCP Tools** (optional):
```bash
curl https://your-app-name.onrender.com/tools/list_patients
```

## 🔧 Configuration Files

### **render.yaml** (Auto-deployment config)
```yaml
services:
  - type: web
    name: cliniko-mcp-server
    runtime: python3
    buildCommand: pip install -r requirements.txt
    startCommand: python main.py
    envVars:
      - key: CLINIKO_API_KEY
        sync: false
      - key: HOST
        value: 0.0.0.0
      - key: PORT
        value: 10000
    healthCheckPath: /health
    plan: free
```

### **Environment Variables**
```bash
# Required
CLINIKO_API_KEY=your_api_key_here

# Optional (with defaults)
HOST=0.0.0.0
PORT=10000  # Render uses port 10000
LOG_LEVEL=INFO
```

## 🎯 Eleven Labs Integration

Once deployed, your MCP server will be available at:
```
https://your-app-name.onrender.com
```

### **Configure Eleven Labs**:
```json
{
  "mcp_server_url": "https://your-app-name.onrender.com",
  "mcp_server_port": 443,
  "tools": [
    "create_appointment",
    "list_appointments",
    "update_appointment",
    "delete_appointment",
    "create_patient",
    "list_patients",
    "update_patient",
    "delete_patient"
  ]
}
```

## 📊 Render Features for MCP

### ✅ **Perfect for MCP Servers**:
- **Persistent containers** (not serverless functions)
- **24/7 uptime** on free tier
- **Automatic SSL** (HTTPS included)
- **Health checks** built-in
- **Environment variables** support
- **Python native** support

### 📈 **Scaling Options**:
- **Free Tier**: 750 hours/month (~25 days)
- **Starter Plan**: $7/month (unlimited hours)
- **Standard/Pro**: Advanced scaling and features

## 🔧 Troubleshooting

### **Build Failures**:
```bash
# Check build logs in Render dashboard
# Common issue: Missing dependencies
pip install -r requirements.txt
```

### **Health Check Failures**:
```bash
# Test locally first
python main.py
curl http://localhost:8000/health
```

### **MCP Connection Issues**:
```bash
# Verify the server is running
curl https://your-app.onrender.com/health

# Check Eleven Labs configuration
# Ensure the URL is correct and accessible
```

## 💰 Cost Breakdown

| Plan | Hours/Month | Price | Best For |
|------|-------------|--------|----------|
| **Free** | 750 | $0 | Testing & Development |
| **Starter** | Unlimited | $7/month | Production (light usage) |
| **Standard** | Unlimited | $25/month | Production (moderate usage) |

## 🚀 Quick Deployment (3 minutes)

```bash
# 1. Push to Git
cd cliniko_mcp_server
git add .
git commit -m "Ready for Render deployment"
git push origin main

# 2. Deploy on Render
# - Go to render.com → New Web Service
# - Connect your repo
# - Use the configuration above
# - Add CLINIKO_API_KEY environment variable
# - Deploy!

# 3. Test
curl https://your-app.onrender.com/health
```

## 🎉 Success Checklist

- [ ] Git repository created and pushed
- [ ] Render web service created
- [ ] Environment variables configured
- [ ] Health check passing
- [ ] Eleven Labs configured with deployment URL
- [ ] MCP tools tested successfully

## 📞 Support

### **Render Resources**:
- [Render Documentation](https://docs.render.com)
- [Python Deployment Guide](https://docs.render.com/deploy-python)
- [Troubleshooting Guide](https://docs.render.com/troubleshooting)

### **MCP Resources**:
- [FastMCP Documentation](https://gofastmcp.com)
- [Model Context Protocol](https://modelcontextprotocol.io)

---

**🎯 Your MCP server will be production-ready in ~5 minutes with this setup!** 🚀
