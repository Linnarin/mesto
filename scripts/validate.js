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
const hiddenError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);//убираем подчеркивание
  errorElement.classList.remove(validationConfig.errorClass);//скрываем блок с ошибкой
  errorElement.textContent = '';
};

const checkInputValidity = (validationConfig, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, validationConfig);
  } else {
    hiddenError(formElement, inputElement, validationConfig);
  }
};

const enableButton = (buttonElement, disabledButtonClass) => {
	buttonElement.removeAttribute('disabled');
	buttonElement.classList.remove(disabledButtonClass);
};

const disableButton = (buttonElement, disabledButtonClass) => {
	buttonElement.setAttribute('disabled', true);
	buttonElement.classList.add(disabledButtonClass);
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
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
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
   disabledButton (validationConfig, buttonElement);
  } else {
    deleteDisabledButton (validationConfig, buttonElement);
}
}
//копка не работает
const disabledButton = (validationConfig, buttonElement) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
}
//кнопка работает
const deleteDisabledButton = (validationConfig, buttonElement) => {
  buttonElement.disabled = '';
  buttonElement.classList.remove(validationConfig.inactiveButtonClass);
}

enableValidation(validationConfig); 

/*


function toggleButtonState (inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.disabledButtonClass);
} else {
  buttonElement.disabled = '';
  buttonElement.classList.remove(validationConfig.disabledButtonClass);
} 
}
const toggleButtonState = (inputs, submitElement, disabledButtonClass) => {
 const formIsValid = inputs.every(inputElement => inputElement.validity.valid);
	if (formIsValid) {
		enableButton(submitElement, disabledButtonClass);
	} else {
		disableButton(submitElement, disabledButtonClass);
	}
};
const setEventListeners = (form, validationConfig) => {
	const submitElement = form.querySelector(validationConfig.submitButtonSelector);
  console.log(submitElement)
	const inputs = Array.from(form.querySelectorAll(validationConfig.formSelector));
	inputs.forEach(inputElement => {
		inputElement.addEventListener('input', () => {
			toggleInputState(inputElement, validationConfig);
			toggleButtonState(inputs, submitElement, validationConfig.disabledButtonClass);
		});
	});
	toggleButtonState(inputs, submitElement, validationConfig.disabledButtonClass);
};

const hiddenError = (errorElement, inputErrorClass) => {
	errorElement.innerText = '';
	errorElement.classList.remove(inputErrorClass);
};

const showError = (errorElement, message, inputErrorClass) => {
	errorElement.innerText = message;
	errorElement.classList.add(inputErrorClass);
};

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
}
*/

/*

const validationOptions = {
  formSelector: '.popup__input',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input-text-error',
  errorClass: 'popup__input-text-error_active'
}; 

const enableValidation = ({
	formSelector,
	submitSelector,
	inputSelector,
	inputErrorSelector,
	inputErrorClass,
	disabledButtonClass,
}) => {
	const forms = Array.from(document.querySelectorAll(formSelector));
	forms.forEach(form => {
		setEventListeners(form, {
			submitSelector,
			inputSelector,
			inputErrorSelector,
			inputErrorClass,
			disabledButtonClass,
		});
	});
};
*/

/*
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorSelector);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorSelector);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

*/
/*
const setEventListeners = (formElement, options) => {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
*/




