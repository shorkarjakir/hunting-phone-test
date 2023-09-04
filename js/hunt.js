const loadPhone = async (searchText, isShowALL) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowALL);
}

const displayPhones = (phones, isShowALL) => {
  
  const phoneContainer = document.getElementById('phone-container');
  // clear search result.
  phoneContainer.textContent = '';
  // if else for show button or hide.
  const showallbtn = document.getElementById('show-all-btn');

  // show data for if else condition

  if (phones.length > 15 && !isShowALL) {
    showallbtn.classList.remove('hidden');
  }
  else {
    showallbtn.classList.add('hidden');
  }


  // display only first 15 if showall not Clicked:
  if (!isShowALL) {
    phones = phones.slice(0, 15);
  }
  phones.forEach(phone => {
    
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card bg-gray-100 shadow-xl m-3 p-4`
    phoneCard.innerHTML = `  <figure><img src="${phone.image}" alt="Shoes" /></figure>
          <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.slug}</p>
            <div class="card-actions justify-center">
              <button onclick= "handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
          </div>`
    phoneContainer.appendChild(phoneCard);
  })
  // stop the loading spin.
  toggleLoadingSpinner(false);
}

// show details button:
const handleShowDetails = async (id) => {
  console.log('button clicked', id);
  // load single phone data:
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
}
// show phone details:
const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById('show-det-phn-nm');
  phoneName.innerText = phone.name;
  
  const showIMG = document.getElementById('show-img');
  showIMG.innerHTML = `
  <img src="${phone.image}" alt="">
  `
  const showDes = document.getElementById('show-discrip');
  showDes.innerHTML = `
  <i class="">${phone.releaseDate}</i>
   <div class="">
            <h2><span class="text-xl font-semibold">Main Feature:</span></h2>
            <p><span class="font-bold">chipset:</span>${phone.mainFeatures?.chipSet}</p>
            <p><span class="font-bold">displaySize:</span>${phone.mainFeatures?.displaySize}</p>
            <p><span class="font-bold">memory:</span>${phone.mainFeatures?.memory || "no memory"}</p>
    </div>
  `

  show_details.showModal();
}

// search option added: 

const handleSearch = (isShowALL) => {
  toggleLoadingSpinner(true);
  const inputText = document.getElementById('input-field').value;
  loadPhone(inputText, isShowALL);
}

// showALL button added:

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
  }
  else {
    loadingSpinner.classList.add('hidden');
  }
}

// show all
const showAll = () => {
  handleSearch(true);
}

loadPhone();