import * as Doman from './modules/doman';
import * as Database from './modules/database';
import * as Todo from './models/todo';
import * as Project from './models/project';
import * as User from './models/user';
import PubSub from 'pubsub-js';

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
  PubSub.publish('LOAD TODOS',currentProject);
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
          loadProjects();
        })
        .catch(error => {
          console.log(error);
        });
    });
} else {
  Database.getDoc('projects', { doc: Database.getCurrentProject() })
    .then(doc => {
      Doman.setTitle(doc[0].title);
      loadTodos('',doc[0].id)
    })
    .catch(error => {
      console.log(error);
    });
}

const loadProjects = () => {
  const userId = Database.getUserId();
  Doman.cleanElement('projects-list');
  Project.allProjects(userId)
    .then(result => {
      const onclickHandler = async function () {
        Database.setCurrentProject(this.id);
        Doman.setTitle(this.innerHTML);
        loadTodos('', this.id);
      };

      const projectsButtons = result.map(item => Doman.createButton({id: item.id, innerText: item.title, onclick: onclickHandler }));
      const list = Doman.createList(projectsButtons);
      Doman.addChild('projects-list', list);
    });
}

const loadTodos = async (msg,projectId) => {
  const todos = await Todo.allTodos(projectId);
  let todoCollapses = [];

  todos.forEach(todo => {
    const todoCollapse = Doman.createCollapse({id: todo.id,bodyId:`${todo.id}-body`,innerText: todo.title });
    todoCollapses.push(todoCollapse);
  });

  const todoList = Doman.createList(todosCollapses, 'list-group-item');
  Doman.cleanElement('todo-list');
  Doman.addChild('todo-list', todoList);
}

const projectToken = PubSub.subscribe('LOAD PROJECTS', loadProjects);
const todoToken = PubSub.subscribe('LOAD TODOS', loadTodos);

loadProjects();