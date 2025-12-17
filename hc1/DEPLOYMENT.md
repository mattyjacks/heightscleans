# Heights Cleans - Deployment Guide

## Vercel Deployment with Brevo Email Integration

This website is configured to deploy on Vercel with serverless function support for the contact form.

---

## 🚀 Quick Deploy to Vercel

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the settings
5. Click "Deploy"

---

## 🔑 Environment Variables Setup

Before the contact form will work, you need to configure these environment variables in Vercel:

### Required Variables

1. **BREVO_API_KEY**
   - Your Brevo (formerly Sendinblue) API key
   - Get it from: [Brevo Dashboard → SMTP & API → API Keys](https://app.brevo.com/settings/keys/api)
   - Example: `xkeysib-abc123def456...`

2. **BREVO_SENDER_EMAIL**
   - The verified sender email in your Brevo account
   - Must match your verified domain: `form@form.heightscleans.com`
   - This is the "From" address for form submissions

3. **BREVO_TO_EMAIL**
   - Where form submissions should be sent
   - Default: `heightscleans54@gmail.com`
   - This is where you'll receive contact form emails

### How to Add Environment Variables in Vercel

1. Go to your project in Vercel Dashboard
2. Click **Settings**
3. Click **Environment Variables** in the sidebar
4. Add each variable:
   - **Key**: `BREVO_API_KEY`
   - **Value**: Your Brevo API key
   - **Environments**: Select all (Production, Preview, Development)
5. Click **Save**
6. Repeat for `BREVO_SENDER_EMAIL` and `BREVO_TO_EMAIL`

### Example Configuration

```
BREVO_API_KEY=xkeysib-1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
BREVO_SENDER_EMAIL=form@form.heightscleans.com
BREVO_TO_EMAIL=heightscleans54@gmail.com

TURNSTILE_SITE_KEY=0x0000000000000000000000000000000000000000
TURNSTILE_SECRET_KEY=0x0000000000000000000000000000000000000000

## 🛡️ Cloudflare Turnstile (Spam Protection)

The contact form uses Cloudflare Turnstile to block spam. This is required in production.

### Step 1: Create a Turnstile Widget
1. Go to Cloudflare Dashboard
2. Navigate to Turnstile
3. Create a new widget
4. Add your domain (your Vercel domain and any custom domain)
5. Copy the Site Key and Secret Key

### Step 2: Add Vercel Environment Variables

Add these variables in Vercel project settings:

1. **TURNSTILE_SITE_KEY**
   - Public key used by the browser widget

2. **TURNSTILE_SECRET_KEY**
   - Private key used by the serverless function to verify tokens

### How it Works
- The browser fetches the public site key from `/api/config`
- Turnstile renders in the form
- On submit, the token is sent to `/api/contact`
- The server verifies with Cloudflare before sending email via Brevo
```

---

## 📧 Brevo Email Setup

### 1. Create Brevo Account
- Sign up at [brevo.com](https://www.brevo.com)
- Free plan includes 300 emails/day

### 2. Verify Sender Domain
The screenshot shows you have already verified `form.heightscleans.com`:
- ✅ **DKIM signature**: Verified
- ✅ **DMARC**: Configured
- ✅ **Shared IP**: Configured

This means emails can be sent from `form@form.heightscleans.com`

### 3. Get API Key
1. Go to [Brevo Dashboard](https://app.brevo.com)
2. Navigate to **SMTP & API** → **API Keys**
3. Click **Generate a new API key**
4. Copy the key (starts with `xkeysib-`)
5. Add this to Vercel environment variables

---

## 🧪 Testing the Contact Form

### Local Testing
```bash
# Install Vercel CLI
npm i -g vercel

# Create .env file
cp .env.example .env

# Add your API keys to .env
# NEVER commit .env to git!

# Run development server
vercel dev
```

Then visit `http://localhost:3000/contact.html` and test the form.

### Production Testing
After deployment:
1. Visit your live site's contact page
2. Fill out the form with test data
3. Submit the form
4. Check your email at `heightscleans54@gmail.com`
5. Verify you received the formatted email

---

## 📁 Project Structure

```
hc1/
├── api/
│   └── contact.js          # Serverless function for Brevo email
├── scripts/
│   ├── contactForm.js      # Frontend form handling
│   └── ...
├── vercel.json             # Vercel configuration
├── .env.example            # Template for environment variables
└── ...
```

---

## 🔒 Security Notes

### What's Secure ✅
- API keys stored in Vercel environment variables (not in code)
- Server-side API calls (Brevo API key never exposed to browser)
- Form validation on both client and server
- HTTPS encryption via Vercel

### Best Practices
- ✅ Never commit `.env` file to git
- ✅ Use different API keys for development/production
- ✅ Rotate API keys periodically
- ✅ Monitor Brevo dashboard for unusual activity
- ✅ Keep `.env.example` updated (without real values)

---

## 📊 Email Template

Emails sent via the contact form will be formatted as:

**Subject:** `New Contact Form Submission - [Service Type]`

**Content:** HTML formatted with:
- Customer name
- Email address
- Phone number
- Service type requested
- Service address
- Additional details
- Timestamp (Central Time)

**Styling:** Professional gradient header matching website branding

---

## 🐛 Troubleshooting

### Form submission fails with "Failed to send email"

**Check:**
1. Environment variables are set correctly in Vercel
2. Brevo API key is valid and not expired
3. Sender email (`form@form.heightscleans.com`) is verified in Brevo
4. You haven't exceeded Brevo's daily email limit
5. Check Vercel function logs for errors

### How to View Logs

1. Go to Vercel Dashboard → Your Project
2. Click **Functions** tab
3. Click on `api/contact`
4. View recent invocations and errors

### Brevo Dashboard

Check [Brevo Statistics](https://app.brevo.com/statistics) to see:
- Emails sent
- Delivery rate
- Any bounces or errors

---

## 🎯 Form Validation Rules

The contact form enforces:

### Required Fields
- **Email OR Phone** (at least one must be provided)

### Optional Fields
- Full Name
- Service Type
- Service Address
- Details

### Validation
- Email: Must be valid format
- Phone: Must be 10+ digits
- Either email or phone required (custom validation)

---

## 🔄 Redeployment

When you make changes:

```bash
git add .
git commit -m "Update contact form"
git push
```

Vercel will automatically redeploy. No manual steps needed!

---

## 📞 Support

If you encounter issues:

1. Check Vercel deployment logs
2. Check Brevo email logs
3. Verify environment variables
4. Test form locally with `vercel dev`

---

## ✅ Deployment Checklist

Before going live:

- [ ] GitHub repository created and pushed
- [ ] Vercel project created and connected
- [ ] `BREVO_API_KEY` added to Vercel environment variables
- [ ] `BREVO_SENDER_EMAIL` added to Vercel environment variables
- [ ] `BREVO_TO_EMAIL` added to Vercel environment variables
- [ ] Sender email verified in Brevo dashboard
- [ ] Test form submission works
- [ ] Received test email successfully
- [ ] Custom domain configured (optional)

---

**Ready to deploy!** 🚀

Your contact form will integrate seamlessly with Brevo's email service once the environment variables are configured.
