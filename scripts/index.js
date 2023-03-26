import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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
  validatorEditProfile.removeValidationErrors();
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
const popupFormEditElement = document.forms["popupform"];
const popupAddFormLinkElement = document.forms["popupformplace"];
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

initialCards.forEach((item) => {
  const card = new Card(item, '#attraction');
  const cardElement = card.generateCard();
  document.querySelector('.attractions').prepend(cardElement);
});


const validationConfig = {
  formSelector: '.popup__input',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input-text-error',
  errorClass: 'popup__input-text-error_active'
}

popupAddFormLinkElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardItem = {
    name: titleForm.value,
    link: urlForm.value,
  };
  const userCard = new Card(cardItem, '#attraction');
  const cardElement = userCard.generateCard();
  closePopup(popupAdd);
  document.querySelector('.attractions').prepend(cardElement);
  popupAddFormLinkElement.reset();
  buttonCreate.setAttribute('disabled', 'disabled');
  buttonCreate.classList.add('popup__btn_disabled');
});

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

export {openPopupImg};

popups.forEach(popup => {
  popup.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popup)
    }
  }  )}) 

  const validatorEditProfile = new FormValidator(validationConfig, popupFormEditElement);
  validatorEditProfile.enableValidation();
  
  //валидация формы создания карточки
  const validatorformAddCard = new FormValidator(validationConfig, popupAddFormLinkElement);
  validatorformAddCard.enableValidation();
  


  
