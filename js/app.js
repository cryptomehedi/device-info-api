const searchField = document.querySelector('.phone-name-input');
const searchButton = document.querySelector('#search-button');
const phoneDetails = document.querySelector('.phone-details');
const phoneContainer = document.querySelector('.phone-container');
const warningMessage = document.querySelector('.warning-message');

// if(){
//     console.log("empty");
// }
const searchPhone = () =>{
    if(searchField.value == ''){
        warningMessage.textContent=''
            phoneContainer.textContent=''
            searchField.value=''
            const div = document.createElement('div');
                div.classList.add ('flex');
                div.classList.add ('justify-center');
                div.classList.add ('p-4');
                const p = document.createElement('p');
                p.classList.add('text-center');
                p.classList.add('font-bold');
                p.classList.add('text-4xl');
                p.classList.add('text-red-500');
                p.innerText = ` Your Search Field Is Empty`;
                div.appendChild(p)
                warningMessage.appendChild(div)
    }else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchField.value}`
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data))
    }
    
}

const displaySearchResult = phonesData =>{
    // console.log(phonesData);
    if(phonesData.status == false ){
            warningMessage.textContent=''
            phoneContainer.textContent=''
            searchField.value=''
            const div = document.createElement('div');
                div.classList.add ('flex');
                div.classList.add ('justify-center');
                div.classList.add ('p-4');
                const p = document.createElement('p');
                p.classList.add('text-center');
                p.classList.add('font-bold');
                p.classList.add('text-4xl');
                p.classList.add('text-red-500');
                p.innerText = `Search Result Not Found
                `;
                div.appendChild(p)
                warningMessage.appendChild(div)
    
    }else{
        const phones = phonesData.data
        searchField.value=''
        phoneContainer.textContent= ''
        warningMessage.textContent=''
        phones.forEach (phone =>{
            const div = document.createElement('div');
            div.classList.add ('bg-orange-200');
            div.classList.add ('m-8');
            div.classList.add ('p-4');
            const p = document.createElement('p');
            p.innerHTML = `
            <div class="bg-slate-200 rounded p-4">
                <div class="bg-white rounded p-4">
                    <div class="flex">
                    <img class=" px-2" src="${phone.image}">
                    </div><br>
                    Phone Name: ${phone.phone_name} <br>
                    Brand : ${phone.brand}<br>
                    <button onclick="seePhoneDetails()" class="bg-rose-300 hover:bg-rose-600 rounded px-2 hover:text-white font-semibold mt-2">Phone Details</button>
                </div>
            </div>
            `;
            div.appendChild(p)
            phoneContainer.appendChild(div)
        })
    }
}