const Post = require('./db');

function createPost(title, content, imageUrl, author) {
    const post = new Post({ title, content, imageUrl, author });
    return post.save();
}

function getPosts() {
    return Post.find();
}

function updatePost(id, updatedData) {
    return Post.findByIdAndUpdate(id, updatedData, { new: true });
}

function deletePost(id) {
    return Post.findByIdAndDelete(id);
}

module.exports = { createPost, getPosts, updatePost, deletePost };
