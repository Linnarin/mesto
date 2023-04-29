
import "./index.css";

import {
cardsContainer,
buttonAdd,
buttonAbout,
nameEdit,
profEdit,
editAvatarButton,
popupFormEditElement,
popupAddFormLinkElement,
popupAvatarElement

} from "../utils/constants.js";  
/*
  buttonAbout,
  buttonAdd,
  ,
  editAvatarButton,
  

  editForm,
  formAddCardPopup,
  ,
  


*/



import { FormValidator } from "../components/FormValidator.js";
import { validationConfig } from "../utils/constants.js";





import  { Api }  from "../components/Api.js";
import UserInfo from "../components/UserInfo.js";
import  Section  from "../components/Section.js";
import  { Card }  from "../components/Card.js";
import  PopupWithForm  from "../components/PopupWithForm.js";
import  PopupWithImage  from "../components/PopupWithImage.js";
import  PopupDelete  from "../components/PopupDelete.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-64",
  headers: {
    authorization: "24366505-8418-404e-906c-7290c9e8765a",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserInfo(), api.getArrCards()])
  .then(([userData, cardsData]) => {
    userProfile.setUserInfo(userData);
    userProfile.setUserAvatar(userData);
    defaultCard.rendererItems(cardsData);
  })
  .catch(console.log)


  const userProfile = new UserInfo({
    nameSelector: ".profile__name",
    aboutSelector: ".profile__profession",
    avatarSelector: ".profile__avatar",
  });

  function createCard(data) {
    const newCard = new Card(
      data,
      "#attraction",
      () => {
        popupZoomImage.open(data);
      },
      //функция обработчик клика по кнопке удаления
      (cardId) => {
        popupDelete.open(cardId, newCard)
      },
      () => {
        if (!newCard.checkMyLiked()) {
          api.putLike(data._id)
            .then((res) => {
              newCard.updateLikes(res);
            })
            .catch(console.log)
        } else {
          api.deleteLike(data._id)
            .then((res) => {
              newCard.updateLikes(res);
            })
            .catch(console.log)
        }
      },
      userProfile.getUserId()//вернули id
    );
    const cardElement = newCard.generateCard();
    return cardElement;
  }

  const defaultCard = new Section(
    {
      renderer: (item) => {
        const newCards = createCard(item);
        defaultCard.addItem(newCards);//вставляем карточки на страницу
      }
    }, cardsContainer);


   //добавление карточки
    const addUserCard = (data) => {
      popupAddCard.disableButton("Сохранение...");//меняем текст кнопки
      api.postUserCard(data)//передаем данные инпутов на сервер
        .then((res) => {//получили ответ от сервера
          cardsContainer.prepend(createCard(res));
          popupAddCard.close();
        })
        .catch(console.log(data))
        .finally(() => {
          popupAddCard.disableButton("Сохранить");//меняем текст кнопки
    
        })
    }
    
    //редактирование профиля
    const handlerFormSubmitEdit = (data) => {
      popupFormProfile.disableButton("Сохранение...");
      api
        .patchUserInfo(data)
        .then((res) => {
          userProfile.setUserInfo(res);
          popupFormProfile.close();
        })
        .catch(console.log())
        .finally(() => {
          popupFormProfile.disableButton("Сохранить", false);
        })
    
    }

    //обновление аватара
    const addAvatar = (data) => {
      popupAddAvatar.disableButton("Сохранение...");//меняем текст кнопки
      api.patchAvatar(data)
        .then((res) => {
          userProfile.setUserAvatar(res);//вставить картинку в разметку
          popupAddAvatar.close();//закрываем попап
        })
        .catch(console.log())
        .finally(() => {
          popupAddAvatar.disableButton("Сохранить", false);//возвращаем текст кнопки
        })
    };

//удаление
const handlePlaceSubmitDelete = () => {
  popupDelete.renderLoading(true, "Удаление...");
  api.deleteCard(popupDelete.cardId)
    .then(() => {
      popupDelete.card.handlerDeleteButton();
      popupDelete.close();
    })
    .finally(() => {
      popupDelete.renderLoading(false);
    })
    .catch(console.log);
};

    const popupDelete = new PopupDelete('.popup-delete', handlePlaceSubmitDelete);
  

    const popupFormProfile = new PopupWithForm ('.popup-profile', handlerFormSubmitEdit);
    const popupAddCard = new PopupWithForm('.popup-place', addUserCard);
    const popupZoomImage = new PopupWithImage('.popup-img');
    const popupAddAvatar = new PopupWithForm('.popup-avatar', addAvatar);

    
    



     const handlerPopupEditProfile = () => {
     const defaultUserData = userProfile.getUserInfo();//данные по умолчанию (ловим из профиля)
      //переносим данные в инпуты формы
      nameEdit.value = defaultUserData.name;//в инпут имени дефолтное имя
      profEdit.value = defaultUserData.about;//в инпут профессии дефолтную профессиию
      popupFormProfile.open();//открыли попап редактирования профиля
    }

    popupAddAvatar.setEventListeners();
    popupZoomImage.setEventListeners();
    popupFormProfile.setEventListeners();
    popupAddCard.setEventListeners();
    buttonAbout.addEventListener('click', handlerPopupEditProfile);

    buttonAdd.addEventListener('click', () => {
      validatorformAddCard.disabledButton(validationConfig);
      popupAddCard.open();
    });

    editAvatarButton.addEventListener('click', () => {
      popupAddAvatar.open();
    });

    const validatorEditProfile = new FormValidator(validationConfig, popupFormEditElement);
    validatorEditProfile.enableValidation();

//валидация формы создания карточки
    const validatorformAddCard = new FormValidator(validationConfig, popupAddFormLinkElement);
    validatorformAddCard.enableValidation();

//валидация формы редактирования аватарки
    const validatorEditAvatar = new FormValidator(validationConfig, popupAvatarElement);
    validatorEditAvatar.enableValidation();

