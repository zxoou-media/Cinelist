let allMovies = [];

async function loadMovies() {
  try {
    const res = await fetch('/api/movies');
    const data = await res.json();

    const trending = data.trending.map(m => ({ ...m, category: 'trending' }));
    const recent = data.recent.map(m => ({ ...m, category: 'recent' }));

    allMovies = [...trending, ...recent];
    renderMovies(allMovies);
  } catch (err) {
    console.error("Failed to load movies:", err);
  }
}

function renderMovies(movies) {
  const trendingEl = document.getElementById('trending-scroll');
  const recentEl = document.getElementById('recent-list');
  trendingEl.innerHTML = '';
  recentEl.innerHTML = '';

  movies.forEach(m => {
    const card = document.createElement('div');
    card.className = m.category === 'trending' ? 'trending-card' : 'recent-card';

    card.innerHTML = `
      <a href="${m.trailer}" target="_blank">
        <img src="${m.poster}" alt="${m.title}" class="poster" />
      </a>
      <h3>${m.title}</h3>
      <p>Language: ${Array.isArray(m.lang) ? m.lang.join(', ') : m.lang}</p>
      <p>Quality: ${Array.isArray(m.quality) ? m.quality.join(', ') : m.quality}</p>
      <p>Release: ${m.date || 'N/A'}</p>
      <a href="${m.trailer}" target="_blank" class="watch-btn">▶ Watch Movie</a>
    `;

    if (m.category === 'trending') trendingEl.appendChild(card);
    else recentEl.appendChild(card);
  });
}

function applyFilters() {
  const searchText = document.getElementById("search-box").value.toLowerCase();
  const lang = document.getElementById("lang-filter").value;
  const quality = document.getElementById("quality-filter").value;

  const filtered = allMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchText);
    const matchesLang = !lang || (Array.isArray(movie.lang) ? movie.lang.includes(lang) : movie.lang === lang);
    const matchesQuality = !quality || (Array.isArray(movie.quality) ? movie.quality.includes(quality) : movie.quality === quality);
    return matchesSearch && matchesLang && matchesQuality;
  });

  renderMovies(filtered);
}

function setupFilterListeners() {
  document.getElementById('search-box').addEventListener('input', applyFilters);
  document.getElementById('lang-filter').addEventListener('change', applyFilters);
  document.getElementById('quality-filter').addEventListener('change', applyFilters);
}

function setupDarkModeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
}

function autoScrollTrending() {
  const trending = document.getElementById('trending-scroll');
  let index = 0;
  let isUserScrolling = false;
  let scrollTimeout;

  function scrollToCard() {
    const cards = trending.querySelectorAll('.trending-card');
    if (cards.length === 0 || isUserScrolling) return;

    index = (index + 1) % cards.length;
    const scrollTo = cards[index].offsetLeft;
    trending.scrollTo({ left: scrollTo, behavior: 'smooth' });
  }

  trending.addEventListener('scroll', () => {
    isUserScrolling = true;
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      isUserScrolling = false;

      const cards = trending.querySelectorAll('.trending-card');
      for (let i = 0; i < cards.length; i++) {
        const cardLeft = cards[i].offsetLeft;
        const scrollLeft = trending.scrollLeft;

        if (cardLeft >= scrollLeft) {
          index = i - 1 >= 0 ? i - 1 : 0;
          break;
        }
      }
    }, 1500);
  });

  setInterval(scrollToCard, 3000);
}

window.addEventListener('DOMContentLoaded', () => {
  loadMovies();
  setupFilterListeners();
  setupDarkModeToggle();
  autoScrollTrending();
});