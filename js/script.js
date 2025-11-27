const giphyApiKey = "KJ41ZPgWT35Uioho6Tu2qLdYvfIPpZT8";
const giphyBaseUrl = "https://api.giphy.com/v1/gifs/search";

const gifSearchInput = document.getElementById("gif-search-input");
const gifSearchBtn = document.getElementById("gif-search-btn");
const gifResults = document.getElementById("gif-results");

async function fetchGifs(query) {
  const endpoint = `${giphyBaseUrl}?api_key=${giphyApiKey}&q=${encodeURIComponent(
    query
  )}&limit=9&rating=g&lang=en`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.data.map((gif) => gif.images.fixed_height.url);
}

async function handleGifSearch() {
  if (!gifSearchInput || !gifResults) return; // not on this page
  const term = gifSearchInput.value.trim() || "campus";
  gifResults.innerHTML = "<p class='col-12 text-center'>Loading...</p>";
  try {
    const images = await fetchGifs(term);
    gifResults.innerHTML = "";
    images.forEach((url) => {
      gifResults.innerHTML += `<div class="col-md-4 mb-3"><img src="${url}" class="img-fluid rounded" alt="GIF"></div>`;
    });
  } catch (err) {
    gifResults.innerHTML =
      "<p class='col-12 text-danger text-center'>Error loading GIFs.</p>";
  }
}

if (gifSearchBtn) {
  gifSearchBtn.addEventListener("click", handleGifSearch);
}
