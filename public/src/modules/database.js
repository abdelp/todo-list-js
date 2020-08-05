const firestore = firebase.firestore(); // eslint-disable-line no-undef

const add = async (collection, data) => {
  const collRef = firestore.collection(collection);
  let result;

  try {
    result = await collRef.add(data);
  } catch (error) {
    result = await error;
  }

  return result;
};

const edit = async (collection, doc, data) => {
  const docRef = firestore.collection(collection).doc(doc);
  let result;

  try {
    result = await docRef.update(data);
  } catch (error) {
    result = await error;
  }

  return result;
};

const deleteDoc = async (collection, doc) => {
  const docRef = firestore.collection(collection).doc(doc);
  let result;

  try {
    result = await docRef.delete();
  } catch (error) {
    result = await error;
  }

  return result;
};

const setCurrentProject = (projectId) => {
  localStorage.setItem('currentProject', projectId);
};

const getCurrentProject = () => localStorage.getItem('currentProject');

const getDoc = async (collection, queryProps = {}) => {
  const {
    params,
    orderBy,
    doc,
  } = queryProps;
  let collectionRef = firestore.collection(collection);

  if (params) {
    params.forEach(param => {
      collectionRef = collectionRef.where(param.key, param.sign, param.value);
    });
  }
  if (orderBy) {
    collectionRef = collectionRef.orderBy(orderBy.field, orderBy.order);
  }
  if (doc) {
    collectionRef = collectionRef.doc(doc);
  }

  let result;

  try {
    const rDoc = await collectionRef.get();
    result = {
      id: rDoc.id,
      ...rDoc.data(),
    };
  } catch (error) {
    result = await error;
  }

  return result;
};

const getCollection = async (collection, queryProps = {}) => {
  const {
    params,
    orderBy,
  } = queryProps;
  let collectionRef = firestore.collection(collection);

  if (params) {
    params.forEach(param => {
      collectionRef = collectionRef.where(param.key, param.sign, param.value);
    });
  }
  if (orderBy) {
    collectionRef = collectionRef.orderBy(orderBy.field, orderBy.order);
  }

  let result = [];

  try {
    const docs = await collectionRef.get();

    docs.forEach(doc => {
      result.push({
        id: doc.id,
        ...doc.data(),
      });
    });
  } catch (error) {
    result = await error;
  }

  return result;
};

const getDefaultProject = async (userId) => {
  let result;

  try {
    const params = [{
      key: 'title',
      sign: '==',
      value: 'default',
    },
    {
      key: 'userId',
      sign: '==',
      value: userId,
    },
    ];
    result = await getDoc('projects', params);
  } catch (error) {
    result = await error;
  }

  return result[0];
};

const getUserId = () => localStorage.getItem('userId');

const currentTimestamp = () => {
  firebase.firestore.FieldValue.serverTimestamp(); // eslint-disable-line no-undef
};

export {
  add,
  edit,
  getDoc,
  deleteDoc,
  getCollection,
  getUserId,
  setCurrentProject,
  getDefaultProject,
  currentTimestamp,
  getCurrentProject,
};