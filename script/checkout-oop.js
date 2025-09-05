// This file initializes all the logics inherited from the cart related classes
import { globalEventListener } from './utils/globalListener.js';
import { formatDate} from './utils/date.js';
import { paymentTotal } from './utils/payment.js'; 
import { Checkout } from './classes/checkoutLogic-oop.js';

let setDate;
let cartOverview = '';
let  cartItems = JSON.parse(localStorage.getItem('cartItems-oop')) || [];
const orderSummaryBoxes = document.querySelector('.order-summary');

// Instance of checkout class
const checkout = new Checkout();

const checkoutSummary = {
    // Function to render cart items
    renderCartItems() {
        cartItems.forEach(item => {
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

    // Function to render payment summary
    renderPaymentSummary() {
        let totalSummary = paymentTotal(cartItems);

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
globalEventListener('click', orderSummaryBoxes, e => checkout.updateCart(e));
globalEventListener('change', orderSummaryBoxes, e => checkoutSummary.selectShippingOptions(e));
globalEventListener('click', orderSummaryBoxes, e => {
    const deleteLinks = e.target.closest('.delete-quantity-link');
    
    if (deleteLinks) checkout.deleteCartItem( deleteLinks.dataset.id);
});

paymentTotal(cartItems);
checkoutSummary.renderPaymentSummary();