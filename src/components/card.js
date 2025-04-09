// @todo: Функция создания карточки
// @todo: Темплейт карточки

const cardsTemplate = document.querySelector('#card-template').content;
const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
const deleteButton = cardElement.querySelector('.card__delete-button');
  
const cardImage = cardElement.querySelector('.card__image');
const cardTitle = cardElement.querySelector('.card__title');
const likeButton = cardElement.querySelector('.card__like-button');

function createCard(initialCards, deleteCard, pressLike, compileImagePopup) {

    cardTitle.textContent = initialCards.name;
    cardImage.src = initialCards.link;
    cardImage.alt = initialCards.name;

    deleteButton.addEventListener('click', function () {
        deleteCard(cardElement);
    });

    likeButton.addEventListener('click', function () {
        pressLike(likeButton);
    });

    cardImage.addEventListener('click', function () {
        compileImagePopup(initialCards);
    })

    return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(cardElement) {  
    cardElement.remove();
}

 //Ставим и снимаем лайк

function pressLike(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}

// export 

export { createCard, deleteCard, pressLike, cardsTemplate, cardImage};