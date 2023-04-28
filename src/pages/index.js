
import "./index.css";

import {
cardsContainer,
buttonAdd,
buttonAbout,
nameEdit,
profEdit

} from "../utils/constants.js";  
/*
  buttonAbout,
  buttonAdd,
  ,
  editAvatarButton,
  

  editForm,
  formAddCardPopup,
  ,
  


/*

/*

/*
import { FormValidator } from "../components/FormValidator.js";
import { validationConfig } from "../utils/constants.js";




*/

import  { Api }  from "../components/Api.js";
import UserInfo from "../components/UserInfo.js";
import  Section  from "../components/Section.js";
import  { Card }  from "../components/Card.js";
import  PopupWithForm  from "../components/PopupWithForm.js";
import  PopupWithImage  from "../components/PopupWithImage.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-64",
  headers: {
    authorization: "24366505-8418-404e-906c-7290c9e8765a",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserInfo(), api.getArrCards()])//данные пользователя и массив карточек
  .then(([userData, cardsData]) => {
    //console.log('userData', userData);
    //console.log('cardsData', cardsData);
    userProfile.setUserInfo(userData);//выводим на страницу данные профиля
    userProfile.setUserAvatar(userData);//заправшиваем картинку с сервера
    defaultCard.rendererItems(cardsData);//запрашиваем массив карточек с сервера
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
      //обработчик лайка
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
    //console.log(data);
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


   
    const addUserCard = (data) => {
      popupAddCard.disableButton("Сохранение...");//меняем текст кнопки
      api.postUserCard(data)//передаем данные инпутов на сервер
        .then((res) => {//получили ответ от сервера
          cardsContainer.prepend(createCard(res));
          popupAddCard.close();
        })
        .catch(console.log)
        .finally(() => {
          popupAddCard.disableButton("Сохранить");//меняем текст кнопки
    
        })
    }
    
    
    const handlerFormSubmitEdit = (input) => {
      popupFormProfile.disableButton(true, "Coхранение...");
      api
        .patchUserInfo(input)
        .then((data) => {
          userProfile.setUserInfo(data);
          popupFormProfile.close()
        })
        .finally(() => {
          popupFormProfile.disableButton(false);
        })
        .catch(console.log);
    };

/*
    const handlerFormSubmitEdit = (data) => {
      popupFormProfile.disableButton("Сохранение...");
      api.patchUserInfo(data)
        .then((res) => {
          userProfile.setUserInfo(res);
          popupFormProfile.close();
        })
        .catch(console.log)
        .finally(() => {
          popupFormProfile.disableButton("Сохранить", false);
        })
    
    }
    */

    const popupFormProfile = new PopupWithForm ('.popup-profile', handlerFormSubmitEdit);

    const handlerPopupEditProfile = () => {
      const defaultUserData = userProfile.getUserInfo();//данные по умолчанию (ловим из профиля)
      //переносим данные в инпуты формы
      nameEdit.value = defaultUserData.name;//в инпут имени дефолтное имя
      profEdit.value = defaultUserData.about;//в инпут профессии дефолтную профессиию
      popupFormProfile.open();//открыли попап редактирования профиля
    }


    const popupAddCard = new PopupWithForm('.popup-place', addUserCard);
    const popupZoomImage = new PopupWithImage('.popup-img');
    




    popupZoomImage.setEventListeners();
    popupFormProfile.setEventListeners();
    popupAddCard.setEventListeners();
    buttonAbout.addEventListener('click', handlerPopupEditProfile);

    buttonAdd.addEventListener('click', () => {
      popupAddCard.open();
    });