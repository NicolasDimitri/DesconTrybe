function redirectPage(name) {
  window.location = `../searchpage/gameSearch.html?title=${name}`;
}

const button = document.querySelector('.search-button');
const input = document.querySelector('.search-field');

function searchGame(e) {
  if (e.type === 'click' || e.key === "Enter") {
    const gameName = input.value;
    redirectPage(gameName);
  }
}

button.addEventListener('click', searchGame);
button.addEventListener('keydown', searchGame);



