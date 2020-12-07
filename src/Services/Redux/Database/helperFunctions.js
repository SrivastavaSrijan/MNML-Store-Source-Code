// import Unsplash from 'unsplash-js';

// export const unsplash = new Unsplash({
//   accessKey: 'YVL2f8WFV8VyM_htL_6t9IadGgTufVB6WgATOiA72jE',
//   secret: 'Xuu050bRNlvoWprHBovv1zjWJOsY5txLMmXOD9T2y1U',
// });
export const discountCalc = (priceArray) => {
  return Math.floor((parseFloat(priceArray[1] - priceArray[0]) / priceArray[1]) * 100);
};
export const sizeArray = () => {
  const sizeArr = ['S', 'M', 'L', 'XL', 'XXL'];
  return sizeArr;
};
export const formatter = (number) => {
  const ZeroOrNine = Math.random();
  if (ZeroOrNine > 0.5) {
    return `${number}99`;
  } else {
    return `${number}00`;
  }
};
export const camelCase = (str) => {
  const strAns = str.length > 25 ? str.substring(0, 25) + '...' : str;
  return strAns
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
      return word.toUpperCase();
    })
    .replace(/\s+/g, ' ');
};

const randomWithRange = (max, min) => Math.floor(Math.random() * (max - min) + min);
export const priceGenerator = (max, min, discountMax, discountMin) => {
  const originalPrice = randomWithRange(max, min);
  const discountPrice = Math.floor(
    originalPrice * (1 + 0.01 * randomWithRange(discountMax, discountMin)),
  );
  const returnArray = [originalPrice, discountPrice];
  return returnArray;
};
// const partitionArray = (array, isValid) => {
//   return array.reduce(
//     ([pass, fail], elem) => {
//       return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
//     },
//     [[], []],
//   );
// };
export const updateSizeItem = (sizesSelected, sizeSelected, toInc, isAddRemove) => {
  const sizeObject = sizesSelected.find((sizeItem) => sizeItem.value === sizeSelected);
  const sizeIndex = sizesSelected.findIndex((sizeItem) => sizeItem.value === sizeSelected);
  const { value, quantityAddedOfSize } = sizeObject;
  // const otherSizes = sizesSelected.filter((sizeItem) => sizeItem.value !== value);
  if (isAddRemove) {
    const num = toInc ? 1 : 0;
    let newQuantity = num;
    sizesSelected[sizeIndex] = { value, quantityAddedOfSize: newQuantity };
  } else {
    const num = toInc ? 1 : -1;
    sizesSelected[sizeIndex] = { value, quantityAddedOfSize: quantityAddedOfSize + num };
  }
  return sizesSelected;
};
