// Темплейт карточки
const cardsTemplate = document.querySelector("#card-template").content;

// Функция создания карточки

function createCard(cardData, pressLike, createImagePopup, handleDelete) {
  const cardElement = cardsTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  if (cardData.owner._id === "c09a3d58b3afc37c1ef34a79") {
    deleteButton.style.opacity = 1;
  } else {
    deleteButton.style.opacity = 0;
  }

  deleteButton.addEventListener("click", function () {
    handleDelete(cardElement.dataset.id);
  });

  likeButton.addEventListener("click", function () {
    pressLike(likeButton);
  });

  cardImage.addEventListener("click", function () {
    createImagePopup(cardImage.src, cardImage.alt);
  });

  return cardElement;
}

// // Функция удаления карточки

// function deleteCard(cardElement) {
//   cardElement.remove();
// }

// Ставим и снимаем лайк

function pressLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

// Экспорт функций
export { createCard, pressLike };
