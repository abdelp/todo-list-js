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

const Todo = (data) => {

};

const getDefaultProject = () => {
  Database.getDoc('projects')
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log(error);
  })
};

export {create, getDefaultProject};