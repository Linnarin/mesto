/*
class Card {
  constructor(data, templateSelector, handleCardClick, putLikeHandler, handleCardDeleteClick, userId, deleteLikeHandler) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._owner = data.owner;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._template = this._getTemplate();
    this._element = this._template.querySelector(".place");
    this._placeImage = this._element.querySelector(".place__img");
    this._placeTitle = this._element.querySelector(".place__title");
    this._placeDelete = this._element.querySelector(".place__delete");
    this._placeLike = this._element.querySelector(".place__like");
    this._likeCount = this.element.querySelector(".place__like-count");
    this._setEventListeners();
    this._handleCardClick = handleCardClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
    this._userId = userId;
    this._putLike = putLikeHandler;
    this._deleteLike = deleteLikeHandler;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true);
       return cardElement;
  }

  toggleLike() {
    if (this._placeLike.classList.contains("place__like_active")) {
      this._deleteLike(this);
    } else {
      this._putLike(this);
    }
  }

  getId() {
    return this._cardId;
  }
   
  _zoomImageCard() {
    this._handleCardClick(this._data);
  }

  _clickCardDelete() {
    this._handleCardDeleteClick(this._cardId, this.element);
  }

  clickCardLike(data) {
    this._placeLike.classList.toggle("place__like_active");
    this._likeCount.textContent = data.likes.length;
  }

  _setEventListeners() {
    this._placeLike.addEventListener('click', () => {
      this._toggleLike()});
    this._placeDelete.addEventListener('click', () => {
      this._deleteCard()});
    this._placeImage.addEventListener('click', () => {
      this._zoomImageCard()});  
  }

  _deleteCard() {
    this._element.remove();
  }

  generateCard() {
    this._placeImage.src = this._link;
    this._placeImage.alt = this._name;
    this._placeTitle.textContent = this._name;
    this._likeCount.textContent = this._likes.length;
    if (this._userId !== this._owner._id) {
      this._placeDelete.style.display = "none";
    }
    this._likes.forEach((element) => {
      if (this._userId === element._id) {
        this._placeLike.classList.add("place__like_active");
      }
    });
    return this._element;
    
  }

  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }
}
export { Card };
*/

class Card {
  constructor(

    data,
    templateSelector,
    handlerCardClick,
    handlerOpenConfirmationPopup,
    handleClickLike,
    userId
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handlerCardClick = handlerCardClick;
    this._handlerOpenConfirmationPopup = handlerOpenConfirmationPopup;
    this._handleClickLike = handleClickLike;
    this._userId = userId;
    this._element = this._getTemplate();
    this._like = this._element.querySelector('.place__like');
    this._image = this._element.querySelector('.place__img');
    this._delete = this._element.querySelector('.place__delete');
    this._counter = this._element.querySelector('.place__like-count');
    this._myLike = false;
    this._title = this._element.querySelector('.place__title')
    this._setEventListeners();
  }

  _getTemplate() {
    const cardElement = document//создали элемент
      .querySelector(this._templateSelector)//нашли темплит-элемент
      .content//извлекаем его содержимое
      .querySelector('.place')//в содержимом нашли элемент с классом card
      .cloneNode(true);//клонирование

    return cardElement;//возвращаем клонированный элемент
  }

  generateCard() {//вставляем данные из массива
    this._arreyLike();
    this._image.src = this._link
    this._title.textContent = this._name;
    this._image.alt = this._name;
    this._startPageLikes();
    if (this._userId !== this._ownerId) {
      this._delete.style.display = "none";
    }
    return this._element;
  }

  
  //вписываем количество лайков с сервера +
  _arreyLike() {
    this._counter.textContent = this._likes.length;
  }

  //сверяем id
  checkMyLiked() {
    return this._likes.some(user => user._id === this._userId)
  }

  //увеличиваем изображение карточки
  _zoomImageCard() {
    this._handlerCardClick(this._data);
  }

  //показываем кнопку удаления -> проверяем по id создателя
 

  updateLikes(res) {
    this._likes = res.likes;
    this._counter.textContent = res.likes.length;
    if (this.checkMyLiked()) {
      console.log('true');
    } else {
      console.log('false');
    }
    this._toggleLikeButton();
  }

  _startPageLikes() {
    const check = this.checkMyLiked();
    if (check) {
      this._like.classList.add('place__like_active');
    } else {
    }
  }

  //кнопка лайка в карточке
  _toggleLikeButton() {
    console.log(this._like)
    this._like.classList.toggle('place__like_active');
  }
  //удаление карточки из разметки
  handlerDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  //обработчик слушателей
  _setEventListeners() {
    //слушатель кнопки лайка
    this._like.addEventListener('click', () => {
      this._handleClickLike();
    });

    //слушаетль карточки - увеличение картинки
    this._image.addEventListener('click', () => {
      this._zoomImageCard(this._id, this._myLike);
    });

    //слушатель кнопки удаления
    this._delete.addEventListener('click', () => {
      this._handlerOpenConfirmationPopup(this._id);
    });
  }
}

//ЭКСПОРТ
export { Card };


