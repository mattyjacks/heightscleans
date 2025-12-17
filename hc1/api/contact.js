export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, phone, service, address, message, turnstileToken } = req.body;

    if (!email && !phone) {
        return res.status(400).json({ error: 'Either email or phone number is required' });
    }

    if (!turnstileToken) {
        return res.status(400).json({ error: 'Verification required' });
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'form@form.heightscleans.com';
    const BREVO_TO_EMAIL = process.env.BREVO_TO_EMAIL || 'heightscleans54@gmail.com';

    const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

    if (!BREVO_API_KEY) {
        console.error('BREVO_API_KEY not configured');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    if (!TURNSTILE_SECRET_KEY) {
        console.error('TURNSTILE_SECRET_KEY not configured');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        const ip = (req.headers['x-forwarded-for'] || '').toString().split(',')[0].trim();
        const body = new URLSearchParams();
        body.append('secret', TURNSTILE_SECRET_KEY);
        body.append('response', turnstileToken);
        if (ip) {
            body.append('remoteip', ip);
        }

        const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            body
        });

        const verifyData = await verifyRes.json();
        if (!verifyData.success) {
            console.error('Turnstile verification failed:', verifyData);
            return res.status(400).json({ error: 'Verification failed' });
        }
    } catch (error) {
        console.error('Turnstile verification error:', error);
        return res.status(500).json({ error: 'Verification error' });
    }

    const emailData = {
        sender: {
            name: 'Heights Cleans Form',
            email: BREVO_SENDER_EMAIL
        },
        to: [
            {
                email: BREVO_TO_EMAIL,
                name: 'Heights Cleans'
            }
        ],
        subject: `New Contact Form Submission${service ? ` - ${service}` : ''}`,
        htmlContent: `
            <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #2563eb 0%, #10b981 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                        .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
                        .field { margin-bottom: 15px; }
                        .label { font-weight: bold; color: #1f2937; }
                        .value { color: #4b5563; margin-top: 5px; }
                        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2 style="margin: 0;">✨ Heights Cleans - New Contact Form</h2>
                        </div>
                        <div class="content">
                            ${name ? `
                            <div class="field">
                                <div class="label">Name:</div>
                                <div class="value">${name}</div>
                            </div>
                            ` : ''}
                            ${email ? `
                            <div class="field">
                                <div class="label">Email:</div>
                                <div class="value"><a href="mailto:${email}">${email}</a></div>
                            </div>
                            ` : ''}
                            ${phone ? `
                            <div class="field">
                                <div class="label">Phone:</div>
                                <div class="value"><a href="tel:${phone}">${phone}</a></div>
                            </div>
                            ` : ''}
                            ${service ? `
                            <div class="field">
                                <div class="label">Service Type:</div>
                                <div class="value">${service}</div>
                            </div>
                            ` : ''}
                            ${address ? `
                            <div class="field">
                                <div class="label">Service Address:</div>
                                <div class="value">${address}</div>
                            </div>
                            ` : ''}
                            ${message ? `
                            <div class="field">
                                <div class="label">Details:</div>
                                <div class="value">${message.replace(/\n/g, '<br>')}</div>
                            </div>
                            ` : ''}
                            <div class="footer">
                                <p>This message was sent via the Heights Cleans contact form.</p>
                                <p>Submitted on ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago', dateStyle: 'full', timeStyle: 'short' })}</p>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        `,
        textContent: `
New Contact Form Submission

${name ? `Name: ${name}` : ''}
${email ? `Email: ${email}` : ''}
${phone ? `Phone: ${phone}` : ''}
${service ? `Service Type: ${service}` : ''}
${address ? `Service Address: ${address}` : ''}
${message ? `Details: ${message}` : ''}

Submitted on ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}
        `
    };

    try {
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': BREVO_API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Brevo API error:', data);
            return res.status(response.status).json({ error: 'Failed to send email', details: data });
        }

        return res.status(200).json({ 
            success: true, 
            message: 'Contact form submitted successfully',
            messageId: data.messageId 
        });

    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send email' });
    }
}
