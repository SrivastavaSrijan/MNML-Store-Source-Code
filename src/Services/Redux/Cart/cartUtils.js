export const updateItemInCart = (itemToUpdate, cartItems) => {
  const { id } = itemToUpdate;
  const isExisting = cartItems[id];
  if (isExisting) {
    const totalQuantity = itemToUpdate['sizesSelected'].reduce((total, { quantityAddedOfSize }) => {
      return total + quantityAddedOfSize;
    }, 0);
    itemToUpdate['totalQuantity'] = totalQuantity;
    totalQuantity === 0 ? delete cartItems[id] : (cartItems[id] = itemToUpdate);
  } else {
    itemToUpdate['totalQuantity'] = 1;
    cartItems[id] = itemToUpdate;
  }
  return cartItems;
};
export const removeItemFrom = (itemToRemove, cartItems) => {
  delete cartItems[itemToRemove.id];
  return cartItems;
};
export const updateSavedItem = (itemToUpdate, savedItems, flag) => {
  const { id } = itemToUpdate;
  const isExisting = savedItems[id];
  if (isExisting && flag) {
    delete savedItems[id];
  } else {
    itemToUpdate['isSaved'] = true;
    savedItems[id] = itemToUpdate;
  }
  return savedItems;
};
export const totalPrice = (cartItems) =>
  Object.entries(cartItems).reduce((total, [key, { totalQuantity, priceArray }], index) => {
    return total + totalQuantity * priceArray[1];
  }, 0);

export const totalPriceAfterDiscount = (cartItems) =>
  Object.entries(cartItems).reduce((total, [key, { totalQuantity, priceArray }], index) => {
    return total + totalQuantity * priceArray[0];
  }, 0);
export const totalItemsInCart = (cartItems) =>
  Object.entries(cartItems).reduce((total, [key, { totalQuantity, priceArray }], index) => {
    return total + totalQuantity;
  }, 0);
