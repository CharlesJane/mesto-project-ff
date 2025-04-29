import "./pages/index.css";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./components/modal.js";
import { createCard, pressLike } from "./components/card.js";
import { enableValidation, resetInputErrors } from "./components/validation.js";
import { getProfile, getCards, updateProfile, addCard, deleteCardFromServer, addLike, removeLike } from "./components/api.js";

// DOM узлы

const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

const formEditProfile = document.querySelector('[name="edit-profile"]');
const formAddNewPlace = document.querySelector('[name="new-place"]');
const formDeletePlace = document.querySelector('[name="confirm-delete"]');

const profileEditButton = content.querySelector(".profile__edit-button");
const profileAddButton = content.querySelector(".profile__add-button");

const profileTitle = content.querySelector(".profile__title");
const profileDescription = content.querySelector(".profile__description");
const profileImage = content.querySelector('.profile__image');

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImageTemplate = document.querySelector(".popup_type_image");
const popupConfirmDelete = document.querySelector(".popup_type_delete");

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

// Подстановка данных профиля и отображение карточек


  // Создаем массив промисов для одновременной обработки

function loadData() {
  const promises = [getProfile(), getCards()];

Promise.all(promises)
  .then(([userData, cardsArray]) => {
    return Promise.all([
      userData.json(),
      cardsArray.json()
    ]);
  })
  .then(([userData, cardData]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    cardData.forEach(function(card) {
      const cardId = card._id;
      const createdCard = createCard(
        card,
        pressLike,
        createImagePopup,
        handleDelete
      );

      createdCard.dataset.id = cardId;

      placesList.append(createdCard);
    })
  })
  .catch((err) => {
    console.log('Ошибка', err);
  });
}

loadData();

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

  updateProfile(nameEditInput.value, jobEditInput.value)
    .then(() => {
      profileTitle.textContent = nameEditInput.value;
      profileDescription.textContent = jobEditInput.value;

      closeModal(popupEditProfile);
    })
    .catch((err) => {
      console.log('Ошибка', err);
    });
}

profileEditButton.addEventListener("click", insertCurrentProfileValues);
formEditProfile.addEventListener("submit", editProfileForm);

// Открываем попап для подтверждения удаления

function handleDelete(cardId) {
  const confirmButton = popupConfirmDelete.querySelector('.popup__button_confirm');

  openModal(popupConfirmDelete);

  confirmButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    confirmDeliteCard(cardId);
    closeModal(popupConfirmDelete);
  });
}

// Функция удаления карточки

function confirmDeliteCard(cardId) {
  deleteCardFromServer(cardId)
    .then(res => {
      // Проверяем статус ответа
      if (!res.ok) {
        throw new Error('Ошибка сервера: ' + res.status);
      }
      return res.json();
    })
    .then(data => {
      // Проверяем наличие сообщения об успешном удалении
      if (data.message === 'Пост удалён') {
        // Удаляем карточку из DOM
        const cardElement = document.querySelector(`.card[data-id="${cardId}"]`);
        cardElement.remove();
      } else {
        console.log('Ошибка удаления', data);
      }
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log('Ошибка', err);
    })
}
// Добавление новой карточки

profileAddButton.addEventListener("click", function () {
  openModal(popupNewCard);
});

function addNewCard(evt) {
  evt.preventDefault()

  addCard(newPlaceNameInput.value, newPlaceImageInput.value)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const newCreatedCard = createCard(
        data,
        pressLike,
        createImagePopup,
        handleDelete
      );

      placesList.prepend(newCreatedCard);

      formAddNewPlace.reset();
      resetInputErrors(formAddNewPlace, configData);

      closeModal(popupNewCard);
    })
    .catch((err) => {
      console.log('Ошибка', err);
    })
}

formAddNewPlace.addEventListener("submit", addNewCard);

// Функция добавления картинки и подписи в попап - функция открытия модального окна изображения карточки

function createImagePopup(linkValue, nameValue) {
  popupImage.src = linkValue;
  popupImage.alt = nameValue;
  popupCaption.textContent = nameValue;

  openModal(popupImageTemplate);
}

//Вызов валидации

enableValidation(configData);
