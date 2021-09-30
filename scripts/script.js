function redirectPage(name) {
  window.location = `./gameSearch.html?title=${name}`;
}

const button = document.querySelector('button');
const input = document.querySelector('input');

function searchGame() {
  const gameName = input.value;
  redirectPage(gameName);
}
button.addEventListener('click', searchGame);



