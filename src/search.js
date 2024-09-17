// search.js
import { config, query } from '../config/config.js';

document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');
    const postsContainer = document.getElementById('posts');

    // Initialize configuration
    await config.initializeConfig();

    // Function to perform the search
    const performSearch = async (searchQuery) => {
        try {
            const sql = 'SELECT id, title, SUBSTRING(content, 1, 150) AS excerpt FROM posts WHERE title LIKE ? OR content LIKE ? LIMIT 10';
            const params = [`%${searchQuery}%`, `%${searchQuery}%`];
            const results = await query(sql, params);
            return results;
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
                <p>${result.excerpt}...</p>
                <a href="/post/${result.id}">Read more</a>
            `;
            postsContainer.appendChild(postElement);
        });
    };

    // Function to handle search
    const handleSearch = async () => {
        const query = searchInput.value.trim();
        if (query) {
            const results = await performSearch(query);
            displayResults(results);
        }
    };

    // Event listener for search button click
    searchButton.addEventListener('click', handleSearch);

    // Event listener for Enter key press in search input
    searchInput.addEventListener('keypress', async (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });
});