# Daily DSA — Production Deployment Guide

This guide walks through deploying the Daily DSA application to a production environment accessible from any device or internet connection with full security, database persistence, and sandbox support.

---

## 📋 Production Deployment Matrix

| Platform | Deployment Type | Code Sandbox Support | HTTPS & SSL | Recommended For |
|---|---|---|---|---|
| **Railway** | Docker Container | 🟢 Native (gcc/python3 in container) | 🟢 Automatic | 🏆 **Best overall (simplest full-stack)** |
| **Render** | Web Service (Docker) | 🟢 Native (via Dockerfile) | 🟢 Automatic | 🥈 **Excellent free/low-cost tier** |
| **Fly.io** | MicroVM Container | 🟢 Full Linux Isolation | 🟢 Automatic | 🥉 **Global edge performance** |
| **VPS (Ubuntu/Debian)** | Docker Compose | 🟢 Hardened Docker Sandbox | 🟢 via Caddy / Nginx Certbot | 🛠️ **Maximum control & unlimited usage** |
| **Vercel** | Serverless Next.js | ⚠️ UI & AI Work; Judge requires external service | 🟢 Automatic | 🌐 **Frontend-first deployment** |

---

## 🔑 Required Production Environment Variables

Configure these variables in your deployment dashboard (or `.env` file on your server):

| Variable | Description | Example |
|---|---|---|
| `MONGODB_URI` | MongoDB Atlas cluster connection string | `mongodb+srv://user:pass@cluster.mongodb.net/daily_dsa?retryWrites=true&w=majority` |
| `JWT_SECRET` | Strong random secret for signing session cookies | `b9f348e...` *(Generate via `openssl rand -hex 32`)* |
| `GEMINI_API_KEY` | Google Gemini API key for Socratic AI coach | `AIzaSy...` *(Free from [Google AI Studio](https://aistudio.google.com))* |
| `NODE_ENV` | Production environment flag | `production` |
| `PORT` | Web server port *(auto-assigned on most clouds)* | `3000` |

> [!IMPORTANT]
> **MongoDB Network Access Whitelist**:
> In MongoDB Atlas, go to **Network Access** > **IP Access List**. If deploying to dynamic cloud platforms (Render, Railway, Vercel), add `0.0.0.0/0` (Allow Access from Anywhere) protected by strong database user credentials.

---

## 🚀 Option 1: One-Click Cloud Deployment (Railway / Render)

### Deploying on Railway (Recommended)
1. Fork or push your repository to GitHub: `https://github.com/ritvikabafna/daily-dsa`.
2. Go to [railway.app](https://railway.app) and click **"New Project"** > **"Deploy from GitHub repo"**.
3. Select `daily-dsa`. Railway automatically detects the production [`Dockerfile`](../Dockerfile) with GCC, G++, and Python 3 pre-installed.
4. In the Railway dashboard under **Variables**, add:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `GEMINI_API_KEY`
   - `NODE_ENV=production`
5. Click **Deploy**. Railway provisions your container, assigns an automated SSL domain (`https://daily-dsa-production.up.railway.app`), and starts serving.

### Deploying on Render
1. Go to [render.com](https://render.com) and click **"New +"** > **"Web Service"**.
2. Connect your GitHub repository.
3. Select **"Docker"** as the runtime (it will automatically use [`Dockerfile`](../Dockerfile)).
4. Under **Environment Variables**, add `MONGODB_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, and `NODE_ENV=production`.
5. Select the Free or Starter instance and click **"Create Web Service"**.

---

## 🐳 Option 2: Self-Hosted VPS / Cloud VM (Docker Compose)

For deployment on an AWS EC2, DigitalOcean Droplet, Linode, or any Ubuntu/Debian server:

### 1. Provision Server & Install Docker
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose git
sudo systemctl enable --now docker
```

### 2. Clone Repository
```bash
git clone https://github.com/ritvikabafna/daily-dsa.git
cd daily-dsa
```

### 3. Create Production `.env`
```bash
cat << 'EOF' > .env
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_strong_random_secret_here
GEMINI_API_KEY=your_gemini_api_key
EOF
```

### 4. Build and Run Container
```bash
docker-compose up -d --build
```

### 5. Configure HTTPS & SSL with Caddy (Automatic Reverse Proxy)
```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update && sudo apt install caddy -y

# Configure /etc/caddy/Caddyfile:
# your-domain.com {
#     reverse_proxy localhost:3000
# }
sudo systemctl reload caddy
```
Caddy automatically provisions and renews Let's Encrypt SSL certificates for HTTPS.

---

## 🔍 Verification & Health Monitoring

### 1. Live Health Check Endpoint
Once deployed, verify your instance by querying the automated health monitor:
```bash
curl https://your-domain.com/api/health
```
**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-10-18T17:16:11.472Z",
  "uptimeSeconds": 1420,
  "environment": "production",
  "database": {
    "status": "connected",
    "latencyMs": 42
  },
  "system": {
    "nodeVersion": "v20.x",
    "memory": {
      "rssMb": 180.25,
      "heapUsedMb": 65.4
    }
  },
  "features": {
    "geminiAiConfigured": true,
    "jwtConfigured": true
  }
}
```

### 2. Free Uptime Monitoring Setup
To receive instant alerts if the site or database drops:
1. Sign up for a free monitor on [UptimeRobot](https://uptimerobot.com) or [BetterUptime](https://betterstack.com).
2. Set up an **HTTP(s) Monitor** pointing to `https://your-domain.com/api/health`.
3. Set the interval to **5 minutes**. Expected status code: `200`.

---

## 📱 Testing From Different Devices Checklist

- [ ] **Desktop Browser**: Solve problem #1 in C++, run code, check execution runtime, and submit.
- [ ] **Mobile Device (Phone / Tablet)**:
  - Open `https://your-domain.com` in mobile browser.
  - Test responsive layout and touch interactions.
  - Switch themes (Dark / Light) via header toggle.
- [ ] **AI Socratic Coach**:
  - Run code with a deliberate mistake on mobile/tablet.
  - Tap **`🤖 Explain Mistake with AI`** to verify responsive slide-over drawer and Gemini streaming.
- [ ] **Authentication Persistence**:
  - Log in on one device, close the browser, and reopen to verify session persistence via secure cookie.
