function createWishlist() {
  if (!localStorage['wishlist']) {
    localStorage.setItem('wishlist', JSON.stringify([]));
  }
}

function addGameToWishlist(e) {
  createWishlist();

  const btnWishlist = e.target.closest('.btn-wishlist');
  const dealID = btnWishlist.id;
  const wishlist = JSON.parse(localStorage.getItem('wishlist'));
  const alreadyExists = wishlist.includes(dealID);

  if (alreadyExists) {
    const index = wishlist.indexOf(dealID);
    wishlist.splice(index, 1);
  } else {
    wishlist.push(dealID);
  }
  btnWishlist.classList.toggle('open');
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function isGameWished(gameID) {
  createWishlist();
  const wishlist = JSON.parse(localStorage.getItem('wishlist'));

  return wishlist.includes(gameID) ? true : false;
}

function addWishlistButtonClass(button, id) {
  if (isGameWished(id)) {
    button.classList.add('open');
  } else {
    button.classList.remove('open');
  }
}
