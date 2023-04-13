import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__input');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input-text'))
    this._button = this._form.querySelector('.popup__btn');
  }

  _getInputValues() {
    const inputElement = {};
    this._inputs.forEach((input) => {
      inputElement[input.name] = input.value;
    });
    return inputElement;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    });
}
}