import * as Doman from './modules/doman';
import * as Database from './modules/database';
import * as Todo from './models/todo';

const addTodo = () => {
  const data = Doman.getFormValues('todo-form');
  Todo.create('todo', data);
};

let addTodoBtn = document.getElementById('add-todo');
addTodoBtn.onclick = addTodo;