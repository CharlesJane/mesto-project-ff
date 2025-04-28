import "./pages/index.css";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./components/modal.js";
import { createCard, pressLike, deleteCard } from "./components/card.js";
import { enableValidation, resetInputErrors, resetSubmitButton } from "./components/validation.js";

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

const configData = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

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

  resetInputErrors(formEditProfile, configData);

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
  resetInputErrors(formAddNewPlace, configData);

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

enableValidation(configData);