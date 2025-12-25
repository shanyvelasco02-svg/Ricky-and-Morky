const output = document.getElementById("output");
const searchInput = document.getElementById("searchInput");
const speciesSelect = document.getElementById("speciesSelect");
const charactersBtn = document.getElementById("charactersBtn");
const episodesBtn = document.getElementById("episodesBtn");

async function loadCharacters() {
  output.innerHTML = "Loading characters...";

  let url = "https://rickandmortyapi.com/api/character";
  const params = [];

  if (searchInput.value) {
    params.push(`name=${searchInput.value}`);
  }

  if (speciesSelect.value) {
    params.push(`species=${speciesSelect.value}`);
  }

  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    output.innerHTML = "";

    data.results.forEach(c => {
      output.innerHTML += `
        <div class="card">
          <img src="${c.image}" />
          <h3>${c.name}</h3>
          <p>${c.species}</p>
          <p>${c.status}</p>
        </div>
      `;
    });

  } catch (err) {
    output.innerHTML = "<p>No characters found.</p>";
  }
}

async function loadEpisodes() {
  output.innerHTML = "Loading episodes...";

  try {
    const res = await fetch("https://rickandmortyapi.com/api/episode");
    const data = await res.json();

    output.innerHTML = "";

    data.results.forEach(ep => {
      output.innerHTML += `
        <div class="card">
          <h3>${ep.name}</h3>
          <p>${ep.episode}</p>
          <p>${ep.air_date}</p>
        </div>
      `;
    });

  } catch (err) {
    output.innerHTML = "<p>Failed to load episodes.</p>";
  }
}

charactersBtn.addEventListener("click", loadCharacters);
episodesBtn.addEventListener("click", loadEpisodes);
searchInput.addEventListener("keyup", loadCharacters);
speciesSelect.addEventListener("change", loadCharacters);

loadCharacters();
