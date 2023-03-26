import {openPopupImg} from "./index.js";
class Card {
    constructor(data, templateSelector, openPopupImg) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.place')
        .cloneNode(true);
  
      return cardElement;
    }

    _setEventListeners() {
      this._element.querySelector('.place__like').addEventListener('click', () => {
        this._toggleLike()});
      
    
      this._element.querySelector('.place__delete').addEventListener('click', () => {
        this._deleteCard()});
    
      this._element.querySelector('.place__img').addEventListener('click', () => {
        this._openPopupImg()});
    
  }

  _toggleLike() {
    this._element.querySelector('.place__like').classList.toggle('place__like_active')
  }

  _deleteCard() {
    this._element.remove();
  }

  _openPopupImg() {
    openPopupImg(this._link, this._name);
  }
  
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      this._element.querySelector('.place__img').src = this._link;
      this._element.querySelector('.place__img').alt = this._name;
      this._element.querySelector('.place__title').textContent = this._name;
      return this._element;
    }
    
    _handleDelete() {
      
    }
  }
   
export default Card;