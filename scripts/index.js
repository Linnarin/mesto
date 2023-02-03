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