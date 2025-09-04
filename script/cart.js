// Cart functionality js
import { addToCartLogic } from './cartLogic.js';

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const cartCount = document.getElementById('cart-count');
cartCount.textContent = cartItems.length;

// Function to add in cart
export function addToCart(id, quantity) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems = addToCartLogic(cartItems, products, id, quantity);

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  document.getElementById('cart-count').textContent = cartItems.length;

  const productContainer = document.querySelector(`.product-container[data-id="${id}"]`);
  const addedToCartText = productContainer.querySelector('.added-to-cart');
  addedToCartText.style.opacity = 1;
  setTimeout(() => (addedToCartText.style.opacity = 0), 2000);
}

// Event listener for add to cart buttons
document.querySelector('.products-grid').addEventListener('click', e => {
  if (e.target.classList.contains('add-to-cart-button')) {
    const productId = e.target.dataset.id;

    // Get matching select value
    const qtySelect = e.target.closest('.product-container').querySelector('.quantity-select');
    const quantity = parseInt(qtySelect.value, 10);

    addToCart(productId, quantity);
  }
});
