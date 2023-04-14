class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._template = this._getTemplate();
    this._element = this._template.querySelector(".place");
    this._placeImage = this._element.querySelector(".place__img");
    this._placeTitle = this._element.querySelector(".place__title");
    this._placeDelete = this._element.querySelector(".place__delete");
    this._placeLike = this._element.querySelector(".place__like");
    this._setEventListeners();
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true);
    return cardElement;
  }

  _toggleLike() {
    this._placeLike.classList.toggle('place__like_active')
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

  _zoomImageCard() {
    this._handleCardClick(this._data);
  }

  generateCard() {
    this._placeImage.src = this._link;
    this._placeImage.alt = this._name;
    this._placeTitle.textContent = this._name;
    return this._element;
  }

  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

}

export { Card };