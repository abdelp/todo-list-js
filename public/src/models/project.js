import * as Database from '../modules/database';

const params = ({title, description, userId}) => {
  return {title, description, userId};
};

const create = async (data) => {
  const collection = 'projects';
  let result;
  try {
    result = await Database.add(collection, params(data));
  } catch(error) {
    result = await error;
  };

  return result;
};

const allProjects = async (userId) => {
  const collection = 'projects';
  const projects = await Database.getDoc(collection, [{key: "userId", sign: "==", value: userId}]);
  return projects;
}

export {create, allProjects};