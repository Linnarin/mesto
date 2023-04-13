import "./index.css";

import {
  buttonAbout,
  buttonAdd,
  cardsContainer,
  nameEdit,
  profEdit,
  editForm,
  titleForm,
  urlForm,
  formAddCardPopup,
} from "../utils/Constants.js";

import { Card } from "../components/card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards, validationConfig } from "../utils/Constants.js";
import  Section  from "../components/section.js";
import  PopupWithForm  from "../components/PopupWithForm.js";
import  PopupWithImage  from "../components/PopupWithImage.js";
import UserInfo from "../components/userInfo.js";




//ВАЛИДАЦИЯ
//валидация формы редактирования профиля
const validatorEditProfile = new FormValidator(validationConfig, editForm);
validatorEditProfile.enableValidation();

//валидация формы создания карточки
const validatorformAddCard = new FormValidator(validationConfig, formAddCardPopup);
validatorformAddCard.enableValidation();


//открываем попап редактирования профиля. Вызываем в слушателе кнопки редактирования.
const popupEditProfile = () => {
  const defaultUserData = userProfile.getUserInfo();//данные по умолчанию (ловим из профиля)
  //переносим данные в инпуты формы
  nameEdit.value = defaultUserData.userName;//в инпут имени дефолтное имя
  profEdit.value = defaultUserData.userAbout;//в инпут профессии дефолтную профессиию
  validatorEditProfile.removeValidationErrors();//сбрасываем ошибки
  popupFormProfile.open();//открыли попап редактирования профиля
}

//ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ
const userProfile = new UserInfo({
  nameSelector: ".profile__name",//html-строка имени профиля
  aboutSelector: ".profile__profession",//html-строка профессии
});

//передаем в профиль данные из формы. Вызываем при создании попапа.
const handleFormSubmitEdit = (data)=> {
  userProfile.setUserInfo({
    userName: data.nameform,//инпут имени
    userAbout: data.professionform,//инпут профессии
  });
}

//СОЗДАЕМ КАРТОЧКИ

//создание карточки
function createCard (data) {
  const newCard = new Card(data, '#attraction', () => {
    popupZoomImage.open(data);
  });
  const cardElement = newCard.generateCard();
  return cardElement;
}

//карточки из массива
const defaultCard = new Section (
  {
    renderer: (item) => {
      const newCards = createCard (item);
      defaultCard.addItem(newCards);//вставляем карточки на страницу
    }
  },
  '.attractions')
  defaultCard.rendererItems(initialCards);//передаем массив данных карточек

//отрисовка карточки в DOM
const renderCard = (data) => {
  cardsContainer.prepend(createCard(data));
};

// создаем карточку пользователя
const addUserCard = () => {
  const cardItem = {
    name: titleForm.value,
    link: urlForm.value,
  };
  renderCard(cardItem);
}

//ПОПАПЫ
//попап редактирования профиля
const popupFormProfile = new PopupWithForm ('.popup-profile', handleFormSubmitEdit);
popupFormProfile.setEventListeners();
//попап добавления пользовательской карточки
const popupAddCard = new PopupWithForm ('.popup-place', addUserCard);
popupAddCard.setEventListeners();
const popupZoomImage = new PopupWithImage('.popup-img');
popupZoomImage.setEventListeners();

//СЛУШАТЕЛИ
//открываем попап редактирования профиля
buttonAbout.addEventListener('click', popupEditProfile);//открываем попап редактирования профиля
//открываем попап добавления пользовательской карточки
buttonAdd.addEventListener('click', () => {
  popupAddCard.open();
  validatorformAddCard.removeValidationErrors();
});


/*
import Card from "../components/card.js";
import FormValidator from "../../scripts/FormValidator.js";

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

buttonAddAttraction.addEventListener('click', () => { 
  popupAddFormLinkElement.reset();
  openPopup(popupAdd)
  validatorformAddCard.disabledButton(validationConfig);
})

function createCard(item) {
  const card = new Card(item, '#attraction');
  const cardElement = card.generateCard();
  return cardElement
}

function addCard(item) {
  cardsContainer.prepend(item)
}

initialCards.forEach((item) => {
  const newCard = createCard(item);
  addCard(newCard);
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
  const newCard = createCard(cardItem);
  addCard(newCard);
  popupAddFormLinkElement.reset();
  closePopup(popupAdd);
});



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
    if ( {
      closePopup(popup)
    }

  const validatorEditProfile = new FormValidator(validationConfig, popupFormEditElement);
  validatorEditProfile.enableValidation();
  
  //валидация формы создания карточки
  const validatorformAddCard = new FormValidator(validationConfig, popupAddFormLinkElement);
  validatorformAddCard.enableValidation();
  
*/

  
