const { Ad } = require('./db');

async function getAds(req, res) {
    try {
        const ads = await Ad.find();
        res.status(200).json(ads);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ads' });
    }
}

module.exports = { getAds };
