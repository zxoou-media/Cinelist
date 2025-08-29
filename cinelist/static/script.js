let movies = [];

fetch('movies.json')
  .then(res => res.json())
  .then(data => {
    movies = data;
    renderAllSections();
  });

function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";

  const poster = document.createElement("img");
  poster.src = movie.poster;
  poster.alt = movie.title;
  poster.onclick = () => window.open(movie.link, "_blank");

  const title = document.createElement("h3");
  title.textContent = movie.title;

  const watchBtn = document.createElement("button");
  watchBtn.textContent = "▶ Watch Now";
  watchBtn.onclick = () => window.open(movie.link, "_blank");

  card.appendChild(poster);
  card.appendChild(title);
  card.appendChild(watchBtn);

  return card;
}

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
    const filtered = movies.filter(m => m.category === category);
    filtered.forEach(movie => container.appendChild(createMovieCard(movie)));
  });
}

document.getElementById("search-box").addEventListener("input", e => {
  const query = e.target.value.toLowerCase();
  const allContainers = document.querySelectorAll(".movie-grid, .scroll-row, .grid-2");
  allContainers.forEach(container => container.innerHTML = "");

  const filtered = movies.filter(m =>
    m.title.to[43dcd9a7-70db-4a1f-b0ae-981daa162054](https://github.com/lzh-yi/Web-Fork-/tree/024b3e55587afdf9f05a677613a75f24e3d1803e/03-CSS%E8%BF%9B%E9%98%B6%2F04-%E5%A6%82%E4%BD%95%E8%AE%A9%E4%B8%80%E4%B8%AA%E5%85%83%E7%B4%A0%E6%B0%B4%E5%B9%B3%E5%9E%82%E7%9B%B4%E5%B1%85%E4%B8%AD%EF%BC%9F.md?citationMarker=43dcd9a7-70db-4a1f-b0ae-981daa162054 "1")