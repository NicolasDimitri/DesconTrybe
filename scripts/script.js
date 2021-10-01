function redirectPage(name) {
  window.location = `/searchpage/gameSearch.html?title=${name}`;
}

const button = document.querySelector('.search-button');
const input = document.querySelector('.search-input');

function searchGame(e) {
  if (e.type === 'click' || e.key === 'Enter') {
    e.preventDefault();
    const gameName = input.value;
    redirectPage(gameName);
  }
}

button.addEventListener('click', searchGame);
input.addEventListener('keydown', searchGame);
