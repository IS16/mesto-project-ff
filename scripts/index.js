// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
const addCard = (name = '', link = '', deleteCardCallback = deleteCard) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__title').textContent = name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCardCallback);

    return cardElement;
};

// @todo: Функция удаления карточки
const deleteCard = (elem) => {
    elem.target.closest('.card').remove();
};

// @todo: Вывести карточки на страницу
placesList.append(...initialCards.map(item => addCard(item.name, item.link, deleteCard)));