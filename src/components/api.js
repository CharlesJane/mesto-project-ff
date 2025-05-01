// Данные для работы с сервером - хранятся небезопасно
const SERVER_URL = "https://nomoreparties.co/v1/wff-cohort-37";
const TOKEN = "e5986798-633d-43df-97ea-3579551b9329";

// Функция обработчик запроса, если все ок - все ок)
const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Получение данных профиля
const getProfile = () => {
  return fetch(`${SERVER_URL}/users/me`, {
    method: "GET",
    headers: {
      authorization: TOKEN,
    },
  }).then(handleResponse);
};

// Получение карточек
const getCards = () => {
  return fetch(`${SERVER_URL}/cards`, {
    method: "GET",
    headers: {
      authorization: TOKEN,
    },
  }).then(handleResponse);
};

// Обновление профиля
const updateProfile = (name, about) => {
  return fetch(`${SERVER_URL}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, about }),
  }).then(handleResponse);
};

// Обновление аватарки
const updateAvatar = (avatarUrl) => {
  return fetch(`${SERVER_URL}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then(handleResponse);
};

// Добавление новой карточки
const addCard = (name, link) => {
  return fetch(`${SERVER_URL}/cards`, {
    method: "POST",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, link }),
  }).then(handleResponse);
};

// Удаление карточки
const deleteCardFromServer = (cardId) => {
  return fetch(`${SERVER_URL}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: TOKEN,
    },
  }).then(handleResponse);
};

// Добавление лайка
const addLike = (cardId) => {
  return fetch(`${SERVER_URL}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: TOKEN,
    },
  }).then(handleResponse);
};

// Удаление лайка
const removeLike = (cardId) => {
  return fetch(`${SERVER_URL}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: TOKEN,
    },
  }).then(handleResponse);
};

// Экспортируем все запросы в index.js
export {
  getProfile,
  getCards,
  updateProfile,
  updateAvatar,
  addCard,
  deleteCardFromServer,
  addLike,
  removeLike,
};
