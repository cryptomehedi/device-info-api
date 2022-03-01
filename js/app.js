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
        phones.slice(0,20).forEach (phone =>{
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
    // .then(data => console.log(data.data))
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
    
        <div class="lg:w-100 sm:w-2/3 px-8 flex sm:justify-center lg:justify-end">
            <img class="" src="${data.image}">
        </div>
        <div class=" bg-orange-200 p-4 rounded">
            <div class="bg-white rounded p-4">
                Name: ${data.name}<br>
                Brand: ${data.brand}<br>
                Release Date: ${data.releaseDate ? data.releaseDate : 'No Data Found'}<br>
                Chip Set: ${data.mainFeatures.chipSet ? data.mainFeatures.chipSet: 'No Data Found'}<br>
                Display Size: ${data.mainFeatures.displaySize ? data.mainFeatures.displaySize : 'No Data Found'}<br>
                Memory: ${data.mainFeatures.memory ? data.mainFeatures.memory : 'No Data Found'}<br>
                Storage: ${data.mainFeatures.storage ? data.mainFeatures.storage : 'No Data Found'}<br>
                Sensor: ${data.mainFeatures.sensors ? data.mainFeatures.sensors : 'No Data Found'}<br>
                <span class="text-xl">Other</span><br>
                Bluetooth: ${data.others?.Bluetooth ? data.others?.Bluetooth : 'No Data Found'}<br>
                GPS: ${data.others?.GPS ? data.others?.GPS: 'No Data Found'}<br>
                NFC: ${data.others?.NFC ? data.others?.NFC : 'No Data Found'}<br>
                Radio: ${data.others?.Radio ? data.others?.Radio: 'No Data Found'}<br>
                USB: ${data.others?.USB ? data.others?.USB : 'No Data Found'}<br>
                Radio: ${data.others?.WLAN ? data.others?.WLAN : 'No Data Found'}
                
            </div>
        </div>
    `;
    div.appendChild(p)
    phoneDetails.appendChild(div)
}