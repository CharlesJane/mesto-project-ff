import "./pages/index.css";
import { openModal, closeModal } from "./components/modal.js";
import { createCard } from "./components/card.js";
import { enableValidation, resetInputErrors } from "./components/validation.js";
import {
  getProfile,
  getCards,
  updateProfile,
  updateAvatar,
  addCard,
  deleteCardFromServer,
  addLike,
  removeLike,
} from "./components/api.js";

// DOM узлы

const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");
// Формы
const formEditProfile = document.querySelector('[name="edit-profile"]');
const formAddNewPlace = document.querySelector('[name="new-place"]');
const formEditAvatar = document.querySelector('[name="new-avatar"]');
// Кнопки редактирования
const profileEditButton = content.querySelector(".profile__edit-button");
const profileAddButton = content.querySelector(".profile__add-button");
// Данные профиля
const profileTitle = content.querySelector(".profile__title");
const profileDescription = content.querySelector(".profile__description");
const profileImage = content.querySelector(".profile__image");
// Попапы
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImageTemplate = document.querySelector(".popup_type_image");
const popupConfirmDelete = document.querySelector(".popup_type_delete");
const popupEditAvatar = document.querySelector(".popup_type_avatar");

const popupDeleteButton = popupConfirmDelete.querySelector(".popup__button_confirm");
// Поля ввода для попапов
const newPlaceNameInput = formAddNewPlace.querySelector(
  'input[name="place-name"]'
);
const newPlaceImageInput = formAddNewPlace.querySelector(
  'input[name="place-link"]'
);
const avatarImageInput = formEditAvatar.querySelector(
  'input[name="avatar-link"]'
);
const nameEditInput = formEditProfile.querySelector('input[name="name"]');
const jobEditInput = formEditProfile.querySelector('input[name="description"]');
// Данные попапа карточки
const popupImage = popupImageTemplate.querySelector(".popup__image");
const popupCaption = popupImageTemplate.querySelector(".popup__caption");
// Список всех попапов для общих функций попапов (анимация, закрытие)
const popupsArray = Array.from(document.querySelectorAll(".popup"));
// Конфигурационные данные для валидации
const configData = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// Данные о пользователе

let userId;

// Подстановка данных профиля и отображение карточек

const promises = [getProfile(), getCards()]; // Создаем массив промисов для одновременной обработки

Promise.all(promises)
  .then(([userData, cardData]) => {
    userId = userData._id;

    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    cardData.forEach(function (card) {
      const createdCard = createCard(
        card,
        handleLikes,
        createImagePopup,
        handleDelete,
        userId
      );

      createdCard.dataset.id = card._id;

      placesList.append(createdCard);
    });
  })
  .catch((err) => {
    console.log("Ошибка", err);
  });

// Добавление анимации для попапов и слушателей на кнопку закрытия и оверлэй

popupsArray.forEach(function (popup) {
  const eachCloseButton = popup.querySelector(".popup__close");

  popup.classList.add("popup_is-animated");

  eachCloseButton.addEventListener("click", () => closeModal(popup));
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

// Редактирование имени и рода занятий - функция-обработчик открытия модального окна для редактирования профиля с подстановкой имеющихся данных в поля

function insertCurrentProfileValues() {
  nameEditInput.value = profileTitle.textContent;
  jobEditInput.value = profileDescription.textContent;

  resetInputErrors(formEditProfile, configData);

  openModal(popupEditProfile);
}

// Функция отправки новых данных профиля на сервер и отображение на сайте

function editProfileForm(evt) {
  evt.preventDefault();

  const editSubmitButton = formEditProfile.querySelector(".popup__button");
  const originalEditSubmitText = editSubmitButton.textContent;

  editSubmitButton.textContent = "Сохранение...";

  updateProfile(nameEditInput.value, jobEditInput.value)
    .then(() => {
      profileTitle.textContent = nameEditInput.value;
      profileDescription.textContent = jobEditInput.value;

      editSubmitButton.textContent = originalEditSubmitText;

      closeModal(popupEditProfile);
    })
    .catch((err) => {
      editSubmitButton.textContent = "Ошибка сохранения";
      console.log("Ошибка", err);
    });
}

profileEditButton.addEventListener("click", insertCurrentProfileValues);
formEditProfile.addEventListener("submit", editProfileForm);

// Открываем попап для подтверждения удаления - функция-обработчик

function handleDelete(cardId) {
  openModal(popupConfirmDelete);

  popupDeleteButton.addEventListener("click", function () {
    confirmDeleteCard(cardId);
  });
}

// Функция удаления карточки

function confirmDeleteCard(cardId) {
  const originalDeleteButtonText = popupDeleteButton.textContent;

  popupDeleteButton.textContent = "Удаление...";

  deleteCardFromServer(cardId)
    .then((data) => {
      if (data.message === "Пост удалён") {
        const cardElement = document.querySelector(
          `.card[data-id="${cardId}"]`
        );

        cardElement.remove();
        popupDeleteButton.textContent = originalDeleteButtonText;
        closeModal(popupConfirmDelete);
      } else {
        popupDeleteButton.textContent = "Ошибка удаления";
        console.log("Ошибка удаления", data);
      }
    })
    .catch((err) => {
      console.log("Ошибка", err);
    });
}

// Добавление новой карточки

profileAddButton.addEventListener("click", function () {
  openModal(popupNewCard);
});

function addNewCard(evt) {
  evt.preventDefault();

  const addNewCardButton = popupNewCard.querySelector(".popup__button");
  const originalAddButtonText = addNewCardButton.textContent;

  addNewCardButton.textContent = "Добавление карточки...";

  addCard(newPlaceNameInput.value, newPlaceImageInput.value)
    .then((data) => {
      const newCreatedCard = createCard(
        data,
        handleLikes,
        createImagePopup,
        handleDelete,
        userId
      );

      placesList.prepend(newCreatedCard);

      formAddNewPlace.reset();
      resetInputErrors(formAddNewPlace, configData);
      addNewCardButton.textContent = originalAddButtonText;

      closeModal(popupNewCard);
    })
    .catch((err) => {
      addNewCardButton.textContent = "Ошибка добавления";
      console.log("Ошибка", err);
    });
}

formAddNewPlace.addEventListener("submit", addNewCard);

// Функция подстановки картинки и подписи в попап - функция открытия модального окна изображения карточки

function createImagePopup(linkValue, nameValue) {
  popupImage.src = linkValue;
  popupImage.alt = nameValue;
  popupCaption.textContent = nameValue;

  openModal(popupImageTemplate);
}

// Добавление нового аватара

profileImage.addEventListener("click", function () {
  openModal(popupEditAvatar);
});

function editAvatar(evt) {
  evt.preventDefault();

  const avatarUrl = avatarImageInput.value.trim(); // Убираем еще пробелы, если при копировании захвачены
  const editAvatarButton = popupEditAvatar.querySelector(".popup__button");

  const originalEditAvatarButtonText = editAvatarButton.textContent;

  editAvatarButton.textContent = "Обновление...";

  updateAvatar(avatarUrl)
    .then(() => {
      profileImage.style.backgroundImage = `url(${avatarUrl})`;

      formEditAvatar.reset();
      resetInputErrors(formEditAvatar, configData);

      editAvatarButton.textContent = originalEditAvatarButtonText;

      closeModal(popupEditAvatar);
    })
    .catch((err) => {
      editAvatarButton.textContent = "Ошибка обновления аватара";
      console.log("Ошибка обновления аватара", err);
    });
}

formEditAvatar.addEventListener("submit", editAvatar);

// Функция обработчик лайков - проверяет на изначальное наличие лайков от пользователя, если есть - удаляет, если нет - добавляет. 
// Вызов повешен на кнопку внутри функции создания карточки в card.js

function handleLikes(likeButton, cardElement, cardData) {
  const likeCounterElement = cardElement.querySelector(".card__like-counter");
  const cardId = cardData._id;

  const isLiked = cardData.likes.some(function (like) {
    return like._id === userId;
  });

  if (isLiked) {
    removeLike(cardId)
      .then((card) => {
        likeButton.classList.remove("card__like-button_is-active");
        likeCounterElement.textContent = card.likes.length;

        cardData.likes = card.likes;
      })
      .catch((err) => {
        console.log("Ошибка удаления лайка", err);
      });
  } else {
    addLike(cardId)
      .then((card) => {
        likeButton.classList.add("card__like-button_is-active");
        likeCounterElement.textContent = card.likes.length;

        cardData.likes = card.likes;
      })
      .catch((err) => {
        console.log("Ошибка добавления лайка", err);
      });
  }
}

// Вызов валидации

enableValidation(configData);

