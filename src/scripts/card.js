// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция удаления карточки
const deleteCard = (elem) => {
    elem.target.closest('.card').remove();
};

// Функция добавления лайка карточки
const likeCard = (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
};

// Функция создания карточки
const createCard = (name = '', link = '', deleteCardCallback = deleteCard, likeCardCallback = likeCard, openImagePopupCallback) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');

    cardImage.src = link;
    cardImage.alt = name;
    cardElement.querySelector('.card__title').textContent = name;

    cardLikeButton.addEventListener('click', likeCard);
    cardDeleteButton.addEventListener('click', deleteCardCallback);
    cardImage.addEventListener('click', () => {
        openImagePopupCallback(name, link, name);
    });

    return cardElement;
};

// Функция добавления карточек в контейнер
const renderCardsList = (container, card, likeCard, deleteCard, openImagePopup, append = true) => {
    const newCard = createCard(card.name, card.link, deleteCard, likeCard, openImagePopup);
    append ? container.append(newCard) : container.prepend(newCard);
};

module.exports = { createCard, likeCard, deleteCard, renderCardsList };