
const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ProductData {
  constructor(category) {
    this.category = category;
  }

  async getData() {
    try {
      const response = await fetch(
        `${baseURL}products/search/${this.category}`,
      );

      if (!response.ok) {
        throw new Error('Unable to fetch products');
      }

      const data = await response.json();
      return data.Result;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async findProductById(id) {
    try {
      const response = await fetch(`${baseURL}product/${id}`);

      if (!response.ok) {
        throw new Error('Unable to fetch product');
      }

      const data = await response.json();
      return data.Result;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }
}
