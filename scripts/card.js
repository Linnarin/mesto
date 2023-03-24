 
 class Card {
    constructor(data, templateSelector, openPopupImg) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
      this._openPopupImg = openPopupImg;
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
      
      this._element.querySelector('.place__like').addEventListener('click', function (event) {
        event.target.classList.toggle('place__like_active');
      }); 
      
      this._element.querySelector('.place__delete').addEventListener('click', () => {
        this._handleDelete();
      });
      
      this._element.querySelector('.place__img').addEventListener('click', () => {
        console.log(this)
        this._openPopupImg(this._link, this._name);
      });
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
      this._element.remove();
    }

    _openPopupImg (link, name) {
      this.photo.src = link;
      this.photo.alt = name;
      this.title.textContent = name;
      openPopup(templatePlaceImg);  
    }
  }
   
export default Card;