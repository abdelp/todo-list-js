const getFormValues = formId => {
  const elements = document.getElementById(formId).elements;
  let obj = {};
  for(let i = 0; i < elements.length; i++) {
    const item = elements.item(i);
    obj[item.name] = item.value;
  }

  return obj;
};

const cleanForm = formId => {
  let form = document.getElementById(formId);
  form.reset();
};

const hideModal = modalId => {
  $(`#${modalId}`).modal('hide');
};

const createList = (list) => {
  let ul = document.createElement('ul');
  ul.className = 'list-group mt-3';
  list.forEach(item => {
    let li = document.createElement('li');
    li.className = 'list-group-item border-0';
    li.id = item.id;
    li.appendChild(item);
    ul.appendChild(li);
  });

  return ul;
};

const setTitle = (title) => {
  const elem = document.getElementById('project-name');
  elem.innerHTML = title ;
};

const displayTodo = () => {
  const todos = document.getElementById('todo-list');
  todos.innerHTML = '';
};

const cleanElement = (containerId) => {
  let container = document.getElementById(containerId);
  container.innerHTML = '';
};

const addChild = (containerId, element) => {
  let container = document.getElementById(containerId);
  container.appendChild(element);
};

const createButton = (params) => {
  let btn = document.createElement('button');
  btn.id = params.id;
  btn.className = 'btn btn-info w-100';
  btn.innerText = params.innerText;
  btn.onclick = params.onclick;
  btn.type = 'button';
  return btn;
};

const createCollapse = (element) => {
  let container = document.createElement('div');
  let collapseBtn = document.createElement('button');
  collapseBtn.className = 'btn btn-secondary w-100 mt-2';
  collapseBtn.type = 'button';
  collapseBtn.setAttribute('data-toggle','collapse');
  const collapseId = `t-${element.id}`;
  collapseBtn.setAttribute('data-target', `#${collapseId}`);
  collapseBtn.setAttribute('aria-expanded', 'false');
  collapseBtn.setAttribute('aria-controls', collapseId)
  collapseBtn.innerText = element.innerText;

  let collapse = document.createElement('div');
  collapse.id = collapseId;
  collapse.className = 'collapse';
  let collapseBody = document.createElement('div');
  collapseBody.className = "card card-body";

  const innerElement = document.createElement('div');

  // temporal
  const todoTop = document.createElement('div')
  todoTop.className = 'd-flex flex-row justify-content-between';

  const todoDate = document.createElement('h6');
  todoDate.innerHTML = `Date: ${element.dueDate}`

  console.log(element.priority)
  const todoPriority = createBadge(element.priority);
  console.log(todoPriority);
  
  todoTop.appendChild(todoDate);
  todoTop.appendChild(todoPriority);

  const todoBottom = document.createElement('div')
  const todoDescription = document.createElement('p');
  todoDescription.innerHTML = `Details<br>${element.description}`;

  todoBottom.appendChild(todoDescription);

  collapseBody.appendChild(todoTop);
  collapseBody.appendChild(todoBottom);

  collapse.appendChild(collapseBody);

  container.appendChild(collapseBtn);
  container.appendChild(collapse);
  
  return container;
};

const createBadge = (priority) => {
  let badge = document.createElement('span');
  if(priority === "1"){
    badge.className = 'badge badge-danger h-75';
    badge.innerText = 'High';
  }else if (priority === "2"){
    badge.className = 'badge badge-success h-75';
    badge.innerHTML = 'Medium';
  }else if(priority === "3") {
    badge.className = 'badge badge-warning h-75';
    badge.innerHTML = 'Low';
  }

  return badge;
}


export {getFormValues, cleanForm, hideModal, createList, addChild, displayTodo, cleanElement, setTitle, createButton,createCollapse};
