export const updateQuantity = (itemsToUpdate, productData, single) => {
  if (single) {
    productData[itemsToUpdate.id] = itemsToUpdate;
  } else {
    itemsToUpdate.forEach((itemToUpdate) => {
      productData[itemToUpdate.id] = itemToUpdate;
    });
  }

  return productData;
};
export const updateSaved = (itemsToUpdate, productData, single) => {
  if (single) {
    productData[itemsToUpdate.id] = { ...productData[itemsToUpdate.id], isSaved: true };
  } else {
    itemsToUpdate.forEach((itemToUpdate) => {
      productData[itemToUpdate.id] = { ...productData[itemToUpdate.id], isSaved: true };
    });
  }

  return productData;
};
export const removeItemFromCollection = (itemToUpdate, productData) => {
  productData[itemToUpdate.id].sizesSelected = itemToUpdate.sizesSelected.map(({ value }) => ({
    value,
    quantityAddedOfSize: 0,
  }));
  productData[itemToUpdate.id].totalQuantity = 0;
  return productData;
};
export const partition = (cartItems) => {
  if (cartItems && Object.keys(cartItems).length !== 0) {
    let summerItems = [];
    let winterItems = [];
    Object.entries(cartItems).forEach(([key, item]) => {
      item.fromCollection === 'summerData' ? summerItems.push(item) : winterItems.push(item);
    });
    return [summerItems, winterItems];
  } else {
    return [null, null];
  }
};
