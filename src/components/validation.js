// работа с формами на разгреб

function showInputError(someForm, someInput, errorMessage, settings) {
  // показывает сообщение об ошибке, добавляя нужный класс
  const errorElement = someForm.querySelector(`.${someInput.id}-error`);

  someInput.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

function hideInputError(someForm, someInput, settings) {
  // прячет сообщение об ошибке, удаляя класс
  const errorElement = someForm.querySelector(`.${someInput.id}-error`);

  someInput.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
}

function isValid(someForm, someInput, settings) {
  // проверяет состояние валидности по паттерну и по атрибутам
  if (someInput.validity.patternMismatch) {
    someInput.setCustomValidity(someInput.dataset.errorMessage);
  } else {
    someInput.setCustomValidity("");
  }

  if (!someInput.validity.valid) {
    showInputError(someForm, someInput, someInput.validationMessage, settings);
  } else {
    hideInputError(someForm, someInput, settings);
  }
}

function hasInvalidInput(inputList) {
  // проверяет, есть ли в форме хотя бы один невалидный инпут
  return inputList.some((someInput) => {
    return !someInput.validity.valid;
  });
}

function toggleButtonState(inputList, someButton, settings) {
  // переключает состоянием кнопки при валидации
  if (hasInvalidInput(inputList)) {
    someButton.disabled = true;

    someButton.classList.add(settings.inactiveButtonClass);
  } else {
    someButton.disabled = false;

    someButton.classList.remove(settings.inactiveButtonClass);
  }
}

export function resetInputErrors(someForm, settings) {
  // очищает ошибки при повторном открытии попапа
  const inputArray = Array.from(someForm.querySelectorAll(settings.inputSelector));
  const submitButton = someForm.querySelector(settings.submitButtonSelector);
  console.log(settings.submitButtonSelector);

  inputArray.forEach(function (someInput) {
    hideInputError(someForm, someInput, settings);
  });

  submitButton.disabled = true;
  submitButton.classList.add(settings.inactiveButtonClass);
};

// Слушатель события input и вызов функции проверки валидности формы

function setEventListeners(someForm, settings) {
  const inputList = Array.from(someForm.querySelectorAll(settings.inputSelector));
  const someButton = someForm.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, someButton, settings);

  inputList.forEach((someInput) => {
    someInput.addEventListener("input", function () {
      isValid(someForm, someInput, settings);

      toggleButtonState(inputList, someButton, settings);
    });
  });
}

export function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((someForm) => {
    setEventListeners(someForm, settings);
  });
}

