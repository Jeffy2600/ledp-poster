// search.js

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-btn');
  const postsContainer = document.getElementById('posts');

  // Function to perform the search
  const performSearch = async (query) => {
    try {
      // Simulating an API call to fetch search results
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching search results:', error);
      return [];
    }
  };

  // Function to display search results
  const displayResults = (results) => {
    postsContainer.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
      postsContainer.innerHTML = '<p>No results found.</p>';
      return;
    }

    results.forEach(result => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = `
                <h2>${result.title}</h2>
                <p>${result.excerpt}</p>
                <a href="/post/${result.id}">Read more</a>
            `;
      postsContainer.appendChild(postElement);
    });
  };

  // Event listener for search button click
  searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (query) {
      const results = await performSearch(query);
      displayResults(results);
    }
  });

  // Event listener for Enter key press in search input
  searchInput.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        const results = await performSearch(query);
        displayResults(results);
      }
    }
  });
});