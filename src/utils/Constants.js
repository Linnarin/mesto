/*


export const aboutButton = document.querySelector(".profile__edit");
export const popupEditProfile = document.querySelector(".popup-editing");
export const popupEditProfileFormName = popupEditProfile.querySelector(".popup__input_type_name");
export const popupEditProfileFormVocation = document.getElementById('nameform');
export const popupFormEditElement = document.forms["form-edit-profile"];
export const popupFormEditAvatar = document.forms["form-edit-avatar"];
export const placesContainer = document.querySelector('.attractions')
export const popupAdd = document.querySelector(".popup-add");
export const popupAddFormLinkElement = document.forms["form-add-place"];
export const addPlaceButton = document.querySelector(".profile__add");
export const editAvatarButton = document.querySelector(".profile__avatar-edit")
export const formValidationConfig = {
  formSelector: '.popup__input',
  inputSelector: '.popup__input-text',
  inputErrorClass: 'popup__input-text-error',
  errorClass: 'popup__input-text-error_active',
  submitButtonSelector: '.popup__btn',
};
  export const validationConfig = {
    formSelector: '.popup__input',
    inputSelector: '.popup__input-text',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_disabled',
    inputErrorClass: 'popup__input-text-error',
    errorClass: 'popup__input-text-error_active'
  }   
*/


  const buttonAbout = document.querySelector('.profile__edit');
  const buttonAdd = document.querySelector('.profile__add');
  const popupEditProfile = document.querySelector(".popup-profile");
  const editAvatarButton = document.querySelector(".profile__avatar")

  const cardsContainer = document.querySelector('.attractions')
  
  const nameEdit = document.getElementById('nameform');
  const profEdit = document.getElementById('professionform');
  const editForm = document.getElementById('popupform');
  const editAvatarPhoto = document.getElementById('avatarform');
  const popupFormEditElement = document.forms["popupform"];
  const popupAddFormLinkElement = document.forms["popupformplace"];
  const popupAvatarElement = document.forms["avatarform"];
  
  const titleForm = document.getElementById('popuptitle');
  const urlForm = document.getElementById('popupurl');
  const formAddCardPopup = document.querySelector('.popup__input_type_attraction');
  
  export const validationConfig = {
    formSelector: '.popup__input',
    inputSelector: '.popup__input-text',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_disabled',
    inputErrorClass: 'popup__input-text-error',
    errorClass: 'popup__input-text-error_active'
  }   
  
   export {
    buttonAbout,
    buttonAdd,
    cardsContainer,
    nameEdit,
    profEdit,
    editForm,
    titleForm,
    urlForm,
    formAddCardPopup,
    popupEditProfile,
    editAvatarPhoto,
    editAvatarButton,
    popupFormEditElement,
    popupAddFormLinkElement,
    popupAvatarElement
  };


/*
  export const buttonAbout = document.querySelector(".profile__edit");

  export const popups = document.querySelectorAll(".popup");
  
  export const closeButtons = document.querySelectorAll('.popup__close');
  
  
  export const popupProfile = document.querySelector("#popupProfile");
  export const nameGet = document.querySelector('.popup__input-text_type_name');
  export const profession = document.querySelector('.popup__input-text_type_profession');
  export const profileName = document.querySelector('.profile__name');
  export const profileProfession = document.querySelector('.profile__profession');
  export  const popupFormEditElement = document.forms["popupform"];
  export  const popupAddFormLinkElement = document.forms["popupformplace"];
  export  const templatePlace = document.querySelector("#attraction");
  export  const cardsContainer = document.querySelector(".attractions");
  
  export  const buttonAdd = document.querySelector(".profile__add");
  export  const attraction = document.querySelector(".popup-attraction");
  export  const buttonCreate = document.querySelector(".popup__btn_type_create");
  export  const popupAdd = document.querySelector("#popupPlace");
  export  const titleForm = document.querySelector(".popup__input-text_type_title");
  export const urlForm = document.querySelector(".popup__input-text_type_url");
  export  const buttonAddAttraction = document.querySelector(".profile__add");
  export  const buttonAttrClose = document.querySelector(".popup__close_type_attraction");
  */
 