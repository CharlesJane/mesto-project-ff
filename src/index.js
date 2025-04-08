import './pages/index.css'; // импорт главного файла стилей
import { initialCards } from './cards.js';
import { openModal, closeModal } from './components/modal.js';
import { createCard, deleteCard, pressLike } from './components/card.js';

// @todo: Темплейт карточки

export const cardsTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const profileEditBtn = content.querySelector('.profile__edit-button');
const profileAddBtn = content.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
export const popupImageTemplate = document.querySelector('.popup_type_image');

// @todo: Вывести карточки на страницу - код, который отвечает за отображение шести карточек при открытии страницы

initialCards.forEach(function(cardElement) {
    const createdCard = createCard(cardElement, deleteCard, pressLike, imagePopup);

    placesList.append(createdCard);
});

// Редактирование имени и рода занятий - функция-обработчик события открытия модального окна для редактирования профиля

const formElement = document.querySelector('[name="edit-profile"]'); // Находим форму в DOM

const nameInput = formElement.querySelector('input[name="name"]'); // Находим поля формы в DOM
const jobInput = formElement.querySelector('input[name="description"]'); // Находим поля формы в DOM

nameInput.value = content.querySelector('.profile__title').textContent; // выводим в инпут уже указанные значения
jobInput.value = content.querySelector('.profile__description').textContent; // выводим в инпут уже указанные значения

function handleFormSubmit(evt) { // Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
    // Получите значение полей jobInput и nameInput из свойства value
    const name = nameInput.value;
    const job = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    const profileTitle = content.querySelector('.profile__title');
    const profileDescription = content.querySelector('.profile__description');
    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = name;
    profileDescription.textContent = job;

    closeModal(popupEdit);
}

formElement.addEventListener('submit', handleFormSubmit); // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»

// Добавление новой карточки

const formPlaceElement = document.querySelector('[name="new-place"]');
const placeNameInput = formPlaceElement.querySelector('input[name="place-name"]');
const placeImageInput = formPlaceElement.querySelector('input[name="link"]');

function addNewCard(evt) {

    const placeName = placeNameInput.value;
    const placeLink = placeImageInput.value;

    const createdCard = createCard(newData, deleteCard);

    const newData = {
        name: placeName,
        link: placeLink
    };

    initialCards.unshift(newData);
    placesList.prepend(createdCard);
    
    placeNameInput.value = '';
    placeImageInput.value = '';

    closeModal(popupNewCard);
}

formPlaceElement.addEventListener('submit', function(evt) {
    evt.preventDefault();
    addNewCard(evt);
});

//функция добавления картинки и подписи в попап - функция открытия модального окна изображения карточки

function imagePopup(initialCards) {
    const popupImage = popupImageTemplate.querySelector('.popup__image');
    const popupCaption = popupImageTemplate.querySelector('.popup__caption');

    popupImage.src = initialCards.link;
    popupImage.alt = initialCards.name;
    
    popupCaption.textContent = initialCards.name;
}

openModal(profileEditBtn, popupEdit, closeModal);
openModal(profileAddBtn, popupNewCard, closeModal);