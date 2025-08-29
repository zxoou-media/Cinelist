let movies = [];

// Load JSON data
fetch('/cinelist/data/movies.json')
  .then(res => res.json())
  .then(data => {
    movies = data;
    renderAllSections();
  })
  .catch(err => console.error("JSON fetch error:", err));

// Create individual movie card
function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";

  const poster = document.createElement("img");
  poster.src = movie.poster || "fallback.jpg";
  poster.alt = movie.title || "Untitled";
  poster.onclick = () => window.open(movie.link, "_blank");

  const title = document.createElement("h3");
  title.textContent = movie.title || "Untitled";

  const watchBtn = document.createElement("button");
  watchBtn.textContent = "▶ Watch Now";
  watchBtn.onclick = () => window.open(movie.link, "_blank");

  card.appendChild(poster);
  card.appendChild(title);
  card.appendChild(watchBtn);

  return card;
}

// Render all category sections
function renderAllSections() {
  const sections = {
    trending: "Trending",
    recent: "Recently Updated",
    natok: "Bangla Natok",
    webSeries: "Web Series",
    netflix: "Netflix",
    korean: "Korean",
    anime: "Anime"
  };

  Object.entries(sections).forEach(([id, category]) => {
    const container = document.getElementById(`${id}-list`);
    if (!container) return;

    container.innerHTML = ""; // Clear previous content
    const filtered = movies.filter(m => m.category === category);
    filtered.forEach(movie => container.appendChild(createMovieCard(movie)));
  });
}

// Search functionality
document.getElementById("search-box").addEventListener("input", e => {
  const query = e.target.value.toLowerCase();

  // Clear all sections before showing search results
  const allContainers = document.querySelectorAll(".movie-grid, .scroll-row, .grid-2");
  allContainers.forEach(container => container.innerHTML = "");

  const filtered = movies.filter(m =>
    m.title.toLowerCase().includes(query)
  );

  // Show search results in trending-list or a dedicated container
  const searchContainer = document.getElementById("trending-list");
  filtered.forEach(movie => searchContainer.appendChild(createMovieCard(movie)));
});