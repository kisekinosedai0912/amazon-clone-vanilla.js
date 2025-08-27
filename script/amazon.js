const cartCount = document.getElementById('cart-count');
const addToCartBtn = document.getElementById('addToCartBtn');

let count = JSON.parse(localStorage.getItem('cartCount')) || [{}];
cartCount.textContent = count.length;

showCartCount(count);
// Function to add item in cart
function addToCart(itemName, itemPrice, qty) {
    let id = count?.length > 0 ? count[count?.length - 1].id + 1 : 0;
    count.push({id, itemName, itemPrice, qty});

    return localStorage.setItem('cartCount', JSON.stringify(count));
}

// Function to show cart count
function showCartCount(arr) {
    let cartTotal = 0;
    return arr.forEach(item => cartTotal += arr.length)
}

addToCartBtn.addEventListener('click', () => {
    addToCart()
})
