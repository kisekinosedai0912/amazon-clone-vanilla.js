// Cart functionality js
import { Cart } from './classes/cartLogic-oop.js';
import { globalEventListener } from './utils/globalListener.js'

const myCart = new Cart(products);
const cartCount = document.getElementById('cart-count');
const productsGrid = document.querySelector('.products-grid');
cartCount.textContent = myCart.items.length;

globalEventListener('click', productsGrid, e => {
     if (e.target.classList.contains('add-to-cart-button')) {
        const productId = e.target.dataset.id;
        const productContainer = e.target.closest('.product-container');
        const qtySelect = productContainer.querySelector('.quantity-select');
        const quantity = parseInt(qtySelect.value, 10);

        myCart.addToCart(productId, quantity);
        cartCount.textContent = myCart.items.length;

        const addedToCartText = productContainer.querySelector('.added-to-cart');
        setTimeout(() => (addedToCartText.style.opacity = 0), 2000);
        addedToCartText.style.opacity = 1;
    }
})
