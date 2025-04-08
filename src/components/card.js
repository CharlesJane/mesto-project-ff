import { initialCards } from '../cards.js';
import { cardsTemplate, popupImageTemplate } from '../index.js';
import { openModal, closeModal } from '../components/modal.js';

// @todo: Функция создания карточки

export function createCard(initialCards, deleteCard, pressLike, imagePopup) {
    const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
  
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');

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
        openModal(cardImage, popupImageTemplate, closeModal);
        imagePopup(initialCards);
    })

    return cardElement;
}

// @todo: Функция удаления карточки

export function deleteCard(cardElement) {  
    cardElement.remove();
}

 //Ставим и снимаем лайк

export function pressLike(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}