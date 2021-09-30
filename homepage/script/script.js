function redirectPage(name) {
  window.location = `../searchpage/gameSearch.html?title=${name}`;
}

const button = document.querySelector('.search-button');
const input = document.querySelector('.search-field');

function searchGame(event) {
  event.preventDefault();
  const gameName = input.value;
  redirectPage(gameName);
}
button.addEventListener('click', searchGame);



