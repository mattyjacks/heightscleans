export default function handler(req, res) {
    const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY;

    if (!turnstileSiteKey) {
        return res.status(500).json({ error: 'TURNSTILE_SITE_KEY not configured' });
    }

    return res.status(200).json({ turnstileSiteKey });
}
