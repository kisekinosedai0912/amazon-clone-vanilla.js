export class Product {
    constructor(products) {
        this.id = products.id;
        this.image = products.image;
        this.productName = products.productName;
        this.rating = products.rating;
        this.price = products.price;
        this.keywords = products.keywords;
    }

    getImgPath() {
        return `../images/ratings/rating-${this.rating.stars * 10}.png`;
    }

    formatPrice() {
        return this.price.toLocaleString("en-PH");
    }
}