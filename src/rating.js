const { Post } = require('./db');

async function ratePost(req, res) {
    const { id } = req.params;
    const { rating } = req.body;
    try {
        const post = await Post.findByIdAndUpdate(id, { $inc: { rating: rating } }, { new: true });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to rate post' });
    }
}

async function getPostRating(req, res) {
    const { id } = req.params;
    try {
        const post = await Post.findById(id).select('rating');
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch post rating' });
    }
}

module.exports = { ratePost, getPostRating };
