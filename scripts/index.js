const buttonAbout = document.querySelector(".profile__edit");

const popup = document.querySelector(".popup");

const buttonClose = popup.querySelector(".popup__close");

function profileEdit () {
  popup.classList.add("popup_opened")
}

function profileClose () {
  popup.classList.remove("popup_opened")
}

buttonAbout.addEventListener('click', profileEdit);
buttonClose.addEventListener('click', profileClose);

let buttonSave = document.querySelector('.popup__save-btn');
let name = document.querySelector('.popup__input-text_type_name');
let profession = document.querySelector('.popup__input-text_type_profession');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

function addInfo(evt) {
  evt.preventDefault();
  profileName.textContent = name.value;
  profileProfession.textContent = profession.value;
  profileClose ();
}
  
popupform.addEventListener('submit', addInfo);