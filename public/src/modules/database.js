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

const setCurrentProject = (projectId) => {
  localStorage.setItem('currentProject', projectId);
};

const getDoc = async (collection) => {
  const collectionRef = firestore.collection(collection);
  let result = [];

  try {
    const docs = await collectionRef.where("title", "==", "default").get();

    docs.forEach(doc => {
      result.push(doc.id);
    });
  } catch(error) {
    result = await error;
  };

  return result;
};

const createUser = async () => {
  let result;

  try {
    result = await add("users", {userName: "test"});
    localStorage.setItem("userId", result.id);
  } catch(error) {
    result = await error;
  };
};

const getUserId = () => {
  return localStorage.getItem("userId");
};

export {add, getDoc, createUser, getUserId, setCurrentProject};