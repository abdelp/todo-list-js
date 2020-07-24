import * as Doman from './modules/doman';
import * as Database from './modules/database';
import * as Todo from './models/todo';
import * as Project from './models/project';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/modal';

const addProject = () => {
  const formId = 'project-form';
  const data = Doman.getFormValues(formId);
  Project.create(data);
  Doman.cleanForm(formId);
  Doman.hideModal('project-modal');
};

let addProjectBtn = document.getElementById('add-project');
addProjectBtn.onclick = addProject;

const addTodo = () => {
  const data = Doman.getFormValues('todo-form');
  const userId = Database.getUserId();
  Todo.create({...data, userId});
  Doman.cleanForm('todo-form');
  Doman.hideModal('todo-modal');
};

let addTodoBtn = document.getElementById('add-todo');
addTodoBtn.onclick = addTodo;

if (!localStorage.getItem("currentProject")) {
  Project.getDefaultProject()
  .then(result => {
    const defaultProject = result;
    Database.setCurrentProject(defaultProject);
  })
  .catch(error => {
    console.log(error);
  });
}

if(!localStorage.getItem("userId")) Database.createUser();