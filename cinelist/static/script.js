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

  // 🔁 Auto-scroll logic for trending
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

  // Poster image
  const poster = document.createElement('img');
  poster.src = m.poster;
  poster.alt = m.title;
  poster.className = 'poster';
  poster.style.cursor = 'pointer';
  poster.addEventListener('click', () => {
    window.open(m.trailer, '_blank');
  });

  // Title
  const title = document.createElement('h3');
  title.textContent = m.title;

  // Language
  const lang = document.createElement('p');
  lang.textContent = `Language: ${Array.isArray(m.lang) ? m.lang.join(", ") : m.lang}`;

  // Quality
  const quality = document.createElement('p');
  quality.textContent = `Quality: ${Array.isArray(m.quality) ? m.quality.join(", ") : m.quality}`;

  // Date
  const date = document.createElement('p');
  date.textContent = `Updated: ${m.date}`;

  // Watch button
  const watchBtn = document.createElement('button');
  watchBtn.className = 'watch-btn';
  watchBtn.textContent = '▶️ WATCH';
  watchBtn.addEventListener('click', () => {
    window.open(m.trailer, '_blank');
  });

  // Assemble card
  card.appendChild(poster);
  card.appendChild(title);
  card.appendChild(lang);
  card.appendChild(quality);
  card.appendChild(date);
  card.appendChild(watchBtn);

  return card;
}

// 🚀 Start loading movies
loadMovies();