// Loading products in the amazon page js
import { products } from "../data/products.js";

let productHTML = '';

const items = {
    renderProducts(){
        products.forEach(product => {
            productHTML += `
                    <div class="product-container" data-id="${product.id}">
                        <div class="product-image-container">
                            <img class="product-image" src="${product.image}">
                        </div>

                        <div class="product-name limit-text-to-2-lines">
                            ${product.productName}
                        </div>

                        <div class="product-rating-container">
                            <img class="product-rating-stars"
                            src="../images/ratings/rating-${product.rating.stars * 10}.png">
                            <div class="product-rating-count link-primary">
                            ${product.rating.count}
                            </div>
                        </div>

                        <div class="product-price">
                            ₱${product.price.toLocaleString("en-PH")}
                        </div>

                        <div class="product-quantity-container">
                            <select class="quantity-select" data-id="${product.id}">
                                ${[...Array(10).keys()].map(i => `<option value="${i+1}">${i+1}</option>`).join("")}
                            </select>
                        </div>

                        <div class="product-spacer"></div>

                        <div class="added-to-cart">
                            <img src="../images/icons/checkmark.png">
                            Added
                        </div>

                        <button class="add-to-cart-button button-primary" data-id="${product.id}" item-qty="">
                            Add to Cart
                        </button>
                    </div>`; 
            document.querySelector('.products-grid').innerHTML = productHTML;
        });
    }
}
// Show products on page load
items.renderProducts();