// Cart functionality js
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const cartCount = document.getElementById('cart-count');
cartCount.textContent = cartItems.length;

// Function to add in cart
function addToCart(id, quantity) {
  const index = products.findIndex(product => product.id === id); 
  if (index !== -1) {
    const existing = cartItems.find(item => item.id === id);

    // Increment quantity if product is already in cart
    if (existing) existing.quantity += quantity 
    // If not, copy the existing products object and add quantity property
    else cartItems.push({ ...products[index], quantity });
  
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    cartCount.textContent = cartItems.length;

    const productContainer = document.querySelector(`.product-container[data-id="${id}"]`);
    const addedToCartText = productContainer.querySelector('.added-to-cart');

    setTimeout(() => {
      addedToCartText.style.opacity = 0;
    },2000);
    
    return addedToCartText.style.opacity = 1;
  }
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
