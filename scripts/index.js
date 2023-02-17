const buttonAbout = document.querySelector(".profile__edit");

const popup = document.querySelector(".popup");

const buttonClose = popup.querySelector(".popup__close");

const getName = document.querySelector('.popup__input-text_type_name');
const profession = document.querySelector('.popup__input-text_type_profession');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let popupform = document.querySelector('.popup__input');

function profileEdit () {
  popup.classList.add("popup_opened");
  getName.value = profileName.textContent;
  profession.value = profileProfession.textContent;
  
}

function profileClose () {
  popup.classList.remove("popup_opened")
}

buttonAbout.addEventListener('click', profileEdit);
buttonClose.addEventListener('click', profileClose);


function addInfo(evt) {
  evt.preventDefault();
  profileName.textContent = getName.value;
  profileProfession.textContent = profession.value;
  profileClose ();
}
  
popupform.addEventListener('submit', addInfo);

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
const attractions = document.querySelector(".attractions");

const buttonAdd = document.querySelector(".profile__add");
const attraction = document.querySelector(".popup-attraction");
const buttonCreate = document.querySelector(".popup__btn_type_create");
const popupAdd = document.querySelector("#popupPlace");
const titleForm = document.querySelector(".popup__input-text_type_title");
const urlForm = document.querySelector(".popup__input-text_type_url");
const buttonAddAttraction = document.querySelector(".profile__add");
const buttonAttrClose = document.querySelector(".popup__close_type_attraction");


const toggleOpenAddPopup = () => {
  popupAdd.classList.toggle('popup_opened');
}

buttonAddAttraction.addEventListener('click', toggleOpenAddPopup);
buttonAttrClose.addEventListener('click', toggleOpenAddPopup);

const handleDelete = (evt) => {
  evt.target.closest('.place').remove();
}

const getItemElement = (link, name) => {
  const newItemElement = templatePlace.content.cloneNode(true);
  const newItemTitle = newItemElement.querySelector('.place__title').textContent = `${name}`;
  const newItemImg = newItemElement.querySelector('.place__img').src = `${link}`;
  const likeActive = newItemElement.querySelector('.place__like');
  const deleteButton = newItemElement.querySelector('.place__delete');
  deleteButton.addEventListener('click', handleDelete);
  return newItemElement
}

const renderItem = (link, name) => {
  attractions.prepend(getItemElement(link, name))
  
}

initialCards.forEach((item) => {
  renderItem(item.link, item.name)
})

buttonCreate.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderItem(urlForm.value, titleForm.value)
})

const placeOpen = document.querySelector(".popup-img");
const placePhoto = document.querySelector(".popup-img__photo");
const placeTitle = document.querySelector(".popup-img__title");
const placeImg = document.querySelector(".place__img");

function imgOpen () {
  placeOpen.classList.add("popup_opened");
  placePhoto.value = newItemImg.src;
  placeTitle.value = placeTitle.textContent;
}

placeImg.addEventListener('click', handleDelete);