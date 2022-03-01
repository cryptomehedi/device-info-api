const searchField = document.querySelector('.phone-name-input');
const searchButton = document.querySelector('#search-button');
const phoneDetails = document.querySelector('.phone-details');
const phoneName = document.querySelector('.phone-name');

const searchPhone = () =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchField.value}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.data))
}

const displaySearchResult = phones =>{
    console.log(phones);
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add ('bg-orange-200')
        div.classList.add ('m-8')
        div.classList.add ('p-4')
        const p = document.createElement('p')
        p.innerHTML = `
        <div class="bg-slate-200 rounded p-4">
            <div class="bg-white rounded p-4">
                <div class="flex">
                <img class=" px-2" src="${phone.image}">
                </div><br>
                Phone Name: ${phone.phone_name} <br>
                Brand : ${phone.brand}<br>
                <button class="bg-rose-300 hover:bg-rose-600 rounded px-2 hover:text-white font-semibold mt-2">Phone Details</button>
            </div>
        </div>
        `;
        div.appendChild(p)
        phoneName.appendChild(div)
    });
}