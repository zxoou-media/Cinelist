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
    trending.appendChild(createMovieCardElement(m, 'trending-card'));
  });

  recentData.forEach(m => {
    recent.appendChild(createMovieCardElement(m, 'recent-card'));
  });
}

function createMovieCardElement(m, cardClass) {
  const card = document.createElement('div');
  card.className = cardClass;

  card.innerHTML = `
    <img src="${m.poster}" alt="${m.title}" class="poster" />
    <h3>${m.title}</h3>
    <p>Language: ${Array.isArray(m.lang) ? m.lang.join(", ") : m.lang}</p>
    <p>Quality: ${Array.isArray(m.quality) ? m.quality.join(", ") : m.quality}</p>
    <p>Release: ${m.date}</p>
    <a href="${m.trailer}" target="_blank" class="watch-btn">▶ Watch Trailer</a>
  `;

  return card;
}

function applyFilters() {
  const searchText = document.getElementById("search-box").value.toLowerCase();
  const lang = document.getElementById("lang-filter").value;
  const quality = document.getElementById("quality-filter").value;

  const filtered = allMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchText);
    const matchesLang = !lang || movie.lang