import * as Database from '../modules/database';

const params = ({title, description, dueDate, priority}) => {
  return {title, description, dueDate, priority};
};

const create = async (projectId,data) => {
  const collection = `projects/${projectId}/todos`;
  let result;
  try {
    result = await Database.add(collection, params(data));
  }catch(error){
    result = await error;
  }

  return result;
};

const update = async (projectId,data) => {
  const collection = `projects/${projectId}/todos`;
  const {id:doc} = data;
  let result;
  try {
   result = await Database.edit(collection,doc,params(data));
  }catch(error){
    result = await error;
  }

  return result;
}

const allTodos = async (projectId) => {
  const collection = `projects/${projectId}/todos`;
  const todos = await Database.getCollection(collection);
  return todos;
}

export {create,update,allTodos};