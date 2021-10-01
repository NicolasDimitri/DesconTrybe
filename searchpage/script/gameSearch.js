const ENDPOINT = 'https://www.cheapshark.com/api/1.0/';

function parse_query_string(query) {
  var vars = query.split('&');
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    if (typeof query_string[key] === 'undefined') {
      query_string[key] = decodeURIComponent(value);
    } else if (typeof query_string[key] === 'string') {
      var arr = [query_string[key], decodeURIComponent(value)];
      query_string[key] = arr;
    } else {
      query_string[key].push(decodeURIComponent(value));
    }
  }
  return query_string;
}

// async function fetchGameByName(name) {
//   const response = await fetch(ENDPOINT + `games?title=${name}&limit=20`);
//   const json = await response.json();
//   return json;
// }

// async function fetchGameByID(id) {
//   const response = await fetch(ENDPOINT + `games?id=${id}`);
//   const json = await response.json();
//   return json;
// }

function createCustomElement(tag, className, text = '') {
  const element = document.createElement(tag);
  element.classList.add(className);
  element.innerText = text;
  return element;
}

function createGameElement({ title, thumb, salePrice }) {
  const gameSection = createCustomElement('div', 'game-section');

  const gameTitleThumb = createCustomElement('p', 'game-title', title);
  gameSection.appendChild(gameTitleThumb);

  const gameThumb = createCustomElement('div', 'game-thumb');
  gameThumb.style.backgroundImage = `url(${thumb})`;
  gameSection.appendChild(gameThumb);

  const description = createCustomElement('div', 'description');
  gameSection.appendChild(description)

  const gameTitle = createCustomElement('p', 'title2', title);
  description.appendChild(gameTitle);

  const gamePrice = createCustomElement('p', 'normal-price', '$' + salePrice);
  description.appendChild(gamePrice);

  return gameSection;
}

async function insertGames(games) {
  const main = document.querySelector('main');
  games.forEach((game) => {
    const gameElement = createGameElement(game);
    main.appendChild(gameElement);
  });
}

window.onload = async () => {
  const query = window.location.search.substring(1);
  const { title } = parse_query_string(query);
  const games = await fetchDealsByTitle(title);
  insertGames(games);
};

const btnAnimated = document.querySelector('.logo');

let menuOpen = false;
btnAnimated.addEventListener('click', () => {
  if (!menuOpen) {
    btnAnimated.classList.add('open');
    menuOpen = true;
  } else {
    btnAnimated.classList.remove('open');
    menuOpen = false;
  }
});


const btnFav = document.querySelector('.teste-de-animation');

let fav = false;
btnFav.addEventListener('click', () => {
  if (!fav) {
    btnFav.classList.add('open');
    fav = true;
  } else {
    btnFav.classList.remove('open');
    fav = false;
  }
});