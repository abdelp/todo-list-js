import $ from 'jquery';

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
  $(modalId).modal('hide');
}

const createList = (list) => {
  let ul = document.createElement('ul');
  ul.className = 'list-group';

  list.forEach(item => {
    let li = document.createElement('li');
    li.className = 'list-group-item';
    li.id = item.id;
    li.innerText = item.title;
    ul.appendChild(li);
  });

  return ul;
};

const addChild = (containerId, element) => {
  let container = document.getElementById(containerId);
  container.appendChild(element);
};

export {getFormValues,cleanForm, hideModal, createList, addChild};

