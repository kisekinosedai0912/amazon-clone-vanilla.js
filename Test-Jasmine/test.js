import { paymentTotal } from '../script/utils/payment.js';
import { formatDate } from '../script/utils/date.js'; 

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