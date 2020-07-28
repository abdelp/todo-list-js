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

const getDoc = async (collection, params = []) => {
  let collectionRef = firestore.collection(collection);

  if(params) {
    console.log(params);
    if(params.params) {
      params.params.forEach(param => {
        collectionRef = collectionRef.where(param.key, param.sign, param.value);
      });
    }
    if (params.orderBy) {
      collectionRef = collectionRef.orderBy(params.orderBy.field, params.orderBy.order);
    }
  }

  let result = [];

  try {
    const docs = await collectionRef.get();

    docs.forEach(doc => {
      result.push({id: doc.id, ...doc.data()});
    });
  } catch(error) {
    console.log(error);
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

  return result;
};

const getDefaultProject = async (userId) => {
  let result;

  try {
    const params = [{key: "title", sign: "==", value: "default"},
                    {key: "userId", sign: "==", value: userId}];
    result = await getDoc('projects', params);
  } catch(error) {
    result = await error;
  }

  return result[0];
};

const getUserId = () => {
  return localStorage.getItem("userId");
};

const currentTimestamp = () => {
  console.log(firebase.firestore.FieldValue.serverTimestamp());
  return firebase.firestore.FieldValue.serverTimestamp();
};

export {add, getDoc, createUser, getUserId, setCurrentProject, getDefaultProject, currentTimestamp};