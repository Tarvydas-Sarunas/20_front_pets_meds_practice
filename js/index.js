'use strict';
console.log('index.js file was loaded');

// panaudoti inportiname getDataFetch is helperio
import { getDataFetch, petsUrl } from './modules/helper.js';

// panaudoti getDataFetch
// is parsiusti pets array
const [petsArr, error] = await getDataFetch(petsUrl);

console.log('error ===', error);
if (error) {
  // show error
}

console.log('petsArr ===', petsArr);

if (Array.isArray(petsArr)) {
  renderPetsList(petsArr);
}

function renderPetsList(arr) {
  // pagaminti html elementus
  // sudeti i sarasa
}
