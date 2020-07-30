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

const createCollapse = (element,innerElement) => {
  let container = document.createElement('div');
  let collapseBtn = document.createElement('button');
  collapseBtn.className = 'btn btn-secondary w-100 mt-2';
  collapseBtn.type = 'button';
  collapseBtn.setAttribute('data-toggle','collapse');
  collapseBtn.setAttribute('data-target',element.id);
  collapseBtn.setAttribute('aria-expanded','false');
  collapseBtn.setAttribute('aria-controls',element.id)
  collapseBtn.innerText = element.innerText;

  let collapse = document.createElement('div');
  collapse.className = 'collapse';
  let collapseBody = document.createElement('div');
  collapseBody.id  = element.bodyId;
  collapseBody.className = "card card-body";
  collapseBody.appendChild(innerElement);
  collapse.appendChild(collapseBody);

  container.appendChild(collapseBtn);
  container.appendChild(collapse);
  
  return container;
};

export {getFormValues, cleanForm, hideModal, createList, addChild, displayTodo, cleanElement, setTitle, createButton,createCollapse};
