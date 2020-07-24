import * as Database from '../modules/database';

const params = ({title, description}) => {
  return {title, description};
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

export {create, getDefaultProject};