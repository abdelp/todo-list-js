import * as Database from '../modules/database';

const params = ({title, description,userId}) => {
  return {title, description,userId};
};

const create = (data) => {
  const collection = 'projects';
  Database.add(collection, params(data))
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log(error);
  });
};

const getDefaultProject = async () => {
  let result;

  try {
    result = await Database.getDoc('projects');
  } catch(error) {
    result = await error;
  }

  return result[0];
};

const allProjects = async () => {
  const collection = 'projects';
  const projects = Database.getDoc(collection);
}

export {create, getDefaultProject};