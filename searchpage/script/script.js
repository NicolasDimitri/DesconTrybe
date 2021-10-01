function redirectPage(name) {
  window.location = `./gameSearch.html?title=${name}`;
}

const button = document.querySelector('.search-btn');
const input = document.querySelector('input');

function searchGame(e) {
  if (e.type === 'click' || e.key === "Enter") {
    const gameName = input.value;
    redirectPage(gameName);
  }
}
button.addEventListener('click', searchGame);
input.addEventListener('keypress', searchGame);



