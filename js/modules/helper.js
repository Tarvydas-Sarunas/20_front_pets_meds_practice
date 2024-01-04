'use strict';
console.log('helper.js file was loaded');

const baseUrl = 'http://localhost:3000/v1/api';
export const petsUrl = `${baseUrl}/pets`;
export const logsUrl = `${baseUrl}/logs`;
export const prescUrl = `${baseUrl}/presc`;

//  hellper fetch function
export async function getDataFetch(url) {
  try {
    const resp = await fetch(url);
    if (resp.ok === false) {
      throw {
        status: resp.status,
        msg: resp.statusText,
      };
    }
    const data = await resp.json();
    return [data, null];
  } catch (error) {
    console.log('error getDataFetch ===', error);
    return [null, error];
  }
}

export function niceDate(dbDate, format = '') {
  const dateObj = new Date(dbDate);
  let formatedDate = dateObj.toLocaleDateString('fr-FR');
  if (format === 'time') {
    formatedDate = dateObj.toLocaleString('fr-fr');
  }
  return formatedDate;
}
