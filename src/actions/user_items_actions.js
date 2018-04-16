import firebase from 'firebase';
import {
  ITEM_UPDATE,
  ITEM_CREATE,
  FETCH_USER_ITEMS,
  FETCH_ALL_ITEMS,
  FETCH_OFFERS,
  GET_USER_ITEMS,
  GET_OFFER_ITEMS,
  SELLING_ITEMS,
} from './types';

export const itemUpdate = ({ prop, value }) => ({
  type: ITEM_UPDATE,
  payload: { prop, value }
});

export const itemCreate = ({ name, description, price, images }) => dispatch => {
  // Push item details
  const owner = firebase.auth().currentUser.uid;
  const itemRef = firebase.database().ref('/items')
    .push({ name, description, price, owner });
  const key = itemRef.key;

  // Upload images
  const imagesObj = {};
  let item = {};
  let counter = 0;
  const imgs = images.filter(String); // filter out empty Strings
  imgs.forEach(async (uri, index) => {
    const filename = `${key}_${index}.jpg`; // eg: abc123itemkey_3.jpg
    const body = new FormData();
    body.append('picture', {
      uri,
      name: filename,
      type: 'image/jpg'
    });
    await fetch('https://us-central1-bubble-wrap-8485d.cloudfunctions.net/api/picture', {
      method: 'POST',
      body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    });

    // Push image urls to item
    const storageRef = firebase.storage().ref(filename);
    storageRef.getDownloadURL().then(url => {
      firebase.database().ref(`/items/${key}/images`)
        .push({ url, index })
        .then(() => {
          imagesObj[index] = { url, index };
          counter++;
          if (counter === imgs.length) {
            // dispatch the item
            const imageArray = Object.values(imagesObj).sort((a, b) => (a.index > b.index ? 1 : -1));
            item = { name, description, price, owner, key, images: imageArray };
            dispatch({
              type: ITEM_CREATE,
              payload: { item }
            });
          }
        });
    });
  });
};

export const fetchItems = () => dispatch => {
  const { uid } = firebase.auth().currentUser;
  firebase.database().ref('/items')
    .on('value', snapshot => {
      const items = [];
      snapshot.forEach(item => {
        const { owner, images } = item.val();
        if (owner === uid) {
          const imageArray = Object.values(images).sort((a, b) => (a.index > b.index ? 1 : -1));
          items.push({ ...item.val(), images: imageArray, key: item.key });
        }
      });
      dispatch({
        type: FETCH_USER_ITEMS,
        payload: { items }
      });
    });
};

export const fetchAllItems = () => dispatch => {
  // const { uid } = firebase.auth().currentUser;
  firebase.database().ref('/items')
    .on('value', snapshot => {
      const all_items = [];
      snapshot.forEach(item => {
        const { images } = item.val();
        const imageArray = Object.values(images).sort((a, b) => (a.index > b.index ? 1 : -1));
        all_items.push({ ...item.val(), images: imageArray, key: item.key });
      });
      dispatch({
        type: FETCH_ALL_ITEMS,
        payload: { all_items }
      });
    });
};

export const itemsSelling = () => dispatch => {
  
  //const { uid } = firebase.auth().currentUser;
  var uid = "Eh7iGemio6eJZzSiLJKRkQiRcpT2";
  firebase.database().ref('/items')
    .on('value', snapshot => {
      const selling_items = [];
      snapshot.forEach(item => {
        const { images, owner } = item.val();
        const imageArray = Object.values(images).sort((a, b) => (a.index > b.index ? 1 : -1));
        console.log(owner) // DO NOT DELETE THIS OR IT WON'T WORK :P SPAGHETTI AT ITS FINEST
        if(owner === uid)
          selling_items.push({ ...item.val(), images: imageArray, key: item.key });
      });
      dispatch({
        type: SELLING_ITEMS,
        payload: { selling_items }
      });
    });
};

export const fetchOffers = (prevItems) => dispatch => {
  const itemKeys = prevItems.map((item => item.key));
  firebase.database().ref('/offers')
    .on('value', snapshot => {
      const items = prevItems.slice(); // copy
      snapshot.forEach(o => {
        const offer = o.val();
        const itemKey = offer.item; // item is the itemKey
        if (itemKeys.includes(itemKey)) {
          const item = items.find(i => i.key === itemKey);
          if (!('offers' in item)) {
            item.offers = []; // create offers array if it doesn't exist
          }
          item.offers.push({ ...offer, key: o.key });
        }
      });
      dispatch({
        type: FETCH_OFFERS,
        payload: { items }
      });
    });
};

export const getUserItems = (items) => {
  const { uid } = firebase.auth().currentUser;
  const userItems = [];
  items.forEach(item => {
    if (item.owner === uid) {
      userItems.push(item);
    }
  });
  return {
    type: GET_USER_ITEMS,
    payload: { userItems }
  };
};

export const getOfferItems = (items) => {
  const { uid } = firebase.auth().currentUser;
  const offerItems = items.filter(({ offers }) => offers && offers.some(({ user }) => user === uid))
    .map(item => {
      return { ...item, offers: item.offers.filter(({ user }) => user === uid) };
    });
  return {
    type: GET_OFFER_ITEMS,
    payload: { offerItems }
  };
};
