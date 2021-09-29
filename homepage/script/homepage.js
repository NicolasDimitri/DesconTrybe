let stores;
let deals;
const urlDeals = 'https://www.cheapshark.com/api/1.0/deals?pageSize=50';
const urlStores = 'https://www.cheapshark.com/api/1.0/stores';

async function fetchStores() {
  const response = await fetch(urlStores);
  const result = await response.json();
  return result;
}

async function fetchDeals() {
  const response = await fetch(urlDeals);
  const result = await response.json();
  return result;
}

function getStoreImage(id) {
  const store = stores.find(({ storeID }) => id === storeID);
  const logo = `https://www.cheapshark.com/${store.images.logo}`;
  return logo;
}

function groupByDeals(deals) {
  const groupedDeals = [];

  for (let i = 0; i < deals.length; i++) {
    const deal = deals[i];
    const isRepeated = groupedDeals.some((game) => game.id === deal.gameID);

    let game = {};
    game.deals = [];

    if (isRepeated) {
      game = groupedDeals.find(({ id }) => deal.gameID === id);
      game.deals.push(deal);
      game.deals.sort((a, b) => a.salePrice - b.salePrice);
    } else {
      game.id = deal.gameID;
      game.deals = [deal];
      groupedDeals.push(game);
    }
  }
  return groupedDeals;
}

function getGamesWithStores(gameList) {
  const groupedDeals = groupByDeals(gameList);
  const filteredGames = [];
  groupedDeals.forEach((game) => {
    const mainDeal = game.deals[0];
    const ids = game.deals.map((deal) => deal.storeID);
    mainDeal.storeIDS = ids;
    filteredGames.push(mainDeal);
  });
  return filteredGames;
}

async function insertDeals(data) {
  const filteredGames = getGamesWithStores(data);
  filteredGames.forEach(
    ({ normalPrice, salePrice, savings, thumb, title, storeIDS }) => {
      createElements({
        normalPrice,
        salePrice,
        savings,
        thumb,
        title,
        storeIDS,
      });
    }
  );
}

function createLogosIcons(storeIDS) {
  const sectionLogo = document.createElement('section');
  sectionLogo.classList.add('game-stores');

  storeIDS.forEach((id) => {
    const image = getStoreImage(id);
    const imgLogo = document.createElement('img');
    imgLogo.classList.add('logo')
    imgLogo.src = image;
    sectionLogo.appendChild(imgLogo);
  });

  sectionLogo.firstChild.classList.add('selected')
  return sectionLogo;
}

function createElements({
  normalPrice,
  salePrice,
  savings,
  thumb,
  title,
  storeIDS,
}) {
  const sectionDeals = document.querySelector('.deals');

  const sectionGame = document.createElement('section');
  sectionGame.classList.add('game-section');
  sectionDeals.appendChild(sectionGame);

  const divThumb = document.createElement('div');
  divThumb.classList.add('game-thumb');
  sectionGame.appendChild(divThumb);
  divThumb.style.backgroundImage = `url(${thumb})`;

  const divGameDetail = document.createElement('div');
  divGameDetail.classList.add('game-detail');
  sectionGame.appendChild(divGameDetail);

  const spanGameTitle = document.createElement('span');
  spanGameTitle.classList.add('game-title');
  divGameDetail.appendChild(spanGameTitle);
  spanGameTitle.innerText = title;
  spanGameTitle.style.fontWeight = 900;

  const btnWishlist = document.createElement('button');
  btnWishlist.classList.add('btn-wishlist');
  divThumb.appendChild(btnWishlist);

  const btnImg = document.createElement('img');
  btnImg.classList.add('btn-add-img');
  btnImg.src = 'images/wishlist.svg';
  btnWishlist.appendChild(btnImg);

  const divValues = document.createElement('div');
  divValues.classList.add('game-values');
  sectionGame.appendChild(divValues);

  const spanNormalValue = document.createElement('span');
  spanNormalValue.classList.add('normal-price');
  divValues.appendChild(spanNormalValue);
  spanNormalValue.innerText = `$${normalPrice}`;
  spanNormalValue.style.textDecoration = 'line-through';

  const spanSaleValue = document.createElement('span');
  spanSaleValue.classList.add('sale-price');
  divValues.appendChild(spanSaleValue);
  spanSaleValue.innerText = `${salePrice}`;

  const spanPercentageValue = document.createElement('span');
  spanPercentageValue.classList.add('percentage-savings');
  divValues.appendChild(spanPercentageValue);
  spanPercentageValue.innerText = `${Math.round(savings)}%`;

  const sectionLogo = createLogosIcons(storeIDS);
  sectionGame.appendChild(sectionLogo);
}

window.onload = async function () {
  stores = await fetchStores();
  deals = await fetchDeals();
  insertDeals(deals);
};
