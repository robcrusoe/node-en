const products = [];

module.exports = class Product {
  constructor(title) {
      this.title = title;
  }

  /* Adds the current product to the products array ... */
  save() {
      products.push(this);
  }

  /* Fetches all the products all at once ... */
  /* `static` allows us to directly call the method on the class itself, and not on the instantiated object ... */
  static fetchAll() {
    return [...products];
  }
};
