export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close');
  }
  
  openPopup() {
    this._popup.classList.add('popup_opened');
     document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
         document.removeEventListener('keydown', this._handleEscClose);
  }
 
  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.closePopup ();
    }
  }
 
  setEventListeners () {
    this._closeButton.addEventListener('click', () => {
      this.closePopup();
  });

  this._popup.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.closePopup ();
      };
    });
}
}