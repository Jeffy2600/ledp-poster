const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/postSharingPlatform', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const postSchema = new mongoose.Schema({
    id: String,
    title: String,
    content: String,
    imageUrl: String,
    author: String,
    rating: { type: Number, default: 0 },
    comments: [{ type: String }],
});

const adSchema = new mongoose.Schema({
    content: String,
    imageUrl: String,
});

const Post = mongoose.model('Post', postSchema);
const Ad = mongoose.model('Ad', adSchema);

module.exports = { Post, Ad };
