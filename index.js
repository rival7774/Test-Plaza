'use strict';

const PRODUCTS_URL = './products.json';

const getProducts = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

class Product {
  constructor(id, price) {
    this.id = id;
    this.price = price;
  }

  setPrice(newPrise) {
    this.price = newPrise;
    return this;
  }

  withDiscount(percent) {
    const newProduct = new Product(this.id, this.price);
    newProduct.discountedPrice = this.price * (100 - percent) / 100;
    return newProduct;
  }
}

class Shop {
  products = [];

  addProducts(products) {
    this.products.push(...this.modifyProducts(products));
  }

  getProduct(id) {
    return this.products.find((elem) => {
      return elem.id === id;
    }) || null;
  }

  modifyProducts(products) {
    return products.map((elem) => {
      return Object.setPrototypeOf(elem, new Product());
    });
  }
}

const shop = new Shop();

const productInit = async () => {
  const products = await getProducts(PRODUCTS_URL);
  shop.addProducts(products);
  console.log(shop.getProduct(5)
                  .setPrice(3224)
                  .withDiscount(10).discountedPrice === 2901.6);
};

productInit();
