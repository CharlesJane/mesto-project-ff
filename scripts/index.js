// @todo: Темплейт карточки

const cardsTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// @todo: Функция создания карточки

function addCard(initialCards, deletion) {
    const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
  
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardTitle.textContent = initialCards.name;
    cardImage.src = initialCards.link;
    cardImage.alt = initialCards.name;

    deleteButton.addEventListener('click', function () {
        deletion(deleteButton);
    });

    return cardElement;
}
// @todo: Функция удаления карточки

function deletion(deleteButton) {
    const cardToRemove = deleteButton.closest('.card');

    cardToRemove.remove();
}
// @todo: Вывести карточки на страницу

initialCards.forEach(function(cardElement) {
    const createdCard = addCard(cardElement, deletion);

    placesList.append(createdCard);
});