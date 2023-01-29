const aboutButton = document.querySelector(".profile__edit");

const popup = document.querySelector(".popup");

const closeButton = popup.querySelector(".popup__close");

const toggleOpenPopup = () => {
  popup.classList.toggle("popup_opened");
};

const handleAboutButtonClick = () => {
  toggleOpenPopup();
};

const handleCloseButtonClick = () => {
  toggleOpenPopup();
};

const handleOverlyClick = (event) => {
  if (event.target === event.currentTarget) {
    toggleOpenPopup();
  }
};

aboutButton.addEventListener("click", handleAboutButtonClick);
closeButton.addEventListener("click", handleCloseButtonClick);

popup.addEventListener("click", handleOverlyClick);



let savebutton = document.querySelector('.popup__save-btn');

function addInfo() {
    let name = document.querySelector('.popup__input-text_type_name');
    let profession = document.querySelector('.popup__input-text_type_profession');
    let profilename = document.querySelector('.profile__name');
    let profileprofession = document.querySelector('.profile__profession');
    profilename.textContent = name.value;
    profileprofession.textContent = profession.value;
    
    name.value = '';
    profession.value = '';
}
  
  savebutton.addEventListener('click', addInfo);