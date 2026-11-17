function convertToJson(res) {
  if (res.ok) {
    return res.json();
  }
  throw new Error('Bad Response');
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
    this.path = `${import.meta.env.BASE_URL}json/${this.category}.json`;
  }

  getData() {
    return fetch(this.path).then(convertToJson);
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }

  async checkout(payload) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    return fetch(
      'https://wdd330-backend-osp8.onrender.com/checkout',
      options,
    ).then(convertToJson);
  }
}