
const Project = (title) => {
  let toDoList = [];
  
  const addTodo = (todo) => {
  	toDoList.push(todo);
  }

  const deleteTodo = (todo) => {
    toDoList.splice(toDoList.indexOf(todo),1)
  }

  const readList = () => {
    return toDoList;
  }
	
  return {title,addTodo,readList,deleteTodo}
} 

const Todo = (id,title,desc,dueDate,priority) => {
	return {id,title,desc,dueDate,priority}
}

let testp = Project('Default');

const t1 = Todo(1,'test1','This is a test',"20-07-21",'high');
const t2 = Todo(2,'test2','This is a test',"20-07-21",'high');
const t3 = Todo(3,'test3','This is a test',"20-07-21",'high');

testp.addTodo(t1);
testp.addTodo(t2);
testp.addTodo(t3);

const show = () => {
  testp.readList().forEach(todo => {
    console.log(todo);
  });
}

show();

testp.deleteTodo(t1);
console.log("_______________________________");

show();



