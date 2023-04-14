import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._photo = this._popup.querySelector('.popup__photo');
    this._title = this._popup.querySelector('.popup__title-photo');
  }
  
    openPopup(data) {
      super.openPopup();
      this._photo.src = data.link;
      this._photo.alt = data.name;
      this._title.textContent = data.name;
    }
}