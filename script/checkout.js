// This file handles all the checkout logic and functionality
import { globalEventListener } from './utils/globalListener.js';

let cartOverview = ''

cartItems.forEach(item => {
    cartOverview += `<div class="cart-item-container">
                        <div class="delivery-date">
                            Delivery date: Tuesday, June 21
                        </div>

                        <div class="cart-item-details-grid">
                            <img class="product-image"
                                src="${item.image}">

                            <div class="cart-item-details">
                                <div class="product-name">
                                    ${item.productName}
                                </div>
                                <div class="product-price">
                                    ₱${item.price.toLocaleString("en-PH")}
                                </div>
                                <div class="product-quantity">
                                    <span>
                                        Quantity: <span class="quantity-label">${item.quantity}</span>
                                    </span>
                                    <span class="update-quantity-link link-primary" data-id="${item.id}">
                                        Update
                                    </span>
                                    <span class="delete-quantity-link link-primary" data-id="${item.id}">
                                        Delete
                                    </span>
                                </div>
                            </div>

                            <div class="delivery-options">
                                <div class="delivery-options-title">
                                    Choose a delivery option:
                                </div>
                                <div class="delivery-option">
                                    <input type="radio" checked
                                        class="delivery-option-input"
                                        name="delivery-option-${item.id}">
                                    <div>
                                        <div class="delivery-option-date">
                                        Tuesday, June 21
                                        </div>
                                        <div class="delivery-option-price">
                                        FREE Shipping
                                        </div>
                                    </div>
                                </div>
                                <div class="delivery-option">
                                    <input type="radio"
                                        class="delivery-option-input"
                                        name="delivery-option-${item.id}">
                                    <div>
                                        <div class="delivery-option-date">
                                        Wednesday, June 15
                                        </div>
                                        <div class="delivery-option-price">
                                        $4.99 - Shipping
                                        </div>
                                    </div>
                                </div>
                                <div class="delivery-option">
                                    <input type="radio"
                                        class="delivery-option-input"
                                        name="delivery-option-${item.id}">
                                    <div>
                                        <div class="delivery-option-date">
                                        Monday, June 13
                                        </div>
                                        <div class="delivery-option-price">
                                        $9.99 - Shipping
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
    document.querySelector('.order-summary').innerHTML = cartOverview;
});

const orderSummaryBoxes = document.querySelector('.order-summary');
// Update function code
globalEventListener('click', orderSummaryBoxes, e => {
    const updatedLinks = e.target.closest('.update-quantity-link');
    const saveLinks = e.target.closest('.save-quantity-link');

    if (updatedLinks) {
        const productId = updatedLinks.dataset.id;
        const product = cartItems.find(item => item.id === productId);
        const container = updatedLinks.closest('.cart-item-container');
        const qtyLabel = container.querySelector('.quantity-label');

        qtyLabel.innerHTML = `<input type="number" class="new-quantity" min="1" max="20" value="${product.quantity}" />`;

        updatedLinks.textContent = 'Save';
        updatedLinks.classList.remove('update-quantity-link');
        updatedLinks.classList.add('save-quantity-link');
    }

    if (saveLinks) {
        const productId = saveLinks.dataset.id; 
        const product = cartItems.find(item => item.id === productId);
        const container = saveLinks.closest('.cart-item-container');
        const updatedQty = container.querySelector('.new-quantity');
        const parsedQty = parseInt(updatedQty.value, 10);

        if (!isNaN(parsedQty) && parsedQty > 0) {
        product.quantity = parsedQty;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }

        container.querySelector('.quantity-label').textContent = product.quantity;

        saveLinks.textContent = 'Update';
        saveLinks.classList.remove('save-quantity-link');
        saveLinks.classList.add('update-quantity-link');
    }
})

// Delete function code
function deleteCartItem(id) {
    const productToDelete = cartItems.findIndex(item => item.id === id);
    if (productToDelete !== -1) cartItems.splice(productToDelete, 1);
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    location.reload()
}

globalEventListener('click', orderSummaryBoxes, e => {
    const deleteLinks = e.target.closest('.delete-quantity-link');
    
    if (deleteLinks) deleteCartItem( deleteLinks.dataset.id);
})