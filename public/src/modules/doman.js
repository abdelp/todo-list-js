/* eslint-env jquery */
const getFormValues = formId => {
  const {
    elements,
  } = document.getElementById(formId);
  const obj = {};
  for (let i = 0; i < elements.length; i += 1) {
    const item = elements.item(i);
    obj[item.name] = item.value;
  }

  return obj;
};

const cleanForm = formId => {
  const form = document.getElementById(formId);
  form.reset();
};

const hideModal = modalId => {
  $(`#${modalId}`).modal('hide');
};

const createList = (list) => {
  const ul = document.createElement('ul');
  ul.className = 'list-group mt-3';
  list.forEach(item => {
    const li = document.createElement('li');
    li.className = 'list-group-item border-0';
    li.id = item.id;
    li.appendChild(item);
    ul.appendChild(li);
  });

  return ul;
};

const setTitle = (title) => {
  const elem = document.getElementById('project-name');
  elem.innerHTML = title;
};

const cleanElement = (containerId) => {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
};

const addChild = (containerId, element) => {
  const container = document.getElementById(containerId);
  container.appendChild(element);
};

const createButton = (params) => {
  const {
    id,
    color = 'primary',
    innerText,
    onclick,
  } = params;

  const btn = document.createElement('button');
  btn.id = id;
  btn.className = `btn btn-${color} w-100 mb-1`;
  btn.innerText = innerText;
  btn.onclick = onclick;
  btn.type = 'button';
  return btn;
};

const createBadge = (priority) => {
  const badge = document.createElement('span');
  if (priority === '1') {
    badge.className = 'badge badge-danger h-75';
    badge.innerText = 'High';
  } else if (priority === '2') {
    badge.className = 'badge badge-success h-75';
    badge.innerHTML = 'Medium';
  } else if (priority === '3') {
    badge.className = 'badge badge-warning h-75';
    badge.innerHTML = 'Low';
  }

  return badge;
};

const select = (selectId, optionValToSelect) => {
  const selectElement = document.getElementById(selectId);
  const selectOptions = selectElement.options;
  let cont = true;
  let j = 0;

  while (cont) {
    const opt = selectOptions[j];
    if (opt.value === optionValToSelect) {
      selectElement.selectedIndex = j;
      cont = false;
    }
    j += 1;
  }
};

const openEditModal = (modalId, todo) => {
  const form = document.getElementById('todo-modal').querySelector('form');
  const hiddenInput = form.querySelector('#id');
  hiddenInput.setAttribute('value', todo.id);
  form.querySelector('#title').value = todo.innerText;
  form.querySelector('#description').value = todo.description;
  form.querySelector('#dueDate').value = todo.dueDate;
  select('priority', todo.priority);
  $('#todo-modal').modal('show');
};

const createCollapse = (element) => {
  const container = document.createElement('div');
  const collapseBtn = document.createElement('button');
  collapseBtn.className = 'btn btn-secondary w-100 mt-2';
  collapseBtn.type = 'button';
  collapseBtn.setAttribute('data-toggle', 'collapse');
  const collapseId = `t-${element.id}`;
  collapseBtn.setAttribute('data-target', `#${collapseId}`);
  collapseBtn.setAttribute('aria-expanded', 'false');
  collapseBtn.setAttribute('aria-controls', collapseId);
  collapseBtn.innerText = element.innerText;

  const collapse = document.createElement('div');
  collapse.id = collapseId;
  collapse.className = 'collapse';
  const collapseBody = document.createElement('div');
  collapseBody.className = 'card card-body';

  const todoTop = document.createElement('div');
  todoTop.className = 'd-flex flex-row justify-content-between';

  const todoDate = document.createElement('h6');
  todoDate.innerHTML = `Date: ${element.dueDate}`;

  const todoPriority = createBadge(element.priority);

  todoTop.appendChild(todoDate);
  todoTop.appendChild(todoPriority);

  const todoBody = document.createElement('div');
  const todoDescription = document.createElement('p');
  todoDescription.innerHTML = `Details<br>${element.description}`;

  todoBody.appendChild(todoDescription);

  collapseBody.appendChild(todoTop);
  collapseBody.appendChild(todoBody);

  collapse.appendChild(collapseBody);

  const todoBottom = document.createElement('div');
  todoBottom.className = 'text-right';

  const editBtn = createButton({
    id: `edit-btn-${collapseId}`,
    color: 'success',
    onclick: () => openEditModal('todo-modal', element),
    innerText: 'Edit',
  });
  todoBottom.appendChild(editBtn);

  const deleteBtn = createButton({
    id: `dlt-btn-${collapseId}`,
    color: 'danger',
    onclick: element.deleteButton.onclick,
    innerText: 'Delete',
  });
  todoBottom.appendChild(deleteBtn);

  todoBody.appendChild(todoBottom);

  container.appendChild(collapseBtn);
  container.appendChild(collapse);

  return container;
};

const showConfirmModal = (deleteHandler) => {
  const deleteBtn = document.getElementById('confirm-btn');
  deleteBtn.onclick = deleteHandler;
  $('#confirm-modal').modal('show');
};

const assignBtn = (btnId, onclickHandler) => {
  const btnElement = document.getElementById(btnId);
  btnElement.onclick = onclickHandler;
};

export {
  getFormValues,
  cleanForm,
  hideModal,
  createList,
  addChild,
  cleanElement,
  setTitle,
  createButton,
  createCollapse,
  showConfirmModal,
  assignBtn,
};