import * as Doman from './modules/doman';

const Project = (title) => {
  let toDoList = [];
  
  const addTodo = (todo) => {
  	toDoList.push(todo);
  };

  const deleteTodo = (todo) => {
    toDoList.splice(toDoList.indexOf(todo),1);
  };

  const readList = () => {
    return toDoList;
  };

  return {title,addTodo,readList,deleteTodo}
};

subscribe('todo-create', data) => {
  database.add(data);
};

const Todo = (data) => {

  const create(data) => {
    publish('todo-create', data);
  };

	return {...data};
};

const data = {id: 1, title: "Title", desc: "Desc", dueDate: "2020-01-01", priority: 1};

let todo = Todo(data);

console.log(todo);

const addTodo = () => {
  const data = Doman.getFormValues('todo-form');
  let todo = Todo.create(data);
  console.log(todo);
};

let addTodoBtn = document.getElementById('add-todo');
addTodoBtn.onclick = addTodo;