
class FormValidator {
  constructor(validationConfig, formElement) {
  this._formElement = formElement;
  this._validationConfig = validationConfig,
  this._inputs = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
  this._button = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
};

_showInputError = (inputElement) => {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this._validationConfig.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(this._validationConfig.errorClass);
};

_hideInputError = (inputElement) => {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this._validationConfig.inputErrorClass);
  errorElement.classList.remove(this._validationConfig.errorClass);
  errorElement.textContent = '';
};

_checkInputValidity = (inputElement) => {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement);
  } else {
    this._hideInputError(inputElement);
  }
};

disabledButton = (validationConfig) => {
  this._button.disabled = 'true';
  this._button.classList.add(validationConfig.inactiveButtonClass);
}

_deleteDisabledButton = (validationConfig) => {
  this._button.disabled = '';
  this._button.classList.remove(validationConfig.inactiveButtonClass);
}

_hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
   return !inputElement.validity.valid;
 });
}

_toggleButtonState = (inputList) => {
  if(this._hasInvalidInput(inputList)) {
   this.disabledButton (this._validationConfig);
  } else {
    this._deleteDisabledButton (this._validationConfig);
}
}

_setEventListeners = (inputList) => {
  this._toggleButtonState(inputList);
  this._inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(inputList);
    });
  });
};

removeValidationErrors = () => {
  this._inputs.forEach((inputElement) => {
    this._hideInputError(inputElement);
    });
  }
/*
enableValidation = () => {
  this._inputs.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._inputs);
  });
}
*/
enableValidation = () => {
  this._setEventListeners(this._inputs);
}
}
export { FormValidator };