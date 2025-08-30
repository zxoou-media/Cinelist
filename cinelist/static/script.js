let allMovies = [];

async function loadMovies() {
  try {
    const res = await fetch('/api/movies');
    const data = await res.json();

    const trendingWithCategory = data.trending.map(m => ({ ...m, category: 'trending' }));
    const recentWithCategory = data.recent.map(m => ({ ...m, category: 'recent' }));

    allMovies = [...trendingWithCategory, ...recentWithCategory];
    renderMovies(allMovies);
    startTrendingScroll();
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
    trending.appendChild(createMovieCardElement(m, 'trending-card'));
  });

  recentData.forEach(m => {
    recent.appendChild(createMovieCardElement(m, 'recent-card'));
  });
}

function createMovieCardElement(m, cardClass) {
  const card = document.createElement('div');
  card.className = cardClass;

  const poster = document.createElement('img');
  poster.src = m.poster;
  poster.alt = m.title;
  poster.className = 'poster';

  const title = document.createElement('h3');
  title.textContent = m.title;

  const lang = document.createElement('p');
  lang.textContent = `Language: ${Array.isArray(m.lang) ? m.lang.join(", ") : m.lang}`;

  const quality = document.createElement('p');
  quality.textContent = `Quality: ${Array.isArray(m.quality) ? m.quality.join(", ") : m.quality}`;

  const date = document.createElement('p');
  date.textContent = `