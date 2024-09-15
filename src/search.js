const { Post } = require('./db');

async function searchPosts(req, res) {
    const { query } = req.query;
    try {
        const posts = await Post.find({ $text: { $search: query } });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search posts' });
    }
}

module.exports = { searchPosts };
