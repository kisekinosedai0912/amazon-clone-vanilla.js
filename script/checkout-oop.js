// This file handles all the checkout logic and functionality
import { globalEventListener } from './utils/globalListener.js';
import { formatDate} from './utils/date.js';
import { paymentTotal } from './utils/payment.js'; 

let cartOverview = '';
let setDate;
const orderSummaryBoxes = document.querySelector('.order-summary');

const checkoutSummary = {
    cartItems: JSON.parse(localStorage.getItem('cartItems-oop')) || [],

    // Function to render cart items
    renderCartItems() {
        this.cartItems.forEach(item => {
            cartOverview += `<div class="cart-item-container">
                                <div class="delivery-date">
                                    Delivery date: Wednesday, September 3
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
                                                ${formatDate(setDate, 7)}
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
                                                ${formatDate(setDate, 3)}
                                                </div>
                                                <div class="delivery-option-price">
                                                ₱150 - Shipping
                                                </div>
                                            </div>
                                        </div>
                                        <div class="delivery-option">
                                            <input type="radio"
                                                class="delivery-option-input"
                                                name="delivery-option-${item.id}">
                                            <div>
                                                <div class="delivery-option-date">
                                                ${formatDate(setDate, 1)}
                                                </div>
                                                <div class="delivery-option-price">
                                                ₱200 - Shipping
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
            orderSummaryBoxes.innerHTML = cartOverview;
        });
    },

    // Function to update cart items
    updateCart(e) {
        const updatedLinks = e.target.closest('.update-quantity-link');
        const saveLinks = e.target.closest('.save-quantity-link');

        if (updatedLinks) {
            const productId = updatedLinks.dataset.id;
            const product = this.cartItems.find(item => item.id === productId);
            const container = updatedLinks.closest('.cart-item-container');
            const qtyLabel = container.querySelector('.quantity-label');

            qtyLabel.innerHTML = `<input type="number" class="new-quantity" min="1" max="20" value="${product.quantity}" />`;

            updatedLinks.textContent = 'Save';
            updatedLinks.classList.remove('update-quantity-link');
            updatedLinks.classList.add('save-quantity-link');
        }

        if (saveLinks) {
            const productId = saveLinks.dataset.id; 
            const product = this.cartItems.find(item => item.id === productId);
            const container = saveLinks.closest('.cart-item-container');
            const updatedQty = container.querySelector('.new-quantity');
            const parsedQty = parseInt(updatedQty.value, 10);

            if (!isNaN(parsedQty) && parsedQty > 0) {
                product.quantity = parsedQty;
                localStorage.setItem('cartItems-oop', JSON.stringify(this.cartItems));
            }

            container.querySelector('.quantity-label').textContent = product.quantity;

            saveLinks.textContent = 'Update';
            saveLinks.classList.remove('save-quantity-link');
            saveLinks.classList.add('update-quantity-link');
        }
    },

    // Function for deleting cart items
    deleteCartItem(id) {
        const productToDelete = this.cartItems.findIndex(item => item.id === id);
        if (productToDelete !== -1) this.cartItems.splice(productToDelete, 1);    
        
        localStorage.setItem('cartItems-oop', JSON.stringify(this.cartItems));
        location.reload()
    },

    // Function for radio select and update
    selectShippingOptions(e) {
        if (e.target.matches(`input[type="radio"][name^="delivery-option-"]`)) {
            const optionContainer = e.target.closest('.delivery-option');
            const productContainer = e.target.closest('.cart-item-container');
            const deliveryDate = productContainer.querySelector('.delivery-date');
            const date = optionContainer.querySelector('.delivery-option-date');
            
            return deliveryDate.textContent = `Delivery date: ${date.textContent}`;
        }
    }
}
checkoutSummary.renderCartItems();

// Event listeners
globalEventListener('click', orderSummaryBoxes, e => checkoutSummary.updateCart(e));
globalEventListener('change', orderSummaryBoxes, e => checkoutSummary.selectShippingOptions(e));
globalEventListener('click', orderSummaryBoxes, e => {
    const deleteLinks = e.target.closest('.delete-quantity-link');
    
    if (deleteLinks) deleteCartItem( deleteLinks.dataset.id);
})

paymentTotal(checkoutSummary.cartItems);

(function renderPaymentSummary() {
    let totalSummary = paymentTotal(checkoutSummary.cartItems);

    const paymentInfo = `<div class="payment-summary-title">
                            Order Summary
                        </div>

                        <div class="payment-summary-row">
                            <div>Items (3):</div>
                            <div class="payment-summary-money">₱${Math.round(totalSummary).toLocaleString("en-PH")}</div>
                        </div>

                        <div class="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div class="payment-summary-money">₱4.99</div>
                        </div>

                        <div class="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div class="payment-summary-money">₱47.74</div>
                        </div>

                        <div class="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div class="payment-summary-money">₱4.77</div>
                        </div>

                        <div class="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div class="payment-summary-money">₱52.51</div>
                        </div>

                        <button class="place-order-button button-primary">
                            Place your order
                        </button>`;
    document.querySelector('.payment-summary').innerHTML = paymentInfo;
})();