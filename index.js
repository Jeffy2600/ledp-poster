document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/posts')
        .then(response => response.json())
        .then(posts => {
            const postsSection = document.getElementById('posts');
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                    <img src="${post.imageUrl}" alt="Post Image">
                    <p>Rating: ${post.rating}</p>
                    <button onclick="ratePost('${post._id}', 1)">Upvote</button>
                    <button onclick="ratePost('${post._id}', -1)">Downvote</button>
                    <div id="comments-${post._id}">
                        <!-- Comments will be dynamically loaded here -->
                    </div>
                    <input type="text" id="comment-input-${post._id}" placeholder="Add a comment">
                    <button onclick="addComment('${post._id}')">Comment</button>
                `;
                postsSection.appendChild(postElement);
                loadComments(post._id);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
});

function ratePost(postId, rating) {
    fetch(`/api/rate/${postId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating }),
    })
    .then(response => response.json())
    .then(post => {
        // Update the post rating in the UI
        const postElement = document.querySelector(`div[data-id="${postId}"]`);
        postElement.querySelector('p.rating').textContent = `Rating: ${post.rating}`;
    })
    .catch(error => console.error('Error rating post:', error));
}

function addComment(postId) {
    const commentInput = document.getElementById(`comment-input-${postId}`);
    const comment = commentInput.value;

    fetch(`/api/comment/${postId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
    })
    .then(response => response.json())
    .then(post => {
        // Update the comments section in the UI
        loadComments(postId);
        commentInput.value = '';
    })
    .catch(error => console.error('Error adding comment:', error));
}

function loadComments(postId) {
    fetch(`/api/comment/${postId}`)
        .then(response => response.json())
        .then(post => {
            const commentsSection = document.getElementById(`comments-${postId}`);
            commentsSection.innerHTML = '';
            post.comments.forEach(comment => {
                const commentElement = document.createElement('p');
                commentElement.textContent = comment;
                commentsSection.appendChild(commentElement);
            });
        })
        .catch(error => console.error('Error loading comments:', error));
}
