let allMovies = [];

async function loadMovies() {
  try {
    const res = await fetch('/api/movies'); // ✅ Updated path
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();

    const trending = Array.isArray(data.trending)
      ? data.trending.map(m => ({ ...m, category: 'trending' }))
      : [];

    const recent = Array.isArray(data.recent)
      ? data.recent.map(m => ({ ...m, category: 'recent' }))
      : [];

    allMovies = [...trending, ...recent];
    renderMovies(allMovies);
    populateFilters();
  } catch (err) {
    console.error("❌ Failed to load movies:", err);
  }
}

function renderMovies(movies) {
  const trendingList = document.getElementById('trending-list');
  const recentList = document.getElementById('recent-list');
  trendingList.innerHTML = '';
  recentList.innerHTML = '';

  movies.forEach(m => {
    const card = document.createElement('div');
    card.className = m.category === 'trending' ? 'trending-card' : 'movie-card';

    card.innerHTML = `
      <a href="${m.trailer}" target="_blank">
        <img src="${m.poster}" alt="${m.title}">
      </a>
      <h3>${m.title}</h3>
      <p>Genres: ${Array.isArray(m.genres) ? m.genres.join(', ') : 'N/A'}</p>
      <p>Type: ${m.type || 'N/A'}</p>
      <p>Language: ${Array.isArray(m.lang) ? m.lang.join(', ') : 'N/A'}</p>
      <p>Quality: ${Array.isArray(m.quality) ? m.quality.join(', ') : 'N/A'}</p>
      <p>Updated: ${m.date || 'N/A'}</p>
      <a href="${m.trailer}" target="_blank" class="watch-btn">▶️ WATCH</a>
    `;

    if (m.category === 'trending') trendingList.appendChild(card);
    else recentList.appendChild(card);
  });
}

function populateFilters() {
  const langSet = new Set();
  const qualitySet = new Set();

  allMovies.forEach(m => {
    (m.lang || []).forEach(l => langSet.add(l));
    (m.quality || []).forEach(q => qualitySet.add(q));
  });

  const langFilter = document.getElementById('lang-filter');
  const qualityFilter = document.getElementById('quality-filter');

  langFilter.innerHTML = '<option value="">All</option>';
  qualityFilter.innerHTML = '<option value="">All</option>';

  langSet.forEach(l => {
    const opt = document.createElement('option');
    opt.value = l;
    opt.textContent = l;
    langFilter.appendChild(opt);
  });

  qualitySet.forEach(q => {
    const opt = document.createElement('option');
    opt.value = q;
    opt.textContent = q;
    qualityFilter.appendChild(opt);
  });
}

function applyFilters() {
  const searchText = document.getElementById('search-box').value.toLowerCase();
  const selectedLang = document.getElementById('lang-filter').value;
  const selectedQuality = document.getElementById('quality-filter').value;

  const filtered = allMovies.filter(m => {
    const titleMatch = m.title?.toLowerCase().includes(searchText);
    const langMatch = !selectedLang || (m.lang || []).includes(selectedLang);
    const qualityMatch = !selectedQuality || (m.quality || []).includes(selectedQuality);
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

// Auto scroll trending section
setInterval(() => {
  const trendingList = document.getElementById('trending-list');
  trendingList.scrollBy({ left: 240, behavior: 'smooth' });
}, 3000);

loadMovies();