const urlDeals = 'https://www.cheapshark.com/api/1.0/deals';

const urlStores = 'https://www.cheapshark.com/api/1.0/stores';


async function getDeals() {
  const response = await fetch(urlDeals);
  const result = await response.json();
  console.log(result);
  result.forEach(({ normalPrice, salePrice, savings, thumb, title }) => {
    createElements({ normalPrice, salePrice, savings, thumb, title });
  })
};

function createElements({ normalPrice, salePrice, savings, thumb, title }) {
  const sectionDeals = document.querySelector('.deals');

  const sectionGame = document.createElement('section');
  sectionGame.classList.add("game-section");
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

  const btnWishlist = document.createElement('button');
  btnWishlist.classList.add('btn-wishlist');
  divThumb.appendChild(btnWishlist);

  const divGameStore = document.createElement('div');
  divGameStore.classList.add('game-store');
  sectionGame.appendChild(divGameStore);

  const imgGameStore = document.createElement('img');
  imgGameStore.classList.add('store-logo');
  divGameStore.appendChild(imgGameStore);
  
  const divValues = document.createElement('div');
  divValues.classList.add('game-values');
  sectionGame.appendChild(divValues);

  const spanNormalValue = document.createElement('span');
  spanNormalValue.classList.add('normal-price');
  divValues.appendChild(spanNormalValue);
  spanNormalValue.innerText = `Normal price: $${normalPrice}`;

  const spanSaleValue = document.createElement('span');
  spanSaleValue.classList.add('sale-price');
  divValues.appendChild(spanSaleValue);
  spanSaleValue.innerText = `Sale price: $${salePrice}`;

  const spanPercentageValue = document.createElement('span');
  spanPercentageValue.classList.add('percentage-savings');
  divValues.appendChild(spanPercentageValue);
  spanPercentageValue.innerText = `${Math.round(savings)}%`
};



window.onload = function() {
  getDeals();
}