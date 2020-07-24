import * as Database from '../modules/database';

const params = ({title, description, dueDate, priority}) => {
  return {title, description, dueDate, priority};
};

const create = (data) => {
  const collection = 'todo';
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

export {create};