import ProductData from './ProductData.mjs';
import { setLocalStorage } from './utils.mjs';

const productId = new URLSearchParams(window.location.search).get('product');

const dataSource = new ProductData('tents');
let currentProduct = null;
async function loadProductDetail() {
  currentProduct = await dataSource.findProductById(productId);

  if (!currentProduct) {
    document.querySelector('.product-detail').textContent =
      'Product not found.';
    return;
  }

  document.querySelector('.product-detail__brand').textContent =
    currentProduct.Brand.Name;

  document.querySelector('.product-detail__name').textContent =
    currentProduct.Name;

  const productImage = document.querySelector('.product-detail__image');
  productImage.src = currentProduct.Images.PrimaryLarge;
  productImage.alt = currentProduct.Name;

  document.querySelector('.product-card__price').textContent =
    `$${currentProduct.FinalPrice}`;

  document.querySelector('.product__description').innerHTML =
  currentProduct.DescriptionHtmlSimple;
}
function addToCartHandler() {
  if (!currentProduct) {
    return;
  }

  const cartProduct = {
    Id: currentProduct.Id,
    Name: currentProduct.Name,
    Image: currentProduct.Images.PrimaryMedium,
    Colors: currentProduct.Colors,
    FinalPrice: currentProduct.FinalPrice,
  };

 const storedCart = JSON.parse(localStorage.getItem('so-cart'));

const cartItems = Array.isArray(storedCart)
  ? storedCart
  : storedCart
    ? [storedCart]
    : [];

cartItems.push(cartProduct);

setLocalStorage('so-cart', cartItems);
}
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);

loadProductDetail();