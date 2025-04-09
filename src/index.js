import './pages/index.css'; 
import { initialCards } from './cards.js';
import { openModal, closeModal } from './components/modal.js';
import { createCard, deleteCard, pressLike, cardsTemplate, cardImage } from './components/card.js';

// @todo: DOM узлы

const content = document.querySelector('.content');

const formPlaceElement = document.querySelector('[name="new-place"]');
const placesList = content.querySelector('.places__list');
const placeNameInput = formPlaceElement.querySelector('input[name="place-name"]');
const placeImageInput = formPlaceElement.querySelector('input[name="link"]');


const profileEditElement = document.querySelector('[name="edit-profile"]');
const profileEditBtn = content.querySelector('.profile__edit-button');
const profileAddBtn = content.querySelector('.profile__add-button');
const profileTitle = content.querySelector('.profile__title');
const profileDescription = content.querySelector('.profile__description');

const nameInput = profileEditElement.querySelector('input[name="name"]');
const jobInput = profileEditElement.querySelector('input[name="description"]');

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImageTemplate = document.querySelector('.popup_type_image');
const popupImage = popupImageTemplate.querySelector('.popup__image');
const popupCaption = popupImageTemplate.querySelector('.popup__caption');

const popupContent = popup.querySelector('.popup__content'); //???
const closeBtn = popup.querySelector('.popup__close');//???


// @todo: Вывести карточки на страницу - код, который отвечает за отображение шести карточек при открытии страницы

initialCards.forEach(function(cardElement) {
    const createdCard = createCard(cardElement, deleteCard, pressLike, compileImagePopup);

    placesList.append(createdCard);
});

// Редактирование имени и рода занятий - функция-обработчик события открытия модального окна для редактирования профиля

function editProfileCard(evt) { 
    evt.preventDefault(); 

    nameInput.value = content.querySelector('.profile__title').textContent; 
    jobInput.value = content.querySelector('.profile__description').textContent;

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closeModal(popupEdit);
}

profileEditElement.addEventListener('submit', editProfileCard); 

// Добавление новой карточки

function addNewCard(evt) {

    const placeName = placeNameInput.value;
    const placeLink = placeImageInput.value;

    const newData = {
        name: placeName,
        link: placeLink
    };

    const createdCard = createCard(newData, deleteCard, pressLike, compileImagePopup);

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

function compileImagePopup(initialCards) {

    popupImage.src = initialCards.link;
    popupImage.alt = initialCards.name;
    
    popupCaption.textContent = initialCards.name;

    openModal(cardImage, popupImageTemplate);
}

// !!!слушатели, которые надо куда-то разгрести 

closeBtn.addEventListener('click',
    closeModal(popup); // закрываем модалку по кнопке
});

popupContent.addEventListener('click', function(evt) {
    evt.stopPropagation(); // исключение срабатывания пред. слушателя на самом окне модалки
});

// вызовы?


openModal(profileEditBtn, popupEdit);
openModal(profileAddBtn, popupNewCard);