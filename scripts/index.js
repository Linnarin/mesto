const buttonAbout = document.querySelector(".profile__edit");

const popups = document.querySelectorAll(".popup");

const closeButtons = document.querySelectorAll('.popup__close');


const popupProfile = document.querySelector("#popupProfile");
const nameGet = document.querySelector('.popup__input-text_type_name');
const profession = document.querySelector('.popup__input-text_type_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

function openProfileEdit () {
  openPopup(popupProfile);
  nameGet.value = profileName.textContent;
  profession.value = profileProfession.textContent;  
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

buttonAbout.addEventListener('click', openProfileEdit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameGet.value;
  profileProfession.textContent = profession.value;
  closePopup(popupProfile)
}
popupProfile.addEventListener('submit', handleProfileFormSubmit);



function handleClosePopupByEsc(evt) {
    if (evt.key === "Escape") {
      const popupOpen = document.querySelector('.popup_opened'); 
      closePopup(popupOpen)
    };
  }
 
function closePopup(popupOpen) {
  popupOpen.classList.remove('popup_opened'); 
  document.removeEventListener('keydown', handleClosePopupByEsc) 
}

function openPopup(popup) { 
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleClosePopupByEsc)
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const templatePlace = document.querySelector("#attraction");
const cardsContainer = document.querySelector(".attractions");

const buttonAdd = document.querySelector(".profile__add");
const attraction = document.querySelector(".popup-attraction");
const buttonCreate = document.querySelector(".popup__btn_type_create");
const popupAdd = document.querySelector("#popupPlace");
const titleForm = document.querySelector(".popup__input-text_type_title");
const urlForm = document.querySelector(".popup__input-text_type_url");
const buttonAddAttraction = document.querySelector(".profile__add");
const buttonAttrClose = document.querySelector(".popup__close_type_attraction");



buttonAddAttraction.addEventListener('click', () => { openPopup(popupAdd)})

const handleDelete = (evt) => {
  evt.target.closest('.place').remove();
}

const popupFormPlace = document.forms.popupformplace


const createCard = (link, name) => {
  const newItemElement = templatePlace.content.cloneNode(true);
  const newItemTitle = newItemElement.querySelector('.place__title').textContent = `${name}`;
  const newItemImg = newItemElement.querySelector('.place__img')
  newItemImg.src = `${link}`;
  newItemImg.alt = `${name}`;
  const likeActive = newItemElement.querySelector('.place__like').addEventListener('click', function (event) {
    event.target.classList.toggle('place__like_active');
  }); 
  newItemImg.addEventListener('click', () => {
    openPopupImg(link, name);
    console.log(link);
  });
  const buttonDelete = newItemElement.querySelector('.place__delete');
  buttonDelete.addEventListener('click', handleDelete);

  return newItemElement
}

const renderCard = (link, name) => {
  cardsContainer.prepend(createCard(link, name))
}

initialCards.forEach((item) => {
  renderCard(item.link, item.name)
})

popupFormPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard(urlForm.value, titleForm.value)
  popupFormPlace.reset();
  buttonCreate.setAttribute('disabled', 'disabled');
  buttonCreate.classList.add('popup__btn_disabled')
})

buttonCreate.addEventListener('click', () => closePopup(popupAdd))

const templatePlaceImg = document.querySelector("#popupImg");
const photo = templatePlaceImg.querySelector('.popup__photo');
const title = templatePlaceImg.querySelector('.popup__title-photo');

function openPopupImg (link, name) {
  photo.src = link;
  photo.alt = name;
  title.textContent = name;
  openPopup(templatePlaceImg);  
}


popups.forEach(popup => {
  popup.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popup)
    }
  }  )}) 



