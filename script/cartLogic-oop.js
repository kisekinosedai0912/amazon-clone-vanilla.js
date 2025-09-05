export class Cart {
  constructor(products = []) {
    this.items = JSON.parse(localStorage.getItem('cartItems-oop')) || [];
    this.products = products; 
  }

  addToCart(id, quantity) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      const existing = this.items.find(item => item.id === id);

      if (existing) existing.quantity += quantity;
      else this.items.push({ ...this.products[index], quantity });

      localStorage.setItem('cartItems-oop', JSON.stringify(this.items));
    }
    return this.items;
  }
}