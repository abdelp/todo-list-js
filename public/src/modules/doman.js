const getFormValues = formId => {
  const elements = document.getElementById(formId).elements;
  let obj = {};
  for(let i = 0; i < elements.length; i++) {
    const item = elements.item(i);
    obj[item.name] = item.value;
  }

  return obj;
}

export {getFormValues};

