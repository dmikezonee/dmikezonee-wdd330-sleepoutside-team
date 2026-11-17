import CheckoutProcess from './CheckoutProcess.mjs';
import ExternalServices from './ExternalServices.mjs';
import { getLocalStorage, setLocalStorage } from './utils.mjs';

const checkoutForm = document.querySelector('#checkout-form');

const checkout = new CheckoutProcess('#checkout-form');
const dataSource = new ExternalServices('tents');

checkout.init();

checkoutForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!checkoutForm.reportValidity()) {
    return;
  }

  const cartItems = getLocalStorage('so-cart') || [];

  if (cartItems.length === 0) {
    alert('Your cart is empty. Please add products before checking out.');
    return;
  }

  const formData = new FormData(checkoutForm);
  const order = Object.fromEntries(formData);

  const totals = checkout.calculateOrderTotal();

  const packageItems = cartItems.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: Number(item.FinalPrice),
    quantity: 1,
  }));

  const payload = {
    orderDate: new Date().toISOString(),
    fname: order.fname,
    lname: order.lname,
    street: order.street,
    city: order.city,
    state: order.state,
    zip: order.zip,
    cardNumber: order.cardNumber,
    expiration: order.expiration,
    code: order.code,
    items: packageItems,
    orderTotal: totals.total,
    shipping: totals.shipping,
    tax: totals.tax,
  };

  try {
  await dataSource.checkout(payload);

  setLocalStorage('so-cart', []);

  alert('Your order was submitted successfully!');
  window.location.href = '../index.html';
    } catch {
    alert('There was a problem submitting your order. Please try again.');
    }
});