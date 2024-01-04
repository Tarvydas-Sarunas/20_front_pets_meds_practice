/* eslint-disable import/extensions */
import { getDataFetch, niceDate, petsUrl } from './modules/helper.js';

console.log('index.js file was loaded');

const els = {
  petsList: document.getElementById('pets-list'),
};

// ir parsiusti pets array

const [petsArr, error] = await getDataFetch(petsUrl);

console.log('error ===', error);

if (error) {
  // show error
}

console.log('pets ===', petsArr);

if (Array.isArray(petsArr)) {
  renderPetsList(petsArr);
}

function renderPetsList(arr) {
  els.petsList.innerHTML = '';
  // pagaminti html elementus
  arr.map(makeOnePetCard).forEach((htmlEl) => {
    els.petsList.append(htmlEl);
  });
  // sudeti i sarasa
}

function makeOnePetCard(pObj) {
  const liEl = document.createElement('li');
  liEl.className = 'card';
  liEl.dataset.petId = pObj.pets_id;
  liEl.innerHTML = `
  <h3 class="pet-name">${pObj.pets_name}</h3>
  <p class="pet-date"> ${niceDate(pObj.pets_dob)}</p>
  <p class="pet-email">${pObj.client_email}</p>
  <div class="flex center">
    <a href="logs.html?petId=${pObj.pets_id}" class="btn">View logs</a>
    <button class="btn btn-secondary">Delete</button>
  </div>
  `;

  // Nr 2 de possiblite
  // const btnEl = liEl.querySelector('button');
  // btnEl.addEventListener('click', (event) => {
  //   const btnPressed = event.target;
  //   deletePet(pObj.pet_id, btnPressed);
  // });

  const btnEl = liEl.querySelector('button');
  btnEl.addEventListener('click', deletePet);

  return liEl;
}

const petObj = {
  pets_id: 1,
  pets_dob: '2020-10-01T22:00:00.000Z',
  client_email: 'rebeka@email.com',
};

function deletePet(event) {
  const btnEl = event.target;
  const cardEl = btnEl.parentElement.parentElement;
  const idToDelete = cardEl.dataset.petId;
  console.log('deleting pet', idToDelete);
  // isiusti fetch delete
  fetch(`${petsUrl}/${idToDelete}`, {
    method: 'DELETE',
  })
    .then((resp) => {
      console.log('resp ===', resp);
      if (resp.status === 200) {
        console.log('istrinta sekmingai');
        // jei taip tai istrinti pati elementa (el.remove())
        cardEl.remove();
      }
    })
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });
  // ar sekmingas istrynimas
}

// Nr 2 de possibiliter

// function deletePet(idToDelete, btnEl) {
//   console.log('deleting pet', idToDelete);
//   // isiusti fetch delete
//   fetch(`${petsUrl}/${idToDelete}`, {
//     method: 'DELETE',
//   })
//     .then((resp) => {
//       console.log('resp ===', resp);
//       if (resp.status === 200) {
//         console.log('istrinta sekmingai');
//         // jei taip tai istrinti pati elementa (el.remove())
//         btnEl.parentElement.parentElement.remove();
//       }
//     })
//     .catch((error) => {
//       console.warn('ivyko klaida:', error);
//     });
//   // ar sekmingas istrynimas
// }

// function deletePet(idToDelete) {
//   // fetch su metodu delete
//   fetch(`${petsUrl}/${idToDelete}`, {
//     method: 'DELETE',
//   })
//     .then((resp) => {
//       console.log('resp ===', resp);
//       if (resp.status === 200) {
//         // istrinti pavyko
//         console.log('// istrinti pavyko');
//         // atnaujinam sarasa
//         init();
//       } else {
//         // istrinti nepavyko
//         console.log('// istrinti nepavyko');
//       }
//     })
//     .catch((error) => {
//       console.warn('ivyko klaida deleting:', error);
//     });
// }

/*
<li class="card">
  <h3 class="pet-name">Pet name</h3>
  <p class="pet-date">pet dob</p>
  <p class="pet-email">email</p>
  <div class="flex center">
    <a href="logs.html?petId=1" class="btn">View logs</a>
    <button class="btn btn-secondary">Delete</button>
  </div>
</li>
*/
