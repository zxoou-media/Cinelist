let allMovies = [];

async function loadMovies() {
  try {
    const res = await fetch('/api/movies');
    const data = await res.json();

    const trendingWithCategory = data.trending.map(m => ({ ...m, category: 'trending' }));
    const recentWithCategory = data.recent.map(m => ({ ...m, category: 'recent' }));

    allMovies = [...trendingWithCategory, ...recentWithCategory];
    renderMovies(allMovies);
  } catch (err) {
    console.error("Failed to load movies:", err);
  }
}

function renderMovies(movies) {
  const trending = document.getElementById('trending-scroll');
  const recent = document.getElementById('recent-list');
  trending.innerHTML = '';
  recent.innerHTML = '';

  const trendingData = movies.filter(m => m.category === 'trending');
  const recentData = movies.filter(m => m.category === 'recent');

  trendingData.forEach(m => {
    trending.appendChild(createMovieCardElement(m));
  });

  recentData.forEach(m => {
    recent.appendChild(createMovieCardElement(m));
  });

  // 🔁 Auto-scroll logic
  setTimeout(() => {
    const cards = trending.querySelectorAll('.movie-card');
    if (cards.length === 0) return;

    let index = 0;
    const cardWidth = cards[0].offsetWidth + 16;

    setInterval(() => {
      trending.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });

      index++;
      if (index >= cards.length) index = 0;
    }, 3000);
  }, 500);
}

function createMovieCardElement(m) {
  const card = document.createElement('div');
  card.className = 'movie-card';

  card.innerHTML = `
    <img src="${m.poster}" alt="${m.title}" class="poster">
    <h3>${m.title}</h3>
    <p>Language: ${Array.isArray(m.lang) ? m.lang.join(", ") : m.lang}</p>
    <p>Quality: ${Array.isArray(m.quality) ? m.quality.join(", ") : m.quality}</p>
    <p>Updated: ${m.date}</p>
    <button class="watch-btn">▶️ WATCH</button>
  `;

  card.querySelector('.watch-btn').addEventListener('click', () => {
    window.open(m.trailer, '_blank');
  });

  return card;
}

function applyFilters() {
  const searchText = document.getElementById('search-box').value.toLowerCase();
  const selectedLang = document.getElementById('lang-filter').value;
  const selectedQuality = document.getElementById('quality-filter').value;

  const filtered = allMovies.filter(m => {
    const titleMatch = m.title.toLowerCase().includes(searchText);
    const langMatch = selectedLang === '' || (Array.isArray(m.lang) ? m.lang.includes(selectedLang) : m.lang === selectedLang);
    const qualityMatch = selectedQuality === '' || (Array.isArray(m.quality) ? m.quality.includes(selectedQuality) : m.quality === selectedQuality);
    return titleMatch && langMatch && qualityMatch;
  });

  renderMovies(filtered);
}

document.getElementById('search-box').addEventListener('input', applyFilters);
document.getElementById('lang-filter').addEventListener('change', applyFilters);
document.getElementById('quality-filter').addEventListener('change', applyFilters);
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

loadMovies();