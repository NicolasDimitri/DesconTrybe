let deals;
let stores;

async function insertDeals(data) {
  const filteredGames = getGamesWithStores(data);
  filteredGames.forEach((game) => {
    createElements(game);
  });
}

function createElements({
  dealID,
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

  const btnWishlist = document.createElement('div');
  const plusInFav = document.createElement('div');

  btnWishlist.className = 'btn-wishlist';
  btnWishlist.id = dealID;
  addWishlistButtonClass(btnWishlist, dealID);
  btnWishlist.addEventListener('click', addGameToWishlist);
  plusInFav.className = 'plus';
  btnWishlist.appendChild(plusInFav);
  divThumb.appendChild(btnWishlist);

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
  //escrito pelo nic

  // const btnImg = document.createElement('img');
  // btnImg.classList.add('btn-add-img');
  // btnImg.src = '/homepage/images/wishlist.svg';
  // btnWishlist.appendChild(btnImg);

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
  spanSaleValue.innerText = `$${salePrice}`;

  const spanPercentageValue = document.createElement('span');
  spanPercentageValue.classList.add('percentage-savings');
  divValues.appendChild(spanPercentageValue);
  spanPercentageValue.innerText = `${Math.round(savings)}%`;

  const sectionLogo = createLogosIcons(storeIDS);
  sectionGame.appendChild(sectionLogo);
}

function createLoad() {
  const loader = document.createElement('div');
  const div = document.createElement('div');
  const sectionGame = document.querySelector('section')
  loader.className = 'loader';
  loader.appendChild(div);
  sectionGame.appendChild(loader);
}

function apagaLoad() {
  document.querySelector('.loader').remove()
}

window.onload = async function () {
createLoad()
  stores = await fetchStores();
  deals = await fetchDeals();
  // apagaLoad()
  insertDeals(deals);
};
