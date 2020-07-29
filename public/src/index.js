import * as Doman from './modules/doman';
import * as Database from './modules/database';
import * as Todo from './models/todo';
import * as Project from './models/project';
import * as User from './models/user';
import PubSub from 'pubsub-js';

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
  PubSub.publish('LOAD PROJECTS');
};

let addProjectBtn = document.getElementById('add-project');
addProjectBtn.onclick = addProject;

const addTodo = () => {
  const data = Doman.getFormValues('todo-form');
  const currentProject = Database.getCurrentProject();
  Todo.create(currentProject, data);
  Doman.cleanForm('todo-form');
  Doman.hideModal('todo-modal');
};

let addTodoBtn = document.getElementById('add-todo');
addTodoBtn.onclick = addTodo;

const userId = Database.getUserId();

if (!userId) {
  User.create({ userName: 'test' })
    .then(user => {
      const data = { title: "Default", description: "This is the default project for your application", userId: user.id };
      Project.create(data)
        .then(project => {
          Database.setCurrentProject(project.id);
          Doman.setTitle(data.title);
        })
        .catch(error => {
          console.log(error);
        });
    });
} else {
  Database.getDoc('projects', { doc: Database.getCurrentProject() })
    .then(doc => {
      Doman.setTitle(doc[0].title);
    })
    .catch(error => {
      console.log(error);
    });
}


const loadProjects = () => {
  Doman.cleanElement('projects-list');
  Project.allProjects(userId)
    .then(result => {
      console.log(result);
      const onclickHandler = async function () {
        Database.setCurrentProject(this.id);
        Doman.setTitle(this.innerHTML);
        const todos = await Todo.allTodos(this.id);
        const todoList = Doman.createList(todos, 'list-group-item', Doman.displayTodo);
        Doman.cleanElement('todo-list');
        Doman.addChild('todo-list', todoList);
      };

      const list = Doman.createList(result, 'btn btn-info m-2', onclickHandler);
      Doman.addChild('projects-list', list);
    });
}

let token = PubSub.subscribe('LOAD PROJECTS', loadProjects);

loadProjects();