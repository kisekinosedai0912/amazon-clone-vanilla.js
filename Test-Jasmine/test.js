import { paymentTotal } from '../script/utils/payment.js';
import { formatDate } from '../script/utils/date.js'; 
import { addToCartLogic } from '../script/cartLogic.js';

describe('Case: Total of items in cart', () => {
    let cartItems;

    beforeAll(() => {
        cartItems = [
            { price: 100, quantity: 2 },
            { price: 50, quantity: 3 }
        ];
    })

    it('Cart total', () => {
        expect(paymentTotal(cartItems)).toBe(350)
    })
})

describe('Case: Date format result', () => {
    it('Date format', () => {
        let date;
        const days = 7

        expect(formatDate(date, days)).toBe('Thursday, September 11');
    })
})

describe('Case: test add to cart', () => {
    let cartItems, products;

    beforeEach(() => {
        cartItems = [];
        products = [
            { id: 'p1', price: 100, productName: 'Socks' },
            { id: 'p2', price: 200, productName: 'Shirt' }
        ];
    });

    it('should add a new product', () => {
        const result = addToCartLogic(cartItems, products, 'p1', 2);
        expect(result.length).toBe(1);
        expect(result[0].quantity).toBe(2);
    });

    it('should increase quantity if product already exists', () => {
        cartItems.push({ id: 'p1', price: 100, productName: 'Socks', quantity: 1 });
        const result = addToCartLogic(cartItems, products, 'p1', 3);
        expect(result[0].quantity).toBe(4);
    });
})