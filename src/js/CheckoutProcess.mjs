import { getLocalStorage } from './utils.mjs';

export default class CheckoutProcess {
  constructor(formSelector) {
    this.formElement = document.querySelector(formSelector);
    this.cart = getLocalStorage('so-cart') || [];
    this.taxRate = 0.06;
  }

  init() {
    this.calculateSubtotal();

    const zipInput = this.formElement.querySelector('#zip');

    zipInput.addEventListener('input', () => {
      this.calculateOrderTotal();
    });
  }

  calculateSubtotal() {
    const subtotal = this.cart.reduce((total, item) => {
      return total + Number(item.FinalPrice || 0);
    }, 0);

    document.querySelector('#subtotal').textContent =
      `$${subtotal.toFixed(2)}`;

    return subtotal;
  }

  calculateShipping() {
    if (this.cart.length === 0) {
      return 0;
    }

    return 10 + (this.cart.length - 1) * 2;
  }

  calculateOrderTotal() {
    const subtotal = this.calculateSubtotal();
    const tax = subtotal * this.taxRate;
    const shipping = this.calculateShipping();
    const total = subtotal + tax + shipping;

    document.querySelector('#tax').textContent =
      `$${tax.toFixed(2)}`;

    document.querySelector('#shipping').textContent =
      `$${shipping.toFixed(2)}`;

    document.querySelector('#order-total').textContent =
      `$${total.toFixed(2)}`;

    return { subtotal, tax, shipping, total };
  }
}
