// Работа модальных окон
// Открытие модального окна
function openModal(aimedElement, popup) {

    popup.classList.add('popup_is-animated'); // добавляем класс для плавной анимации открытия/закрытия

    aimedElement.addEventListener('click', function() {
        popup.classList.add('popup_is-opened');

        document.addEventListener('keydown', closeByEscape); //вешаем слушатель только после открытия модалки, чтобы эскейп не срабатывал впустую на странице
        popup.addEventListener('click', closeByLayout);
    });
}

function closeByLayout(popup) {
    closeModal(popup); //слушатель клика и закрытие по лэйауту модалки
};

// Закрытие модального окна по кнопке
function closeModal(popup) {
    console.log(popup);
    popup.classList.remove('popup_is-opened');
    
    document.removeEventListener('keydown', closeByEscape); //удаляем слушатель, чтобы не отрабатывал вне модалки
}

// закрытие модалки по эскейп 
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        
        closeModal(popup);
    } 
}

// export 

export { openModal, closeModal, closeByEscape};