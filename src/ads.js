const { Ad } = require('./db');

async function getRelevantAds(query) {
  try {
    return await Ad.find({ $text: { $search: query } }).limit(2);
  } catch (error) {
    throw new Error('Failed to fetch relevant ads');
  }
}

function displayAds(ads) {
  const adsContainer = document.getElementById('ads');
  adsContainer.innerHTML = '';
  ads.forEach(ad => {
    const adElement = document.createElement('div');
    adElement.className = 'ad';
    adElement.innerHTML = `
            <h3>${ad.title}</h3>
            <p>${ad.description}</p>
            <a href="${ad.link}" target="_blank">Learn More</a>
        `;
    adsContainer.appendChild(adElement);
  });
}

module.exports = { getRelevantAds, displayAds };