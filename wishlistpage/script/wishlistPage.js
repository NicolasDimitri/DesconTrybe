let deals;
let stores;

function createCustomElement(tag, className, text = '') {
  const element = document.createElement(tag);
  element.classList.add(className);
  element.innerText = text;
  return element;
}

function createGameElement(deal) {
  const {
    dealID,
    retailPrice,
    salePrice,
    thumb,
    name,
    storeID,
  } = deal.gameInfo;
  const gameSection = createCustomElement('div', 'game-section');
  const gameThumb = createCustomElement('div', 'game-thumb');
  gameThumb.style.backgroundImage = `url(${thumb})`;

  const btnWishlist = document.createElement('div');
  const plusInFav = document.createElement('div');
  btnWishlist.className = 'btn-wishlist';
  btnWishlist.id = dealID;
  addWishlistButtonClass(btnWishlist, dealID)
  plusInFav.className = 'plus';
  btnWishlist.appendChild(plusInFav);
  btnWishlist.addEventListener('click', addGameToWishlist);

  gameThumb.appendChild(btnWishlist);
  gameSection.appendChild(gameThumb);

  const titleIcons = createCustomElement('div', 'title-icons');
  gameSection.appendChild(titleIcons);

  const gameTitle = createCustomElement('p', 'game-title', name);
  titleIcons.appendChild(gameTitle);

  const storeLogo = createLogosIcons([storeID])
  titleIcons.appendChild(storeLogo);

  const gamePrices = createCustomElement('div', 'game-prices');
  gameSection.appendChild(gamePrices);

  const gameNormalPrice = createCustomElement(
    'p',
    'normal-price',
    '$' + retailPrice
  );
  gamePrices.appendChild(gameNormalPrice);

  const gameSalePrice = createCustomElement('p', 'sale-price', '$' + salePrice);
  gamePrices.appendChild(gameSalePrice);

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
  deals = await fetchWishlist();
  stores = await fetchStores();
  insertGames(deals);
};