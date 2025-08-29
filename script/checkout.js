// This file handles all the checkout logic and functionality
let cartOverview = ''

cartItems.forEach(item => {
    cartOverview += `<div class="cart-item-container" data-id="${item.id}">
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
                                    <span class="update-quantity-link link-primary">
                                        Update
                                    </span>
                                    <span class="delete-quantity-link link-primary">
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
                                        name="delivery-option-1">
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
                                        name="delivery-option-1">
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
                                        name="delivery-option-1">
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
    return document.querySelector('.order-summary').innerHTML = cartOverview;
});

document.querySelector('.order-summary').addEventListener('click', e => {
  const container = e.target.closest('.cart-item-container');
  if (!container) return;

  const productId = container.dataset.id;
  const item = cartItems.find(product => product.id === productId);

  if (e.target.classList.contains('update-quantity-link')) {
    const qtyLabel = container.querySelector('.quantity-label');
    qtyLabel.innerHTML = `<input type="number" class="new-quantity" min="1" max="20" value="${item.quantity}" />`;

    e.target.textContent = 'Save';
    e.target.classList.remove('update-quantity-link');
    e.target.classList.add('save-quantity-link');
  }

  if (e.target.classList.contains('save-quantity-link')) {
    const updatedQty = container.querySelector('.new-quantity');
    const newVal = parseInt(updatedQty.value, 10);

    if (!isNaN(newVal) && newVal > 0) {
      item.quantity = newVal;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    container.querySelector('.quantity-label').textContent = item.quantity;

    e.target.textContent = 'Update';
    e.target.classList.remove('save-quantity-link');
    e.target.classList.add('update-quantity-link');
  }
});