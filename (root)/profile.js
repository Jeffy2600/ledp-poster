document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/user-posts')
        .then(response => response.json())
        .then(posts => {
            const userPostsSection = document.getElementById('user-posts');
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                    <img src="${post.imageUrl}" alt="Post Image">
                    <button onclick="editPost('${post._id}')">Edit</button>
                    <button onclick="deletePost('${post._id}')">Delete</button>
                `;
                userPostsSection.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error fetching user posts:', error));
});

function editPost(postId) {
    // Logic for editing a post
}

function deletePost(postId) {
    fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Post deleted') {
            location.reload();
        } else {
            console.error('Error deleting post:', data.error);
        }
    })
    .catch(error => console.error('Error deleting post:', error));
}
