const { Post } = require('./db');

async function addComment(req, res) {
    const { id } = req.params;
    const { comment } = req.body;
    try {
        const post = await Post.findByIdAndUpdate(id, { $push: { comments: comment } }, { new: true });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add comment' });
    }
}

async function getComments(req, res) {
    const { id } = req.params;
    try {
        const post = await Post.findById(id).select('comments');
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
}

module.exports = { addComment, getComments };
