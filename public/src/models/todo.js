import * as Database from '../modules/database';

const params = ({title, desc, dueDate, priority}) => {
  return {title, desc, dueDate, priority};
};

const create = (collection, data) => {
  document.body.innerHTML = JSON.stringify(params(data));
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