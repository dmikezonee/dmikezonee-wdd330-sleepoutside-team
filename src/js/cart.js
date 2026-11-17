import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  document.querySelector('.product-list').innerHTML = htmlItems.join('');

  // Calculate the cart subtotal.
  const subtotal = cartItems.reduce(
  (total, item) => total + Number(item.FinalPrice || 0),
  0,
);

  // Display the subtotal.
  document.querySelector('#cart-subtotal').textContent =
    `$${subtotal.toFixed(2)}`;
}

function cartItemTemplate(item) {
  const productUrl = `../product_pages/index.html?product=${item.Id}`;

  const newItem = `<li class="cart-card divider">
  <a href="${productUrl}" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="${productUrl}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();