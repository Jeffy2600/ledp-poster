const express = require('express');
const bodyParser = require('body-parser');
const { authenticate } = require('./auth');
const { createPost, getPosts, updatePost, deletePost } = require('./post');
const { searchPosts } = require('./search');
const { ratePost, getPostRating } = require('./rating');
const { addComment, getComments } = require('./comment');
const { recommendPosts } = require('./recommendation');
const { getAds } = require('./ads');

const app = express();
app.use(bodyParser.json());

app.post('/api/auth', authenticate);
app.post('/api/posts', createPost);
app.get('/api/posts', getPosts);
app.put('/api/posts/:id', updatePost);
app.delete('/api/posts/:id', deletePost);
app.get('/api/search', searchPosts);
app.post('/api/rate/:id', ratePost);
app.get('/api/rate/:id', getPostRating);
app.post('/api/comment/:id', addComment);
app.get('/api/comment/:id', getComments);
app.get('/api/recommend', recommendPosts);
app.get('/api/ads', getAds);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
