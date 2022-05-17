const urlRequest = 'http://localhost:8080/api';

function addLoading() {
  const element = document.createElement('h1');
  element.className = 'loading';
  element.innerHTML = 'loading...';
  document.querySelector('.contatos').appendChild(element);
};

function delLoading() {
  const loading = document.querySelector('.loading');
  loading.parentNode.removeChild(loading);
};

const getContacts = async () => {
  const response = await fetch(urlRequest);
  const contacts = await response.json();
  return contacts;
};

const clearContacts = () => {
  document.querySelector('tbody').innerHTML = '';
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

function createRemoveButtonElement() {
  const e = document.createElement('td');
  e.appendChild(createCustomElement('button', 'remove_btn', 'Remover'));
  return e;
};

function createButtonRemove(id) {
  const e = document.createElement('button');
};

function elementTr({ id, nome, email, telefone, profissao }) {
  const tr = document.createElement('tr');
  tr.className = 'contact_item';
  tr.appendChild(createCustomElement('td', 'id', id));
  tr.appendChild(createCustomElement('td', 'nome', nome));
  tr.appendChild(createCustomElement('td', 'email', email));
  tr.appendChild(createCustomElement('td', 'telefone', telefone));
  tr.appendChild(createCustomElement('td', 'profissao', profissao));
  tr.appendChild(createRemoveButtonElement());
  return tr;
};

const removeContact = async (event) => {
  const element = event.target;
  const id = element.parentNode.parentNode.children[0].innerText;
  // console.log(id);
  await fetch(`${urlRequest}/${id}`, {
    method: "DELETE",
  });
  clearContacts();
  loadContacts();
};

const addEventInBtnRemove = () => {
  const btnItems = document.querySelectorAll('.remove_btn');
  btnItems.forEach((btnItem) => btnItem.addEventListener('click', removeContact));
};

const loadContacts = async () => {
  addLoading();
  const contacts = await getContacts();
  contacts.forEach((contact) => {
    const element = elementTr(contact);
    document.querySelector('tbody').appendChild(element);
  });
  delLoading();
  addEventInBtnRemove();
}

const addContact = async () => {
  event.preventDefault();
  const nome = document.getElementById('input_nome').value;
  const email = document.getElementById('input_email').value;
  const telefone = document.getElementById('input_telefone').value;
  const profissao = document.getElementById('input_profissao').value;
  if (nome == '' || email == '' || telefone == '' || profissao == '') {
    alert('Preencha todos os campos para adicionar um novo contato');
  } else {
    await fetch(urlRequest, {
      method: "POST",
      body: JSON.stringify({nome, email, telefone, profissao }),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    });
    clearContacts();
    loadContacts();
    document.getElementById('input_nome').value = '';
    document.getElementById('input_email').value = '';
    document.getElementById('input_telefone').value = '';
    document.getElementById('input_profissao').value = '';
  }
};

window.onload = async () => {
  loadContacts();
};
