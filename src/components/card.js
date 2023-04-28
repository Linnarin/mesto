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
    this._name = data.name;//имя
    this._link = data.link;//картинка
    this._id = data._id;//id карточки ???
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;//темплит
    this._handlerCardClick = handlerCardClick;//обработчик клика по карточке
    this._handlerOpenConfirmationPopup = handlerOpenConfirmationPopup;//обработчик открытия попапа водтверждения удаления
    this._handleClickLike = handleClickLike;//обработчик клика лайка
    this._userId = userId;
    this._myLike = false;
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
    this._element = this._getTemplate();
    this._like = this._element.querySelector('.place__like');
    this._image = this._element.querySelector('.place__img');
    this._delete = this._element.querySelector('.place__delete');
    this._counter = this._element.querySelector('.place__like-count');
    this._arreyLike();

    this._setEventListeners();
    this._image.src = this._link
    this._element.querySelector('.place__title').textContent = this._name;
    this._visualButtonDelete();

    this._startPageLikes();

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
  _visualButtonDelete() {
    if (this._userId === this._ownerId) {
      this._delete.style.display = "none";
    }
  }

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
    //console.log('this.checkMyLiked() = ' + this.checkMyLiked());
    const check = this.checkMyLiked();

    if (check) {
      //console.log('Лайка ЕСТЬ —> удаляем лайк');
      this._like.classList.add('place__like_active');
    } else {
      //console.log('Лайка НЕТ  —> ставим лайк');
    }
  }

  //кнопка лайка в карточке
  _toggleLikeButton() {
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


/*
class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleCardDeleteClick,
    userId,
    putLikeHandler,
    deleteLikeHandler) {
    this._title = data.name;
    this._imageUrl = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._owner = data.owner;
    this._templateSelector = templateSelector;
    this._template = this._getTemplate();
    this.element = this._template.querySelector(".place");
    this._cardImage = this.element.querySelector(".place__image");
    this._cardText = this.element.querySelector(".place__title");
    this._delete = this.element.querySelector(".place__delete");
    this._like = this.element.querySelector(".place__like");
    this._likeCount = this.element.querySelector(".place__like-count");
    this._setEventListeners();
    this._handleCardClick = handleCardClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
    this._userId = userId;
    this._putLike = putLikeHandler;
    this._deleteLike = deleteLikeHandler;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true);
    return cardTemplate;
  }

  _setEventListeners() {
    this._delete.addEventListener("click", () => {
      this._clickCardDelete();
    });
    this._like.addEventListener("click", () => {
      this.toggleLike(this);
    });
    this._cardImage.addEventListener("click", () => {
      this._clickCardOpenPopupImg();
    });
  }

  toggleLike() {
    if (this._like.classList.contains("place__like_active")) {
      this._deleteLike(this);
    } else {
      this._putLike(this);
    }
  }

  getId() {
    return this._cardId;
  }

  _clickCardOpenPopupImg() {
    this._handleCardClick(this._title, this._imageUrl);
  }

  _clickCardDelete() {
    this._handleCardDeleteClick(this._cardId, this.element);
  }

  clickCardLike(data) {
    this._like.classList.toggle("place__like_active");
    this._likeCount.textContent = data.likes.length;
  }

  renderCard() {
    this._cardImage.src = this._imageUrl;
    this._cardImage.alt = this._title;
    this._cardText.textContent = this._title;
    this._likeCount.textContent = this._likes.length;
    if (this._userId !== this._owner._id) {
      this._delete.style.display = "none";
    }
    this._likes.forEach((element) => {
      if (this._userId === element._id) {
        this._like.classList.add("place__like_active");
      }
    });

    return this.element;
  }
}

export default Card;
*/