let allMovies = [];

async function loadMovies() {
  try {
    const res = await fetch('/api/movies');
    const data = await res.json();
    allMovies = [...data.trending, ...data.recent];
    renderMovies(data.trending, data.recent);
  } catch (err) {
    console.error("Failed to load movies:", err);
  }
}

function renderMovies(trendingData, recentData) {
  const trending = document.getElementById('trending-list');
  const recent = document.getElementById('recent-list');
  trending.innerHTML = '';
  recent.innerHTML = '';

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

// ✅ Direct Link Open Instead of Modal
function openTrailer(url) {
  window.open(url, '_blank');
}

loadMovies();