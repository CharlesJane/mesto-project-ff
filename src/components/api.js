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

// Универсальная функция проверки ответа

// Разобраться, как вынести в аргументы общие опции

function request(endpoint, options) {
    const fullUrl = SERVER_URL + '/' + endpoint;

    return fetch(fullUrl, options).then(handleResponse);
  }

// Получение данных профиля
const getProfile = () => {
  return request(`users/me`, {
    method: "GET",
    headers: {
      authorization: TOKEN,
    },
  })
};

// Получение карточек
const getCards = () => {
  return request(`cards`, {
    method: "GET",
    headers: {
      authorization: TOKEN,
    },
  })
};

// Обновление профиля
const updateProfile = (name, about) => {
  return request(`users/me`, {
    method: "PATCH",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, about }),
  })
};

// Обновление аватарки
const updateAvatar = (avatarUrl) => {
  return request(`users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  })
};

// Добавление новой карточки
const addCard = (name, link) => {
  return request(`cards`, {
    method: "POST",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, link }),
  })
};

// Удаление карточки
const deleteCardFromServer = (cardId) => {
  return request(`cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: TOKEN,
    },
  })
};

// Добавление лайка
const addLike = (cardId) => {
  return request(`cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: TOKEN,
    },
  })
};

// Удаление лайка
const removeLike = (cardId) => {
  return request(`cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: TOKEN,
    },
  })
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
