const { Post } = require('./db');

function generatePostId() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const random = Math.random().toString(36).substring(2, 10).toUpperCase();
    return `${day}${month}${year}${random}`;
}

async function createPost(req, res) {
    const { title, content, imageUrl, author } = req.body;
    const id = generatePostId();
    const post = new Post({ id, title, content, imageUrl, author });
    try {
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
}

async function getPosts(req, res) {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
}

async function updatePost(req, res) {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const post = await Post.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update post' });
    }
}

async function deletePost(req, res) {
    const { id } = req.params;
    try {
        await Post.findByIdAndDelete(id);
        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete post' });
    }
}

module.exports = { createPost, getPosts, updatePost, deletePost };
