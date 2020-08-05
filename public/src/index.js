/* eslint-env jquery */
import PubSub from 'pubsub-js';
import * as Doman from './modules/doman';
import * as Database from './modules/database';
import * as Todo from './models/todo';
import * as Project from './models/project';
import * as User from './models/user';
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

Doman.assignBtn('add-project', addProject);

$('#todo-modal').on('hidden.bs.modal', () => {
  Doman.cleanForm('todo-form');
});

const getCurrentDate = () => {
  const date = new Date();
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const [{
    value: month,
  }, , {
      value: day,
    }, , {
      value: year,
    }] = dateTimeFormat.formatToParts(date);
  const currentDate = `${year}-${month}-${day}`;
  return currentDate;
};

const loadTodos = async (msg, condition, projectId) => {
  let sign;
  const currentDate = getCurrentDate();
  let container;

  if (condition === 'today') {
    sign = '==';
    container = 'today-todo-list';
  } else if (condition === 'upcoming') {
    sign = '>';
    container = 'upcoming-todo-list';
  } else if (condition === 'completed') {
    sign = '<';
    container = 'completed-todo-list';
  }

  const conditions = {
    params: [{
      key: 'dueDate',
      sign,
      value: currentDate,
    }],
  };

  const todos = await Todo.where(projectId, conditions);
  const todoCollapses = [];

  todos.forEach(todo => {
    const deleteHandler = () => {
      Todo.deleteTodo(projectId, todo.id);
      PubSub.publish('LOAD TODOS', projectId);
      Doman.hideModal('confirm-modal');
    };

    const data = {
      id: todo.id,
      innerText: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
      priority: todo.priority,
      deleteButton: {
        onclick: () => Doman.showConfirmModal(deleteHandler),
      },
    };

    const todoCollapse = Doman.createCollapse(data);
    todoCollapses.push(todoCollapse);
  });

  const todoList = Doman.createList(todoCollapses);

  Doman.cleanElement(container);
  Doman.addChild(container, todoList);
};

const addTodo = () => {
  const data = Doman.getFormValues('todo-form');
  const currentProject = Database.getCurrentProject();
  if (!data.id) {
    Todo.create(currentProject, data)
      .then(() => {
        Doman.cleanForm('todo-form');
        Doman.hideModal('todo-modal');
        PubSub.publish('LOAD TODOS', 'today', currentProject);
      });
  } else {
    Todo.update(currentProject, data)
      .then(() => {
        Doman.cleanForm('todo-form');
        Doman.hideModal('todo-modal');
        PubSub.publish('LOAD TODOS', 'today', currentProject);
      });
  }
};

Doman.assignBtn('add-todo', addTodo);

const loadProjects = () => {
  const userId = Database.getUserId();
  Doman.cleanElement('projects-list');
  Project.allProjects(userId)
    .then(result => {
      const onclickHandler = () => {
        Database.setCurrentProject(this.id);
        Doman.setTitle(this.innerHTML);
        loadTodos('', 'today', this.id);
      };

      const projectsButtons = result.map(item => Doman.createButton({
        id: item.id,
        innerText: item.title,
        color: 'info',
        onclick: onclickHandler,
      }));

      const list = Doman.createList(projectsButtons);
      Doman.addChild('projects-list', list);
    });
};

const userId = Database.getUserId();

if (!userId) {
  User.create({
    userName: 'test',
  })
    .then(user => {
      const data = {
        title: 'Default',
        description: 'This is the default project for your application',
        userId: user.id,
      };
      Project.create(data)
        .then(project => {
          Database.setCurrentProject(project.id);
          Doman.setTitle(data.title);
          loadProjects();
        });
    });
} else {
  Database.getDoc('projects', {
    doc: Database.getCurrentProject(),
  })
    .then(doc => {
      Doman.setTitle(doc.title);
      loadTodos('', 'today', doc.id);
    });
}

PubSub.subscribe('LOAD PROJECTS', loadProjects);
PubSub.subscribe('LOAD TODOS', loadTodos);

loadProjects();

Doman.assignBtn('completed-todos-btn', () => loadTodos('', 'completed', Database.getCurrentProject()));
Doman.assignBtn('upcoming-todos-btn', () => loadTodos('', 'upcoming', Database.getCurrentProject()));
Doman.assignBtn('today-todos-btn', () => loadTodos('', 'today', Database.getCurrentProject()));