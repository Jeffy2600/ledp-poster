const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
});

const adSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  keywords: [String]
});

postSchema.index({ title: 'text', content: 'text' });
adSchema.index({ title: 'text', description: 'text', keywords: 'text' });

const Post = mongoose.model('Post', postSchema);
const Ad = mongoose.model('Ad', adSchema);

module.exports = { Post, Ad };