class FormValidator {
    constructor(validationConfig, form) {
      this._form = form;
      this._validationConfig = validationConfig;
      this._inputs = Array.from(this._form.querySelectorAll(this._validationConfig.inputSelector));
      this._button = this._form.querySelector(this._validationConfig.submitButtonSelector);
    }
  
    _showError = (inputElement) => {
      const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._validationConfig.inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._validationConfig.errorClass);
    };
  
    _hideError = (inputElement) => {
      const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._validationConfig.inputErrorClass);
      errorElement.classList.remove(this._validationConfig.errorClass);
      errorElement.textContent = "";
    };
  
    _checkInputValidity = (inputElement) => {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement);
      } else {
        this._hideInputError(inputElement);
      }
    };
  
    _hasInvalidInput = (inputList) => {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    };
  
    _toggleButtonState = () => {
      if (this._hasInvalidInput(this._inputs)) {
        this._button.disabled = true;
      } else {
        this._button.disabled = false;
      }
    };
  
    resetValidation = () => {
      this._toggleButtonState();
      this._inputs.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
    };
  
    _setEventListeners = () => {
      this._inputs.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._isValid(inputElement);
          this._toggleButtonState();
        });
      });
      this._toggleButtonState();
    };
  
    enableValidation() {
      this._setEventListeners();
    }
  }
export default FormValidator;