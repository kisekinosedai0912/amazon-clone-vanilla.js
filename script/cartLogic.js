export function addToCartLogic(cartItems, products, id, quantity) {
  const index = products.findIndex(product => product.id === id);
  if (index !== -1) {
    const existing = cartItems.find(item => item.id === id);

    if (existing) existing.quantity += quantity;
    else cartItems.push({ ...products[index], quantity });
  }
  return cartItems;
}
