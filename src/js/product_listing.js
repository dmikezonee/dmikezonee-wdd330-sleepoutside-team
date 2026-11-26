
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const category = new URLSearchParams(window.location.search).get('category');

const dataSource = new ProductData(category);
const productList = new ProductList(
  category,
  dataSource,
  document.querySelector('.product-list'),
);

productList.init();
