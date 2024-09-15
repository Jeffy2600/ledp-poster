const { Post } = require('./db');

async function recommendPosts(req, res) {
    try {
        const posts = await Post.find().limit(5); // Example: return 5 posts
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to recommend posts' });
    }
}

module.exports = { recommendPosts };
