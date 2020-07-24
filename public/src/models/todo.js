import * as Database from '../modules/database';

const params = ({title, description, dueDate, priority, userId}) => {
  return {title, description, dueDate, priority, userId};
};

const create = (data) => {
  const collection = 'todos';
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