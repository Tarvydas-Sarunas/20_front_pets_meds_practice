import { petsUrl } from './modules/helper.js';

const els = {
  form: document.querySelector('form'),
  name: document.getElementById('name'),
  dob: document.getElementById('dob'),
  clientEmail: document.getElementById('clientEmail'),
};

els.form.addEventListener('submit', createPet);

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
    .then((resp) => {
      if (resp.status === 201) {
        window.location = 'index.html';
      } else {
        return resp.json();
      }
    })
    .then((errors) => {
      console.log('data ===', errors);
      if (errors && errors.length > 0) {
        isInvalid(errors);
      }
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

function isInvalid(errorArr) {
  // Supprimer les messages d'erreur existants
  clearErrorMessages();

  errorArr.forEach((erObj) => {
    const divEl = document.createElement('div');
    divEl.classList.add('invalid-feedback');
    divEl.textContent = `Field ${erObj.field}: ${erObj.error}`;

    if (erObj.field === 'pets_name') {
      els.name.classList.add('is-invalid');
      els.name.after(divEl);
    } else if (erObj.field === 'client_email') {
      els.clientEmail.classList.add('is-invalid');
      els.clientEmail.after(divEl);
    }
  });
}

function clearErrorMessages() {
  // Supprimer les messages d'erreur existants
  const existingErrorMessages = document.querySelectorAll('.invalid-feedback');
  existingErrorMessages.forEach((element) => element.remove());
  // Supprimer la classe 'is-invalid' des champs de saisie
  els.name.classList.remove('is-invalid');
  els.clientEmail.classList.remove('is-invalid');
}
