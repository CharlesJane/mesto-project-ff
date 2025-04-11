import './pages/index.css'; // импорт главного файла стилей
import { initialCards } from './cards.js';
import { openModal, closeModal } from './components/modal.js';
import { createCard, pressLike, deleteCard } from './components/card.js';

// @todo: Темплейт карточки

// @todo: DOM узлы

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const formEditProfile = document.querySelector('[name="edit-profile"]');
const formAddNewPlace = document.querySelector('[name="new-place"]');

const profileEditButton = content.querySelector('.profile__edit-button');
const profileAddButton = content.querySelector('.profile__add-button');
const profileTitle = content.querySelector('.profile__title');
const profileDescription = content.querySelector('.profile__description');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImageTemplate = document.querySelector('.popup_type_image');

const newPlaceNameInput = formAddNewPlace.querySelector('input[name="place-name"]');
const newPlaceImageInput = formAddNewPlace.querySelector('input[name="link"]');

const nameEditInput = formEditProfile.querySelector('input[name="name"]');
const jobEditInput = formEditProfile.querySelector('input[name="description"]');

const popupImage = popupImageTemplate.querySelector('.popup__image');
const popupCaption = popupImageTemplate.querySelector('.popup__caption');

const popupArray = Array.from(document.querySelectorAll('.popup'));

// @todo: Вывести карточки на страницу - код, который отвечает за отображение шести карточек при открытии страницы (работает)

initialCards.forEach(function(cardElement) {
    const createdCard = createCard(cardElement, pressLike, openImagePopup, deleteCard);

    placesList.append(createdCard);
});

// добавление анимации для попапов

popupArray.forEach(function(popup) {
    popup.classList.add('popup_is-animated');
})

// Редактирование имени и рода занятий - функция-обработчик события открытия модального окна для редактирования профиля (работает)

function insertCurrentProfileValues() {
    nameEditInput.value = content.querySelector('.profile__title').textContent;
    jobEditInput.value = content.querySelector('.profile__description').textContent;

    openModal(popupEditProfile);

}

function editProfileForm(evt) { // Обработчик «отправки» формы
    evt.preventDefault();

    profileTitle.textContent = nameEditInput.value;
    profileDescription.textContent = jobEditInput.value;

    closeModal(popupEditProfile);
}

profileEditButton.addEventListener('click', insertCurrentProfileValues);
formEditProfile.addEventListener('submit', editProfileForm);

// Добавление новой карточки (работает)

profileAddButton.addEventListener('click', function() {
    openModal(popupNewCard);
});

function addNewCard(evt) {
    evt.preventDefault();

    const placeName = newPlaceNameInput.value;
    const placeLink = newPlaceImageInput.value;
    const newCardsArray = {
        name: placeName,
        link: placeLink
    };
    const newCreatedCard = createCard(newCardsArray, pressLike, openImagePopup, deleteCard);

    placesList.prepend(newCreatedCard);
    
    newPlaceNameInput.value = '';
    newPlaceImageInput.value = '';

    closeModal(popupNewCard);
}

formAddNewPlace.addEventListener('submit', addNewCard);

//функция добавления картинки и подписи в попап - функция открытия модального окна изображения карточки (работает)

function createImagePopup(linkValue, nameValue) {
    popupImage.src = linkValue;
    popupImage.alt = nameValue;
    popupCaption.textContent = nameValue;
    
    openModal(popupImageTemplate);
};

function openImagePopup(evt) {
    const cardImageToOpen = evt.target.closest('.card__image');

    if (cardImageToOpen) {
        const linkValue = cardImageToOpen.src;
        const nameValue = cardImageToOpen.alt;
        createImagePopup(linkValue, nameValue);
    }
}

placesList.addEventListener('click', openImagePopup);

//функция закрытия попапов

function handleCloseModal(evt) {
    const popupOpened = evt.target.closest('.popup_is-opened');
    const closeButton = evt.target.closest('.popup__close');
    const popupContent = evt.target.closest('.popup__content');

    if (closeButton) {
        closeModal(popupOpened);
    }

    if (popupOpened) {
        if (!popupContent) {  
            closeModal(popupOpened);
        }
        evt.stopPropagation();
    } 
};

document.addEventListener('click', handleCloseModal);