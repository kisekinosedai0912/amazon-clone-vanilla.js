export function paymentTotal(items) {
    let total = 0;
    let totalSF = 0;

    items.forEach(item => {
        const itemPrice = item.price * item.quantity;
        total += itemPrice;

        const shippingOption = document.querySelector('.delivery-option-price');
        console.log(shippingOption)
        // const shippingFee = parseInt(shippingOption.replace(/[^\d]/g, ''), 10);
        // totalSF += shippingFee;
    });
    
     
    return total;
}