import { getDataFetch, logsUrl, niceDate, prescUrl } from './modules/helper.js';

console.log('logs.js file was loaded');

// pasiimti petId is query

const els = {
  h1petsName: document.getElementById('pets-name'),
  medList: document.getElementById('med-list'),
};

const petId = new URLSearchParams(window.location.search).get('petId');
console.log('petId ===', petId);

// atvaizduoti tam pet skirtus logs ir presciptions

// parsiusti visus irasus

const [logsArr, error] = await getDataFetch(`${logsUrl}/petId/${petId}`);
const [prescArr, prescError] = await getDataFetch(`${prescUrl}/petId/${petId}`);

console.log('error ===', error);
console.log('prescError ===', prescError);

if (error || prescError) {
  // show error
}

console.log('prescArr ===', prescArr);
console.log('logArr ===', logsArr);

if (Array.isArray(logsArr)) {
  renderLogsList(logsArr);
}
if (Array.isArray(prescArr)) {
  renderPrescList(prescArr);
}

// irasyti varda i h1
els.h1petsName.textContent = `${logsArr[0].pets_name}: Health Records`;

// sugeneruoti korteles sarase <ul id="med-list" class="unlisted grid">
function renderLogsList(arr) {
  els.medList.innerHTML = '';
  // pagaminti html elementus
  arr.map(makeOneLogCard).forEach((htmlEl) => {
    els.medList.append(htmlEl);
  });
  // sudeti i sarasa
}

function renderPrescList(prArr) {
  // pagaminti html elementus
  prArr.map(makeOnePrescCard).forEach((htmlEl) => {
    els.medList.append(htmlEl);
  });
}

function makeOneLogCard(logObj) {
  const liEl = document.createElement('li');
  liEl.className = 'card';
  // liEl.dataset.petId = pObj.pets_id;
  liEl.innerHTML = `
  <p><small>Log</small></p>
  <h3 class="card-tile">${logObj.status}</h3>
  <p class="card-text">${logObj.description}</p>
  `;
  return liEl;
}

function makeOnePrescCard(prescObj) {
  const liEl = document.createElement('li');
  liEl.className = 'card';
  // liEl.dataset.petId = pObj.pets_id;
  liEl.innerHTML = `
  <p><small>Prescription</small></p>
<h3 class="card-tile">${prescObj.name}</h3>
<p class="card-date"><i>${niceDate(prescObj.timestamp, 'time')}</i></p>
<p class="card-text">${prescObj.comment}</p>
  `;
  return liEl;
}

const prescObj = {
  presc_id: 1,
  comment: 'allors',
  timestamp: '2024-01-04T09:34:02.000Z',
  pets_name: 'Rex',
  name: 'Aspirinas',
};

const logsObj = {
  logs_id: 3,
  description: 'has a broken leg',
  status: 'sick',
  pets_name: 'Lynx',
  pets_dob: '2018-08-08T22:00:00.000Z',
};
