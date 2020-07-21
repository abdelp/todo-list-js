
const TodoCrud = (todo) => {
  const updateTitle = (value) => {
    todo.title = value;
  }

  const updateDesc = (value) => {
    todo.description = value;
  }

  const updateDueDate = (value) => {
    todo.dueDate = value;
  }

  const updatePriority = (value) => {
    todo.priority
  }
  return {...todo
         };
}

const Todo = (id,title,desc,dueDate,priority) => {
	return {id,title,desc,dueDate,priority}
}

const Project = () => {
  let toDoList = [];
  
  const addTodo = (todo) => {
  	list.push(todo);
  }

  const readList = () => {
    return toDoList;
  }
	
  return {title,addTodo}
} 

