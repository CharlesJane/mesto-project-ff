// Темплейт карточки
const cardsTemplate = document.querySelector("#card-template").content;

// Функция создания карточки

function createCard(cardsArray, pressLike, createImagePopup, deleteCard) {
  const cardElement = cardsTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = cardsArray.name;
  cardImage.src = cardsArray.link;
  cardImage.alt = cardsArray.name;

  deleteButton.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  likeButton.addEventListener("click", function () {
    pressLike(likeButton);
  });

  cardImage.addEventListener("click", function () {
    createImagePopup(cardImage.src, cardImage.alt);
  });

  return cardElement;
}

// Функция удаления карточки

function deleteCard(cardElement) {
  cardElement.remove();
}

// Ставим и снимаем лайк

function pressLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

// Экспорт функций
export { createCard, pressLike, deleteCard };
