import * as Database from '../modules/database';

const params = ({title, description,userId}) => {
  return {title, description,userId};
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


const allProjects = async () => {
  const collection = 'projects';
  const projects = Database.getDoc(collection);
}

export {create};