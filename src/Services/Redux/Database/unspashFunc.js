// import {
//   priceGenerator,
//   camelCase,
//   unsplash,
//   discountCalc,
//   formatter,
//   sizeArray,
// } from './helperFunctions.js';
// import { toJson } from 'unsplash-js';

// export const updateProducts = (cardList, stateUpdate) => {
//   let productArray = {};
//   cardList.forEach((item) => {
//     let tempPriceArray =
//       stateUpdate === 'summerData'
//         ? priceGenerator(20, 8, 50, 10)
//         : priceGenerator(100, 30, 80, 40);
//     let priceArray = [formatter(tempPriceArray[0]), formatter(tempPriceArray[1])];
//     let discountGiven = discountCalc(priceArray);
//     let sizeArrayObject = sizeArray();
//     let prodObj = {
//       id: item.id,
//       userName: camelCase(item.user.name),
//       photoUrl:
//         item.urls.raw +
//         '&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=700&fit=max&ixid=eyJhcHBfaWQiOjEzMTg0M30',

//       prodDesc: item.alt_description ? camelCase(item.alt_description) : '',
//       priceArray: priceArray,
//       sizeArray: sizeArrayObject,
//       discountGiven: discountGiven,
//       userDetails: {
//         location: item.user.location ? camelCase(item.user.location) : 'Unknown Location',
//         selfLink: item.user.links.self,
//       },
//       fromCollection: stateUpdate,
//       colorPlaceholder: item.color.split('#')[1],

//       totalQuantity: 0,
//       sizesSelected: sizeArrayObject.map((size) => ({ value: size, quantityAddedOfSize: 0 })),
//     };

//     productArray[item.id] = prodObj;
//   });
//   return productArray;
// };
// export const grabSummerCollection = () => {
//   const summerData = localStorage.getItem('summerRaw')
//     ? JSON.parse(localStorage.getItem('summerRaw'))
//     : unsplash.photos
//         .getRandomPhoto({
//           count: 30,
//           collections: [10730359],
//         })
//         .then(toJson)
//         .then((summerRaw) => {
//           localStorage.setItem('summerRaw', JSON.stringify(summerRaw));
//           return summerRaw;
//         })

//         .catch((error) => console.log(error));
//   return summerData;
// };
// export const grabWinterCollection = () => {
//   const winterData = localStorage.getItem('winterRaw')
//     ? JSON.parse(localStorage.getItem('winterRaw'))
//     : unsplash.photos
//         .getRandomPhoto({
//           count: 30,
//           collections: [10743438],
//         })
//         .then(toJson)
//         .then((winterRaw) => {
//           localStorage.setItem('winterRaw', JSON.stringify(winterRaw));
//           return winterRaw;
//         })

//         .catch((error) => console.log(error));
//   return winterData;
// };
