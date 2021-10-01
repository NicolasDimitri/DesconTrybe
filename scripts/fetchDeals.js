let stores;
let deals;
const urlDeals = 'https://www.cheapshark.com/api/1.0/deals?pageSize=30';
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

async function fetchDealsByTitle(title) {
  const response = await fetch(`${urlDeals}&title=${title}`);
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

function createLogosIcons(storeIDS) {
  const sectionLogo = document.createElement('section');
  sectionLogo.classList.add('game-stores');

  storeIDS.forEach((id) => {
    const image = getStoreImage(id);
    const imgLogo = document.createElement('img');
    imgLogo.classList.add('logo');
    imgLogo.src = image;
    sectionLogo.appendChild(imgLogo);
  });

  sectionLogo.firstChild.classList.add('selected');
  return sectionLogo;
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
