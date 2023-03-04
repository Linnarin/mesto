const buttonAbout = document.querySelector(".profile__edit");

const popup = document.querySelector(".popup");

const closeButtons = document.querySelectorAll('.popup__close');

const popupProfile = document.querySelector("#popupProfile");
const getName = document.querySelector('.popup__input-text_type_name');
const profession = document.querySelector('.popup__input-text_type_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const popupform = popupProfile.querySelector('.popup__input');
const buttonSave = document.querySelector(".save-button");

function openProfileEdit () {
  openPopup(popup);
  getName.value = profileName.textContent;
  profession.value = profileProfession.textContent;  
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});


buttonAbout.addEventListener('click', openProfileEdit);

function addInfo(evt) {
  evt.preventDefault();
  profileName.textContent = getName.value;
  profileProfession.textContent = profession.value;
  closePopup(popupProfile)
}

popupform.addEventListener('submit', addInfo);

//ШАБЛОННЫЕ ОБРАБОТЧИКИ
//обработчик открытия формы
function openPopup (element) {
  element.classList.add('popup_opened');
  //закрываем попап по нажатию на Esc
  window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      closePopup (element);
    }
  });
}
//обработчик закрытия формы
function closePopup (element) {
  element.classList.remove('popup_opened');
  //удаляем обработчик кнопки Esc
  window.removeEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      closePopup (element);
    }
  });
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
const attractions = document.querySelector(".attractions");

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


const getItemElement = (link, name) => {
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

popupFormPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderItem(urlForm.value, titleForm.value)
  popupFormPlace.reset();
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

popup.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(popup)
  }
})

popupAdd.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(popupAdd)
  }
})

templatePlaceImg.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(templatePlaceImg)
  }
})



