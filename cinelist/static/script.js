<script>
let allMovies = [];

async function loadMovies() {
  try {
    const res = await fetch('/api/movies');
    const data = await res.json();

    // Add category info to each movie
    const trendingWithCategory = data.trending.map(m => ({ ...m, category: 'trending' }));
    const recentWithCategory = data.recent.map(m => ({ ...m, category: 'recent' }));

    allMovies = [...trendingWithCategory, ...recentWithCategory];
    renderMovies(allMovies);
  } catch (err) {
    console.error("Failed to load movies:", err);
  }
}

function renderMovies(movies) {
  const trending = document.getElementById('trending-list');
  const recent = document.getElementById('recent-list');
  trending.innerHTML = '';
  recent.innerHTML = '';

  const trendingData = movies.filter(m => m.category === 'trending');
  const recentData = movies.filter(m => m.category === 'recent');

  trendingData.forEach(m => {
    trending.innerHTML += createMovieCard(m);
  });

  recentData.forEach(m => {
    recent.innerHTML += createMovieCard(m);
  });
}

function createMovieCard(m) {
  return `
    <div class="movie-card">
      <img src="${m.poster}" alt="${m.title}" class="poster">
      <h3>${m.title}</h3>
      <p>Language: ${m.lang.join(", ")}</p>
      <p>Quality: ${m.quality.join(", ")}</p>
      <p>Updated: ${m.date}</p>
      <button class="watch-btn" onclick="openTrailer('${m.trailer}')">▶️ WATCH</button>
    </div>
  `;
}

// ✅ Direct YouTube Link Open
function openTrailer(url) {
  window.open(url, '_blank');
}

// ✅ Filter Logic
function applyFilters() {
  const searchText = document.getElementById('search-box').value.toLowerCase();
  const selectedLang = document.getElementById('lang-filter').value;
  const selectedQuality = document.getElementById('quality-filter').value;

  const filtered = allMovies.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchText);
    const matchesLang = selectedLang === '' || m.lang.includes(selectedLang);
    const matchesQuality = selectedQuality === '' || m.quality.includes(selectedQuality);
    return matchesSearch && matchesLang && matchesQuality;
  });

  renderMovies(filtered);
}

// ✅ Event Listeners
document.getElementById('search-box').addEventListener('input', applyFilters);
document.getElementById('lang-filter').addEventListener('change', applyFilters);
document.getElementById('quality-filter').addEventListener('change', applyFilters);

loadMovies();
</script>