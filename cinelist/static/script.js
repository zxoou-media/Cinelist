async function loadMovies() {
  const res = await fetch('/api/movies');
  const data = await res.json();

  const trending = document.getElementById('trending-list');
  data.trending.forEach(m => {
    trending.innerHTML += `
      <div class="movie-card">
        <h3>${m.title}</h3>
        <p>Language: ${m.lang.join(", ")}</p>
        <p>Quality: ${m.quality.join(", ")}</p>
        <a href="${m.trailer}" target="_blank">
          <button class="watch-btn">▶️ WATCH</button>
        </a>
      </div>
    `;
  });

  const recent = document.getElementById('recent-list');
  data.recent.forEach(m => {
    recent.innerHTML += `
      <div class="movie-card">
        <h3>${m.title}</h3>
        <p>Language: ${m.lang.join(", ")}</p>
        <p>Quality: ${m.quality.join(", ")}</p>
        <a href="${m.trailer}" target="_blank">
          <button class="watch-btn">▶️ WATCH</button>
        </a>
      </div>
    `;
  });
}

loadMovies();