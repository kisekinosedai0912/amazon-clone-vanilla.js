export class Checkout {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cartItems-oop'));
    } 

    // Function to update cart items
    updateCart(e) {
        const updatedLinks = e.target.closest('.update-quantity-link');
        const saveLinks = e.target.closest('.save-quantity-link');

        if (updatedLinks) {
            const productId = updatedLinks.dataset.id;
            const product = this.items.find(item => item.id === productId);
            const container = updatedLinks.closest('.cart-item-container');
            const qtyLabel = container.querySelector('.quantity-label');

            qtyLabel.innerHTML = `<input type="number" class="new-quantity" min="1" max="20" value="${product.quantity}" />`;
            updatedLinks.textContent = 'Save';
            updatedLinks.classList.remove('update-quantity-link');
            updatedLinks.classList.add('save-quantity-link');
        }

        if (saveLinks) {
            const productId = saveLinks.dataset.id; 
            const product = this.items.find(item => item.id === productId);
            const container = saveLinks.closest('.cart-item-container');
            const updatedQty = container.querySelector('.new-quantity');
            const parsedQty = parseInt(updatedQty.value, 10);

            if (!isNaN(parsedQty) && parsedQty > 0) {
                product.quantity = parsedQty;
                localStorage.setItem('cartItems-oop', JSON.stringify(this.items));
            }

            container.querySelector('.quantity-label').textContent = product.quantity;

            saveLinks.textContent = 'Update';
            saveLinks.classList.remove('save-quantity-link');
            saveLinks.classList.add('update-quantity-link');
        }
    }

    // Function for deleting cart items
    deleteCartItem(id) {
        const productToDelete = this.items.findIndex(item => item.id === id);
        if (productToDelete !== -1) this.items.splice(productToDelete, 1);    
        
        localStorage.setItem('cartItems-oop', JSON.stringify(this.items));
        location.reload()
    }
}