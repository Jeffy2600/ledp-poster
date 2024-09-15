const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('YOUR_CLIENT_ID');

async function authenticate(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: 'YOUR_CLIENT_ID',
        });
        const payload = ticket.getPayload();
        req.user = payload;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = { authenticate };
