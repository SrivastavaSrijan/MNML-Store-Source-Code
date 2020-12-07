export const getItemsFromLocalStorage = () => {
  const storedSummer = localStorage.getItem('summerData')
    ? JSON.parse(localStorage.getItem('summerData'))
    : null;
  const storedWinter = localStorage.getItem('winterData')
    ? JSON.parse(localStorage.getItem('winterData'))
    : null;
  return [storedSummer, storedWinter];
};

export const partition = (arr, condition) => {
  const trues = arr.filter((el) => condition(el));
  const falses = arr.filter((el) => !condition(el));
  return [trues, falses];
};

export const routes = {
  SUM: '/Collections/Summer-2020',
  WIN: '/Collections/Winter-2019',
  COL: '/Collections',
  CART: '/Cart',
  HOME: '/',
  USER_PAGE: '/UserPage',
  USER: '/User',
  CHECKOUT: '/CheckoutPage',
};
