import * as Database from '../modules/database';

const params = ({title, description, userId, createdAt}) => {
  return {title, description, userId, createdAt};
};

const create = async (data) => {
  const collection = 'projects';
  let result;
  data.createdAt = Database.currentTimestamp();

  try {
    result = await Database.add(collection, params(data));
  } catch(error) {
    result = await error;
  };

  return result;
};

const allProjects = async (userId) => {
  const collection = 'projects';
  const projects = await Database.getDoc(collection, {params: [{key: "userId", sign: "==", value: userId}], orderBy: {field: "created_at", order: "desc"}});
  return projects;
}

export {create, allProjects};