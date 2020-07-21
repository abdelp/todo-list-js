let firestore = firebase.firestore();

const add = async (collection, data) => {
  let collRef = firestore.collection(collection);
  let result;

  try {
    result = await collRef.add(data);
  }catch(error) {
    result = await error;
  };

  return result;
};

export {add};