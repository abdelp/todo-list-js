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
    li.className = 'list-group-item';
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
  let collapse = document.createElement('div');
};

export {getFormValues, cleanForm, hideModal, createList, addChild, displayTodo, cleanElement, setTitle, createButton};

