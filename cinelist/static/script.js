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

// Trailer Modal Logic
function openTrailer(url) {
  const modal = document.getElementById('trailer-modal');
  const frame = document.getElementById('trailer-frame');
  frame.src = url;
  modal.style.display = 'flex';
}

document.getElementById('close-modal').onclick = () => {
  const modal = document.getElementById('trailer-modal');
  const frame = document.getElementById('trailer-frame');
  frame.src = '';
  modal.style.display = 'none';
};

loadMovies();