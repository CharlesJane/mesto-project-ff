import "./pages/index.css";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./components/modal.js";
import { createCard, pressLike, deleteCard } from "./components/card.js";

// DOM узлы

const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

const formEditProfile = document.querySelector('[name="edit-profile"]');
const formAddNewPlace = document.querySelector('[name="new-place"]');

const profileEditButton = content.querySelector(".profile__edit-button");
const profileAddButton = content.querySelector(".profile__add-button");
const profileTitle = content.querySelector(".profile__title");
const profileDescription = content.querySelector(".profile__description");

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImageTemplate = document.querySelector(".popup_type_image");

const newPlaceNameInput = formAddNewPlace.querySelector(
  'input[name="place-name"]'
);
const newPlaceImageInput = formAddNewPlace.querySelector('input[name="link"]');

const nameEditInput = formEditProfile.querySelector('input[name="name"]');
const jobEditInput = formEditProfile.querySelector('input[name="description"]');

const popupImage = popupImageTemplate.querySelector(".popup__image");
const popupCaption = popupImageTemplate.querySelector(".popup__caption");

const popupArray = Array.from(document.querySelectorAll(".popup"));

// Вывести карточки на страницу - код, который отвечает за отображение шести карточек при открытии страницы

initialCards.forEach(function (cardElement) {
  const createdCard = createCard(
    cardElement,
    pressLike,
    createImagePopup,
    deleteCard
  );

  placesList.append(createdCard);
});

// Добавление анимации для попапов и слушателей на кнопку закрытия и оверлэй

popupArray.forEach(function (popup) {
  const eachCloseButton = popup.querySelector(".popup__close");

  popup.classList.add("popup_is-animated");

  eachCloseButton.addEventListener("click", () => closeModal(popup)); 
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
     closeModal(popup);
   }
 }); 
});

// Редактирование имени и рода занятий - функция-обработчик открытия модального окна для редактирования профиля

function insertCurrentProfileValues() {
  nameEditInput.value = profileTitle.textContent;
  jobEditInput.value = profileDescription.textContent;

  openModal(popupEditProfile);
}

function editProfileForm(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameEditInput.value;
  profileDescription.textContent = jobEditInput.value;

  closeModal(popupEditProfile);
}

profileEditButton.addEventListener("click", insertCurrentProfileValues);
formEditProfile.addEventListener("submit", editProfileForm);

// Добавление новой карточки

profileAddButton.addEventListener("click", function () {
  openModal(popupNewCard);
});

function addNewCard(evt) {
  evt.preventDefault();

  const placeName = newPlaceNameInput.value;
  const placeLink = newPlaceImageInput.value;
  const newCardsArray = {
    name: placeName,
    link: placeLink,
  };
  const newCreatedCard = createCard(
    newCardsArray,
    pressLike,
    createImagePopup,
    deleteCard
  );

  placesList.prepend(newCreatedCard);

  formAddNewPlace.reset();

  closeModal(popupNewCard);
}

formAddNewPlace.addEventListener("submit", addNewCard);

// Функция добавления картинки и подписи в попап - функция открытия модального окна изображения карточки

function createImagePopup(linkValue, nameValue) {
  popupImage.src = linkValue;
  popupImage.alt = nameValue;
  popupCaption.textContent = nameValue;

  openModal(popupImageTemplate);
}

// работа с формами на разгреб


// Вынесем все необходимые элементы формы в константы
// const formElement = document.querySelector('.popup__form');
// const formInput = formElement.querySelector('.popup__input');
// const nameInput = formElement.querySelector('.popup__input_type_name');
// const descriptionInput = formElement.querySelector('.popup__input_type_description');
// const placeInput = formElement.querySelector('.popup__input_type_card-name');
// const urlInput = formElement.querySelector('.popup__input_type_url');

// const nameError = formElement.querySelector(`.${nameInput.id}-error`); 
// const descriptionError = formElement.querySelector(`.${descriptionInput.id}-error`); 
// const placeError = formElement.querySelector(`.${placeInput.id}-error`); 
// const urlError = formElement.querySelector(`.${urlInput.id}-error`); 

function showInputError(someForm, someInput, errorMessage) { // показывает сообщение об ошибке, добавляя нужный класс
  const errorElement = someForm.querySelector(`.${someInput.id}-error`);

  someInput.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

function hideInputError(someForm, someInput) {
  const errorElement = someForm.querySelector(`.${someInput.id}-error`);

  someInput.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

function isValid(someForm, someInput) {
  if (!someInput.validity.valid) {
    showInputError(someForm, someInput, someInput.validationMessage);
  } else {
    hideInputError(someForm, someInput);
  }
};


// Слушатель события input и вызов функции проверки валидности формы

function setEventListeners(someForm) {
  const inputList = Array.from(someForm.querySelectorAll('.popup__input'));

  inputList.forEach((someInput) => {
    someInput.addEventListener('input', function() {
      isValid(someForm, someInput);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((someForm) => {
    setEventListeners(someForm);
  });
};

enableValidation();