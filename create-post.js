document.addEventListener('DOMContentLoaded', function() {
  var quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
      toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline'],
                ['image', 'code-block']
            ]
    }
  });

  // Add image upload functionality
  quill.getModule('toolbar').addHandler('image', () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      // Implement image upload logic here
      // For example:
      // const formData = new FormData();
      // formData.append('image', file);
      // const response = await fetch('/upload-image', { method: 'POST', body: formData });
      // const imageUrl = await response.text();
      // quill.insertEmbed(quill.getSelection().index, 'image', imageUrl);
    };
  });

  document.getElementById('create-post-form').addEventListener('submit', function(e) {
    e.preventDefault();

    var title = document.getElementById('title').value;
    var content = quill.root.innerHTML;

    // Implement post creation logic here
    createPost(title, content);
  });

  function createPost(title, content) {
    // This function should be implemented in post.js
    // It should handle sending the post data to the server
    console.log('Creating post:', { title, content });
    // Example:
    // fetch('/api/posts', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ title, content }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Post created:', data);
    //     // Redirect to the new post or home page
    //     window.location.href = 'index.html';
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    // });
  }
});