# Deploying to DigitalOcean Droplet via PuTTY

> Stack: **Next.js 15** · **Node.js** · **Nginx (reverse proxy)** · **PM2 (process manager)**

---

## Prerequisites

- DigitalOcean Droplet running **Ubuntu 22.04 / 24.04**
- PuTTY installed on your laptop
- Your repo pushed to GitHub (branch: `main` or `release`)
- Your Droplet's IP address

---

## PHASE 1 — Connect via PuTTY

1. Open **PuTTY**
2. In **Host Name** field enter: `root@YOUR_DROPLET_IP`
3. Port: `22` · Connection type: `SSH`
4. Click **Open** → accept the fingerprint → enter your root password

You are now inside the Droplet terminal.

---

## PHASE 2 — Update & Install Core Tools

Run each block one at a time. Wait for each to finish before the next.

```bash
# 1. Update package list
apt update && apt upgrade -y

# 2. Install Git
apt install -y git

# 3. Install Node.js 20 LTS (via NodeSource)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Verify versions
node -v    # should print v20.x.x
npm -v     # should print 10.x.x
git --version

# 4. Install PM2 globally (keeps Next.js alive after SSH disconnect)
npm install -g pm2

# 5. Install Nginx
apt install -y nginx

# 6. Allow Nginx through firewall
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw enable
ufw status
```

---

## PHASE 3 — Clone Your Repo onto the Droplet

```bash
# Create the web directory
mkdir -p /var/www/portfolio
cd /var/www/portfolio

# Clone your repo (replace with your actual GitHub URL)
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git .
```

> **If the repo is private**, generate a GitHub Personal Access Token (PAT) and clone with:
> `git clone https://YOUR_TOKEN@github.com/YOUR_USERNAME/YOUR_REPO.git .`

---

## PHASE 4 — Set Environment Variables

```bash
# Create .env.local on the server (never commit this file)
nano /var/www/portfolio/.env.local
```

pm2 start .next/standalone/server.js --name "portfolio"
Paste your production values inside nano:

```
EMAIL_ADDRESS=your-gmail@gmail.com
GMAIL_PASSKEY=xxxx xxxx xxxx xxxx
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_GTM=G-XXXXXXXXXX
NEXT_PUBLIC_RECAPTCHA_SECRET_KEY=your_recaptcha_secret
```

Save: `Ctrl+O` → `Enter` → `Ctrl+X`

---

## PHASE 5 — Install Dependencies & Build

```bash
cd /var/www/portfolio

# Install production dependencies
npm install

# Build the Next.js app (creates .next folder)
npm run build
```

> Build typically takes 1–3 minutes. You should see `✓ Compiled successfully` at the end.

---

## PHASE 6 — Start the App with PM2

```bash
cd /var/www/portfolio

# Start Next.js with PM2ls to sorce foldervenkatdev
pm2 start npm --name "portfolio" -- start

# Save PM2 process list so it survives reboots
pm2 save

# Configure PM2 to auto-start on system boot
pm2 startup systemd
# Copy & run the command that PM2 prints (it looks like: sudo env PATH=... pm2 startup ...)

# Check status
pm2 status
pm2 logs portfolio --lines 20
```

The app is now running on port **3000** internally.

---

## PHASE 7 — Configure Nginx as Reverse Proxy

```bash
# Remove default Nginx site
rm /etc/nginx/sites-enabled/default

# Create your site config
nano /etc/nginx/sites-available/portfolio
```

Paste this config (replace `yourdomain.com` with your actual domain or Droplet IP):

```nginx
server {
    listen 80;
    server_name venkatdotdev.com www.venkatdotdev.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Save: `Ctrl+O` → `Enter` → `Ctrl+X`

```bash
# Enable the site
ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# Test Nginx config for syntax errors
nginx -t

# Reload Nginx
systemctl reload nginx
systemctl status nginx
```

Your site is now live at `http://YOUR_DROPLET_IP`

---

## PHASE 8 — Map Your Custom Domain

### Step 8A — Point DNS to Your Droplet (do this at your domain registrar)

Log in to wherever you bought your domain (GoDaddy / Namecheap / Google Domains / etc.) and add these DNS records:

| Type | Name  | Value             | TTL  |
| ---- | ----- | ----------------- | ---- |
| A    | `@`   | `YOUR_DROPLET_IP` | 3600 |
| A    | `www` | `YOUR_DROPLET_IP` | 3600 |

> DNS propagation takes **5–30 minutes** (sometimes up to 48h). Check at [dnschecker.org](https://dnschecker.org) — wait until your domain resolves to your Droplet IP before continuing.

---

### Step 8B — Update Nginx Config with Your Domain

SSH back into the Droplet and edit the Nginx config:

```bash
nano /etc/nginx/sites-available/portfolio
```

Replace `yourdomain.com` with your **actual domain**:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Save: `Ctrl+O` → `Enter` → `Ctrl+X`

```bash
# Test & reload Nginx
nginx -t
systemctl reload nginx
```

Visit `http://yourdomain.com` — your portfolio should load.

---

### Step 8C — Free SSL with Let's Encrypt (HTTPS)

> Do this **after** DNS is propagated and `http://yourdomain.com` loads correctly.

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Issue SSL certificate (replace with your real domain)
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

**Follow the prompts:**

1. Enter your email address
2. Agree to Terms of Service → `Y`
3. When asked about redirect → choose **`2`** (redirect HTTP → HTTPS)

Certbot automatically rewrites your Nginx config to add HTTPS and sets up auto-renewal.

```bash
# Verify auto-renewal works
certbot renew --dry-run
```

---

### Step 8D — Update .env.local with Production URL

```bash
nano /var/www/portfolio/.env.local
```

Update this line to your real domain with HTTPS:

```
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

Save, then rebuild and restart:

```bash
cd /var/www/portfolio
npm run build
pm2 restart portfolio
```

Your site is now live at `https://yourdomain.com`

---

### Domain Mapping — What Certbot Does Automatically

After Certbot runs, your Nginx config is rewritten to look like this (no manual edits needed):

```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$host$request_uri;
}
```

---

## Deploying Updates (Day 2+)

Every time you push new code to GitHub, SSH in and run:

```bash
cd /var/www/portfolio
git pull origin main        # or: git pull origin release
npm install                 # only needed if package.json changed
npm run build
pm2 restart portfolio
```

---

## Quick Reference — Useful Commands

| Task               | Command                            |
| ------------------ | ---------------------------------- |
| View app logs      | `pm2 logs portfolio`               |
| Restart app        | `pm2 restart portfolio`            |
| Stop app           | `pm2 stop portfolio`               |
| Nginx status       | `systemctl status nginx`           |
| Reload Nginx       | `systemctl reload nginx`           |
| Check Nginx errors | `tail -f /var/log/nginx/error.log` |
| Check open ports   | `ss -tlnp`                         |

---

## Troubleshooting

**Build fails with memory error:**

```bash
export NODE_OPTIONS="--max-old-space-size=512"
npm run build
```

**Port 3000 already in use:**

```bash
lsof -i :3000
kill -9 <PID>
```

**PM2 app not starting after reboot:**

```bash
pm2 resurrect
```

**Nginx 502 Bad Gateway:**

- App is not running → `pm2 restart portfolio`
- Check logs → `pm2 logs portfolio`
