const searchField = document.querySelector('.phone-name-input');
const searchButton = document.querySelector('#search-button');
const phoneDetails = document.querySelector('#phone-details');
const phoneContainer = document.querySelector('.phone-container');
const warningMessage = document.querySelector('.warning-message');

const searchPhone = () =>{
    if(!isNaN(searchField.value)){
        warningMessage.textContent=''
            phoneContainer.textContent=''
            searchField.value=''
            phoneDetails.textContent=''
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
        searchField.value=''
        phoneDetails.textContent=''
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
        phoneContainer.textContent= ''
        warningMessage.textContent=''
        phones.forEach (phone =>{
            console.log(phone);
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
                    <a href="#phone-details-show" onclick="showPhoneDetails('${phone.slug}')" class="bg-rose-300 hover:bg-rose-600 rounded px-2 hover:text-white font-semibold mt-2">Phone Details</a>
                </div>
            </div>
            `;
            div.appendChild(p)
            phoneContainer.appendChild(div)

            
        })
    }
    
}

const showPhoneDetails = phoneSlug =>{
    const url =`https://openapi.programming-hero.com/api/phone/${phoneSlug}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
}


const displayDetails= data =>{
    phoneDetails.textContent=''
    const div = document.createElement('div');
    div.classList.add ('flex');
    div.classList.add ('justify-center');
    div.classList.add ('p-4');
    const p = document.createElement('p')
    p.classList.add('grid')
    p.classList.add('md:grid-cols-1')
    p.classList.add('lg:grid-cols-2')
    p.innerHTML=`
    
        <div class="w-1/2 flex justify-end">
            <img class="px-2" src="${data.image}">
        </div>
        <div class=" bg-orange-200 p-4 rounded">
            <div class="bg-white rounded p-4">
                Name: ${data.name}<br>
                Brand: ${data.brand}<br>
                Release Date: ${data.releaseDate}<br>
                Chip Set: ${data.mainFeatures.chipSet}<br>
                Display Size: ${data.mainFeatures.displaySize}<br>
                Memory: ${data.mainFeatures.memory}<br>
                Storage: ${data.mainFeatures.storage}<br>
                Sensor: ${data.mainFeatures.sensors}
            </div>
        </div>
    `;
    div.appendChild(p)
    phoneDetails.appendChild(div)
}