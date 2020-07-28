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
  const userId = Database.getUserId();
  data.userId = userId;
  Project.create(data);
  Doman.cleanForm(formId);
  Doman.hideModal('project-modal');
};

let addProjectBtn = document.getElementById('add-project');
addProjectBtn.onclick = addProject;

const addTodo = () => {
  const data = Doman.getFormValues('todo-form');
  const userId = Database.getUserId();
  const currentProject = Database.getDefaultProject();
  Todo.create({...data, userId});
  Doman.cleanForm('todo-form');
  Doman.hideModal('todo-modal');
};

let addTodoBtn = document.getElementById('add-todo');
addTodoBtn.onclick = addTodo;

const userId = Database.getUserId();

if(!userId){
  Database.createUser()
  .then(user => {
    const data = {title:"Default",description:"This is the default project for your application",userId:user.id}
    Project.create(data)
    .then(project => {
      Database.setCurrentProject(project.id);
    })
    .catch(error => {
      console.log(error);
    });
  });
}



Project.allProjects(userId)
.then(result => {
  const onclickHandler = async function() 
  {
    const todos = await Todo.allTodos(this.id);
    const todoList = Doman.createList(todos,'list-group-item',Doman.displayTodo);
    Doman.cleanElement('todo-list');
    Doman.addChild('todo-list',todoList);
  };

  const list = Doman.createList(result,'btn btn-info m-2',onclickHandler);
  Doman.addChild('projects-list', list);
});