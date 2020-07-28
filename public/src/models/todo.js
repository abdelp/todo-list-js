import * as Database from '../modules/database';

const params = ({title, description, dueDate, priority}) => {
  return {title, description, dueDate, priority};
};

const create = (projectId,data) => {
  const collection = `projects/${projectId}/todos`;
  Database.add(collection, params(data))
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log(error);
  });
};

const allTodos = async (projectId) => {
  const collection = `projects/${projectId}/todos`;
  const todos = await Database.getDoc(collection);
  return todos;
}

export {create,allTodos};