import * as Doman from './modules/doman';
import * as Database from './modules/database';
import * as Todo from './models/todo';
import * as Project from './models/project';
import * as User from './models/user';
import PubSub from 'pubsub-js';
import './css/styles.css';

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

$('#todo-modal').on('hidden.bs.modal', e => {
  Doman.cleanForm('todo-form');
});

const addTodo = () => {
  const data = Doman.getFormValues('todo-form');
  const currentProject = Database.getCurrentProject();
  if (!data['id']){
    Todo.create(currentProject, data)
    .then(result => {
      Doman.cleanForm('todo-form');
      Doman.hideModal('todo-modal');
      PubSub.publish('LOAD TODOS', currentProject);
    });
  }else {
    Todo.update(currentProject, data)
    .then(result => {
      Doman.cleanForm('todo-form');
      Doman.hideModal('todo-modal');
      PubSub.publish('LOAD TODOS',currentProject);
    });
  }
  
}

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
      Doman.setTitle(doc.title);
      loadTodos('', doc.id);
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

      const projectsButtons = result.map(item => Doman.createButton({ id: item.id, innerText: item.title, color: 'info', onclick: onclickHandler }));
      const list = Doman.createList(projectsButtons);
      Doman.addChild('projects-list', list);
    });
};

const loadTodos = async (msg, projectId) => {
  const todos = await Todo.allTodos(projectId);
  let todoCollapses = [];

  todos.forEach(todo => {
    const deleteHandler = () => {
      Todo.deleteTodo(projectId, todo.id);
      PubSub.publish('LOAD TODOS', projectId);
      Doman.hideModal('confirm-modal');
    };
  
    const data = { id: todo.id,
                   innerText: todo.title,
                   description: todo.description,
                   dueDate: todo.dueDate,
                   priority: todo.priority,
                   deleteButton: {
                     onclick: () => Doman.showConfirmModal(deleteHandler)
                   }};

    const todoCollapse = Doman.createCollapse(data);
    todoCollapses.push(todoCollapse);
  });

  const todoList = Doman.createList(todoCollapses);
  Doman.cleanElement('todo-list');
  Doman.addChild('todo-list', todoList);
};

const projectToken = PubSub.subscribe('LOAD PROJECTS', loadProjects);
const todoToken = PubSub.subscribe('LOAD TODOS', loadTodos);

loadProjects();