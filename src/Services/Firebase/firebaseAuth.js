import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { setCurrentUser } from 'Services/Redux/User/userActions';
import { updateItemInCart, removeItemFrom, updateSavedItem } from 'Services/Redux/Cart/cartUtils';
import 'firebase/performance';

const firebaseConfig = {
  apiKey: 'AIzaSyCdrJZWe6dtczthu6XZ9QYevWy0sV6krlQ',
  authDomain: 'mnml.srijansrivastava.tech',
  databaseURL: 'https://luckycolormnml.firebaseio.com',
  projectId: 'luckycolormnml',
  storageBucket: 'luckycolormnml.appspot.com',
  messagingSenderId: '425427623968',
  appId: '1:425427623968:web:8c0207c022ca8a62545c45',
  measurementId: 'G-GS1VXF4DCQ',
};

firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line
const perf = firebase.performance();

export const createUserProfileDocument = async (userAuth, displayName) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  displayName = displayName === undefined ? 'Anonymous' : displayName;
  if (!snapShot.exists) {
    const { email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        email,
        createdAt,
        displayName,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};
export const unsubscribeFromAuth = async (dispatch, hideLoader) => {
  auth().onAuthStateChanged(async (userAuth) => {
    if (userAuth) {
      const userRef = await createUserProfileDocument(userAuth);
      userRef.onSnapshot((snapShot) => {
        dispatch(
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          }),
        );
      });
    } else {
      dispatch(setCurrentUser(userAuth));
    }
    hideLoader();
  });
};

export const auth = firebase.auth;
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth().signInWithPopup(provider);

export default firebase;
export const updateUserInformation = async (userAuth, dataPayload) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  if (snapShot.exists) {
    try {
      const response = await userRef.set({ ...dataPayload }, { merge: true });
      return [response, true];
    } catch (error) {
      return [error, false];
    }
  }

  return userRef;
};
export const getUserInformation = async (userAuth) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  if (snapShot.exists) {
    try {
      const response = snapShot.data();
      return [response, true];
    } catch (error) {
      return [error, false];
    }
  }

  return userRef;
};
export const fetchCollectionFirebase = async (fromCollection) => {
  const collectionRef = await firestore.collection(fromCollection).get();
  const collectionArray = collectionRef.docs.map((doc) => doc.data());
  const collectionObject = convertSnapshotArrayToMap(collectionArray);
  return collectionObject;
};
export const fetchDataFirebase = async (path) => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    const cartRef = firestore.collection(`/users/${currentUser.uid}/${path}`);
    const cartSnapshot = await cartRef.get();
    let cartObject = {};
    if (cartSnapshot.docs) {
      const cartArray = cartSnapshot.docs.map((item) => item.data());
      cartObject = convertSnapshotArrayToMap(cartArray);
    }
    return [cartObject, cartRef];
  } else {
    return [null, null];
  }
};
export const addDocumentToCart = async (cartItem, cartObject, cartRef) => {
  const cartObjectUpdated = updateItemInCart(cartItem, cartObject);
  const cartItemUpdated = cartObjectUpdated[cartItem.id];
  if (cartItemUpdated !== undefined) {
    try {
      const newCartDocRef = cartRef.doc(cartItem.id);
      const tempObj = Object.assign({}, cartItemUpdated);
      await newCartDocRef.set(tempObj, { merge: true });
    } catch (error) {
      console.log('Error - ', error);
    }
  } else {
    deleteDocument(cartItem, cartObject, cartRef);
  }

  return cartObjectUpdated;
};
export const convertSnapshotArrayToMap = (someArray) => {
  const someObject = {};
  someArray.reduce((accumulator, item) => (someObject[item.id] = item), {});
  return someObject;
};
export const deleteDocument = async (cartItem, cartObject, cartRef) => {
  const cartItemsUpdated = removeItemFrom(cartItem, cartObject);
  try {
    await cartRef.doc(cartItem.id).delete();
    return cartItemsUpdated;
  } catch (error) {
    return null;
  }
};
export const modifySavedDocument = async (savedItem, savedObject, savedRef, flag) => {
  const savedItemsObject = updateSavedItem(savedItem, savedObject, flag);
  const savedItemUpdated = savedItemsObject[savedItem.id];
  if (savedItemUpdated !== undefined) {
    try {
      const newSavedItemRef = savedRef.doc(savedItem.id);
      const tempObj = Object.assign({}, savedItemUpdated);
      await newSavedItemRef.set(tempObj, { merge: true });
      return savedItemsObject;
    } catch (error) {
      console.log('Error - ', error);
    }
  } else {
    try {
      await savedRef.doc(savedItem.id).delete();
      return savedItemsObject;
    } catch (error) {
      return null;
    }
  }
};

// this.addCollections = async () => {
//   const collectionRefWinter = firestore.collection('/winterData');
//   const collectionRefSummer = firestore.collection('/winterData');
//   const batch = firestore.batch();
//   Object.entries(winterData).forEach((item) => {
//     const newDocRef = collectionRefSummer.doc(item[0]);
//     batch.set(newDocRef, item[1]);
//   });
//   return await batch.commit()
