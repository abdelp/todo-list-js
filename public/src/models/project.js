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