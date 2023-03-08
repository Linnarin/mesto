const validationConfig = {
  formSelector: '.popup__input',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input-text-error',
  errorClass: 'popup__input-text-error_active'
}

const showError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);//поиск через id элемента
  inputElement.classList.add(validationConfig.inputErrorClass);//добавили красное подчеркивание
  errorElement.textContent = inputElement.validationMessage;//текст ошибки - стандартная валидация
  errorElement.classList.add(validationConfig.errorClass);//показываем ошибку
};
//скрываем ошибку (удаляем класс)
const hideError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);//убираем подчеркивание
  errorElement.classList.remove(validationConfig.errorClass);//скрываем блок с ошибкой
  errorElement.textContent = '';
};

const checkInputValidity = (validationConfig, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, validationConfig);
  } else {
    hideError(formElement, inputElement, validationConfig);
  }
};

const setEventListeners = (validationConfig, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));//все инпуты в массив
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(validationConfig, formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(validationConfig, formElement);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
//блокируем/разблокируем кнопку Сохранить/Создать после проверки на валидность инпутов
const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)) {
    disableButton (validationConfig, buttonElement);
  } else {
    activeButton (validationConfig, buttonElement);
  }
}
//копка не работает
const disableButton = (validationConfig, buttonElement) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
}
//кнопка работает
const activeButton = (validationConfig, buttonElement) => {
  buttonElement.disabled = '';
  buttonElement.classList.remove(validationConfig.inactiveButtonClass);
}

enableValidation(validationConfig); 