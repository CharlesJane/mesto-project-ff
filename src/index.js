import './pages/index.css'; // импорт главного файла стилей
import { initialCards } from './cards.js';

// @todo: Темплейт карточки

const cardsTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const profileImage = content.querySelector('.profile__image');
const profileEditBtn = content.querySelector('.profile__edit-button');
const profileAddBtn = content.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

// @todo: Функция создания карточки

function createCard(initialCards, deleteCard) {
    const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
  
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardTitle.textContent = initialCards.name;
    cardImage.src = initialCards.link;
    cardImage.alt = initialCards.name;

    deleteButton.addEventListener('click', function () {
        deleteCard(cardElement);
    });

    return cardElement;
}
// @todo: Функция удаления карточки

function deleteCard(cardElement) {  
    cardElement.remove();
 }
// @todo: Вывести карточки на страницу

initialCards.forEach(function(cardElement) {
    const createdCard = createCard(cardElement, deleteCard);

    placesList.append(createdCard);
});

// Работа модальных окон


function openModal(item, popup, closeModal) {
    const closeBtn = popup.querySelector('.popup__close');

    item.addEventListener('click', function() {
        popup.classList.add('popup_is-opened');
    });

    closeBtn.addEventListener('click', function () {
        closeModal(popup);
    });
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

openModal(profileImage, popupImage, closeModal);
openModal(profileEditBtn, popupEdit, closeModal);
openModal(profileAddBtn, popupNewCard, closeModal);