class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);

    return cardElement;
  }

  _zoomImageCard() {
    this._handleCardClick(this._data);
  }
  _setEventListeners() {
    this._element.querySelector('.place__like').addEventListener('click', () => {
      this._toggleLike()});
    this._element.querySelector('.place__delete').addEventListener('click', () => {
      this._deleteCard()});
    this._element.querySelector('.place__img').addEventListener('click', () => {
      this._zoomImageCard()});  
  }

  _toggleLike() {
    this._element.querySelector('.place__like').classList.toggle('place__like_active')
  }

  _deleteCard() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.place__img').src = this._link;
    this._element.querySelector('.place__img').alt = this._name;
    this._element.querySelector('.place__title').textContent = this._name;
    return this._element;
  }

  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

}

export { Card };

/*
import {openPopupImg} from "../pages/index.js";
export default class Card {
    constructor(data, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
    }

  }
*/