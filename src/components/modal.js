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

// закрытие модалки по эскейп 
function closeByEscape(evt) {
    const popup = document.querySelector('.popup_is-opened');

    if (evt.key === 'Escape') {
        closeModal(popup);
    } 
}

// export 

export { openModal, closeModal, closeByEscape};