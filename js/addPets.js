import { petsUrl } from './modules/helper.js';

const els = {
  form: document.querySelector('form'),
  name: document.getElementById('name'),
  dob: document.getElementById('dob'),
  clientEmail: document.getElementById('clientEmail'),
};

function createPet(event) {
  event.preventDefault();
  console.log('form submitted');
  const petObj = {
    pets_name: els.name.value,
    pets_dob: els.dob.value,
    client_email: els.clientEmail.value,
  };
  console.log('petObj ===', petObj);
  // siusti i serveri
  fetch(petsUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(petObj),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log('data ===', data);
      // redirect to logs.html?petId=2
      // window.location = 'index.html';
    })
    .catch((err) => {
      console.log('err ===', err);
    });
}

const errArr = [
  { field: 'name', error: 'required' },
  { field: 'email', error: 'required' },
  { field: 'dob', error: 'required' },
];

// kai yra klaidu,
// 1. atvaizduoti visas klaidas viename klaidu bloke
// 2. atvaziduoti klaida ties konkreciu inputu

// grazina masyva kuriame yra objektas {​​ field: name, err: "required field"}​​
// res.status(400).json(error);

// tikrina meds laukus ar geri atsiusti

// tikrina logs laukus ar geri atsiusti
