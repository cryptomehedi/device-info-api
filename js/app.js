const phoneNameInput = document.querySelector('.phone-name-input');
const searchButton = document.querySelector('#search-button');
const phoneDetails = document.querySelector('.phone-details');
const phoneName = document.querySelector('.phone-name');

const searchPhone = () =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${phoneNameInput.value}`
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
}