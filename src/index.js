import './pages/index.css'; // импорт главного файла стилей
import { initialCards } from './cards.js';

// @todo: Темплейт карточки

const cardsTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const profileEditBtn = content.querySelector('.profile__edit-button');
const profileAddBtn = content.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImageTemplate = document.querySelector('.popup_type_image');

// @todo: Функция создания карточки


function createCard(initialCards, deleteCard, pressLike, imagePopup) {
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

function deleteCard(cardElement) {  
    cardElement.remove();
 }
// @todo: Вывести карточки на страницу

initialCards.forEach(function(cardElement) {
    const createdCard = createCard(cardElement, deleteCard, pressLike, imagePopup);

    placesList.append(createdCard);
});

// Работа модальных окон

// Открытие модального окна
function openModal(item, popup, closeModal) {
    const closeBtn = popup.querySelector('.popup__close');
    const popupContent = popup.querySelector('.popup__content');

    popup.classList.add('popup_is-animated'); // добавляем класс для плавной анимации открытия/закрытия

    item.addEventListener('click', function() {
        popup.classList.add('popup_is-opened'); //открываем модалку
        popup.classList.add('popup_is-animated');

        document.addEventListener('keydown', closeByEscape); //вешаем слушатель только после открытия модалки, чтобы эскейп не срабатывал впустую на странице
    });

    closeBtn.addEventListener('click', function () {
        closeModal(popup); // закрываем модалку по кнопке
    });

    popup.addEventListener('click', function(evt) {
        closeModal(popup); //слушатель клика и закрытие по лэйауту модалки
    });

    popupContent.addEventListener('click', function(evt) {
        evt.stopPropagation(); // исключение срабатывания пред. слушателя на самом окне модалки
    });
}
// Закрытие модального окна по кнопке
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape); //удаляем слушатель, чтобы не отрабатывал вне модалки
}

function closeByEscape(evt) {
    const popup = document.querySelector('.popup_is-opened');

    if (evt.key === 'Escape') {
        closeModal(popup);
    } // закрытие модалки по эскейп с проверкой, что это точно открытая модалка
}

openModal(profileEditBtn, popupEdit, closeModal);
openModal(profileAddBtn, popupNewCard, closeModal);


// Редактирование имени и рода занятий 

// Находим форму в DOM
const formElement = document.querySelector('[name="edit-profile"]');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('input[name="name"]');
const jobInput = formElement.querySelector('input[name="description"]');

// выводим в поля инпутов уже указанные значения
nameInput.value = content.querySelector('.profile__title').textContent;
jobInput.value = content.querySelector('.profile__description').textContent;

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    const name = nameInput.value;
    const job = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    const profileTitle = content.querySelector('.profile__title');
    const profileDescription = content.querySelector('.profile__description');
    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = name;
    profileDescription.textContent = job;
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 

// Добавление новой карточки

const formPlaceElement = document.querySelector('[name="new-place"]');
const placeNameInput = formPlaceElement.querySelector('input[name="place-name"]');
const placeImageInput = formPlaceElement.querySelector('input[name="link"]');

function addNewCard(evt) {

    const placeName = placeNameInput.value;
    const placeLink = placeImageInput.value;

    const newData = {
        name: placeName,
        link: placeLink
    };

    initialCards.unshift(newData);

    const createdCard = createCard(newData, deleteCard);
    placesList.prepend(createdCard);
    
    placeNameInput.value = '';
    placeImageInput.value = '';

    closeModal(popupNewCard);
}

formPlaceElement.addEventListener('submit', function(evt) {
    evt.preventDefault();
    addNewCard(evt);
});

//Ставим и снимаем лайк

function pressLike(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}

//функция добавления картинки и подписи в попап

function imagePopup(initialCards) {
    const popupImage = popupImageTemplate.querySelector('.popup__image');
    const popupCaption = popupImageTemplate.querySelector('.popup__caption');

    popupImage.src = initialCards.link;
    popupImage.alt = initialCards.name;
    
    popupCaption.textContent = initialCards.name;
}