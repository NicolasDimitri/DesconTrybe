const ENDPOINT = 'https://www.cheapshark.com/api/1.0/'

function parse_query_string(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    if (typeof query_string[key] === "undefined") {
      query_string[key] = decodeURIComponent(value);
    } else if (typeof query_string[key] === "string") {
      var arr = [query_string[key], decodeURIComponent(value)];
      query_string[key] = arr;
    } else {
      query_string[key].push(decodeURIComponent(value));
    }
  }
  return query_string;
}

async function fetchGameByName(name) {
  const response = await fetch(ENDPOINT + `games?title=${name}&limit=20`);
  const json = await response.json();
  return json;
};

async function fetchGameByID(id) {
  const response = await fetch(ENDPOINT + `games?id=${id}`);
  const json = await response.json();
  return json;
};

function createCustomElement(tag, className, text='') {
  const element = document.createElement(tag);
  element.classList.add(className);
  element.innerText = text;
  return element;
}

function createGameElement({external:title, thumb}) {
  const gameSection = createCustomElement('section', 'game-section');

  const gameThumb = createCustomElement('div', 'game-thumb');
  gameThumb.style.backgroundImage = `url(${thumb})`;
  gameSection.appendChild(gameThumb);

  const gameTitle = createCustomElement('p', 'game-title', title);
  gameSection.appendChild(gameTitle);

  return gameSection;
};

async function insertGames(games) {
  const main = document.querySelector('main');
  games.forEach((game) => {
    const gameElement = createGameElement(game);
    main.appendChild(gameElement);
  });
};

window.onload = async () => {
  const query = window.location.search.substring(1);
  const {title} = parse_query_string(query);
  const games = await fetchGameByName(title);
  console.log(games)
  insertGames(games);
};