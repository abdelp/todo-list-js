const Todo = (todo) => {
  const check = () => {
    this.checked = true;
  }

  return {...todo,
          check
         };
}

const todo = Todo({title: "Go shopping",
              description: "Go to the supermarket",
              dueDate: "2020-07-20",
              priority: 1,
              checked: false});


console.log(todo.checked);
console.log(todo.check());
console.log(todo.checked);