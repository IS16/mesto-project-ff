const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-mag-4',
    headers: {
        authorization: 'a1aae14d-fc61-46cd-bca5-f7f03c8dc03f',
        'Content-Type': 'application/json'
    }
};

// Обработка ответа сервера
const getResponseData = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

// Запрос данных пользователя
const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {method: 'GET', headers: config.headers})
        .then((res) => getResponseData(res));
};

// Получение карточек
const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {method: 'GET', headers: config.headers})
        .then((res) => getResponseData(res));
};

const getInitialInfo = () => {
    return Promise.all([getUserInfo(), getCards()]);
};

// Обновление пользователя
const updateProfile = (userInfo) => {
    return fetch(`${config.baseUrl}/users/me`, {method: 'PATCH', headers: config.headers, body: JSON.stringify(userInfo)})
        .then((res) => getResponseData(res));
};

// Обновление аватара пользователя
const updateProfileAvatar = (avatarInfo) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {method: 'PATCH', headers: config.headers, body: JSON.stringify(avatarInfo)})
        .then((res) => getResponseData(res));
};

// Добавление новой карточки
const addCard = (cardInfo) => {
    return fetch(`${config.baseUrl}/cards`, {method: 'POST', headers: config.headers, body: JSON.stringify(cardInfo)})
        .then((res) => getResponseData(res));
};

// Удаление карточки
const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {method: 'DELETE', headers: config.headers})
        .then((res) => getResponseData(res));
};

// Добавление лайка карточке
const addLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {method: 'PUT', headers: config.headers})
        .then((res) => getResponseData(res));
};

// Удаление лайка у карточки
const removeLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {method: 'DELETE', headers: config.headers})
        .then((res) => getResponseData(res));
};

export { getUserInfo, getCards, getInitialInfo, updateProfile, updateProfileAvatar, addCard, deleteCard, addLike, removeLike };