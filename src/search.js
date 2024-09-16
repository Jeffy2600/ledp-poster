const { Post, Ad } = require('./db');

async function searchPosts(query) {
  try {
    const posts = await Post.find({ $text: { $search: query } });
    const relevantAds = await Ad.find({ $text: { $search: query } }).limit(2);
    return { posts, ads: relevantAds };
  } catch (error) {
    throw new Error('Failed to search posts and ads');
  }
}

module.exports = { searchPosts };