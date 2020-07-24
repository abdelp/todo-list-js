import * as Doman from './modules/doman';
import * as Database from './modules/database';
import * as Todo from './models/todo';
import 'bootstrap/dist/css/bootstrap.min.css';

const addTodo = () => {
  const data = Doman.getFormValues('todo-form');
  Todo.create(data);
  Doman.cleanForm('todo-form');
};

let addTodoBtn = document.getElementById('add-todo');
addTodoBtn.onclick = addTodo;