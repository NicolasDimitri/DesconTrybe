const ENDPOINT = 'https://www.cheapshark.com/api/1.0/';

let stores;
let deals;

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

function createCustomElement(tag, className, text = '') {
  const element = document.createElement(tag);
  element.classList.add(className);
  element.innerText = text;
  return element;
}

function createGameElement({
  title,
  thumb,
  savings,
  normalPrice,
  salePrice,
  storeIDS,
}) {
  const gameSection = createCustomElement('div', 'game-section');

  const gameThumb = createCustomElement('div', 'game-thumb');
  gameThumb.style.backgroundImage = `url(${thumb})`;

  const btnFav = document.createElement('div');
  const plusInFav = document.createElement('div');
  btnFav.className = 'teste-de-animation';
  plusInFav.className = 'plus';
  btnFav.appendChild(plusInFav);
  botaoDeFav(btnFav);

  gameThumb.appendChild(btnFav);
  gameSection.appendChild(gameThumb);

  const titleIcons = createCustomElement('div', 'title-icons');
  gameSection.appendChild(titleIcons);

  const gameTitle = createCustomElement('p', 'game-title', title);
  titleIcons.appendChild(gameTitle);

  const gameStoreLogos = createLogosIcons(storeIDS);
  titleIcons.appendChild(gameStoreLogos);

  const gameSavings = createCustomElement(
    'div',
    'sale',
    `${Math.trunc(savings)}%`
  );
  gameSection.appendChild(gameSavings);

  const gamePrices = createCustomElement('div', 'game-prices');
  gameSection.appendChild(gamePrices);

  const gameNormalPrice = createCustomElement(
    'p',
    'normal-price',
    '$' + normalPrice
  );
  gamePrices.appendChild(gameNormalPrice);

  const gameSalePrice = createCustomElement('p', 'sale-price', '$' + salePrice);
  gamePrices.appendChild(gameSalePrice);

  return gameSection;
}

async function insertGames(games) {
  const filteredGames = getGamesWithStores(games);
  const main = document.querySelector('main');

  filteredGames.forEach((game) => {
    const gameElement = createGameElement(game);
    main.appendChild(gameElement);
  });
}

window.onload = async () => {
  const query = window.location.search.substring(1);
  const { title } = parse_query_string(query);
  stores = await fetchStores();
  deals = await fetchDealsByTitle(title);
  insertGames(deals);
};

const btnAnimated = document.querySelector('.bagulho');

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
