const SERVER_URL = 'https://nomoreparties.co/v1/wff-cohort-37';
const TOKEN = 'e5986798-633d-43df-97ea-3579551b9329';

// Получение данных профиля
const getProfile = () => {
    return fetch(`${SERVER_URL}/users/me`, {
      method: 'GET',
      headers: {
        authorization: TOKEN
      }
    });
};
  
// Получение карточек
const getCards = () => {
    return fetch(`${SERVER_URL}/cards`, {
        method: 'GET',
        headers: {
            authorization: TOKEN
        }
    });
};

// Обновление профиля
const updateProfile = (name, about) => {
    return fetch(`${SERVER_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, about })
    });
};

// Добавление новой карточки
const addCard = (name, link) => {
    return fetch(`${SERVER_URL}/cards`, {
        method: 'POST',
        headers: {
            authorization: TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, link })
    });
};

// Удаление карточки
const deleteCardFromServer = (cardId) => {
    return fetch(`${SERVER_URL}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: TOKEN
        }
    });
};

// Добавление лайка
const addLike = (cardId) => {
    return fetch(`${SERVER_URL}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
            authorization: TOKEN
        }
    });
};

// Удаление лайка
const removeLike = (cardId) => {
    return fetch(`${SERVER_URL}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
            authorization: TOKEN
        }
    });
};

export { getProfile, getCards, updateProfile, addCard, deleteCardFromServer, addLike, removeLike };