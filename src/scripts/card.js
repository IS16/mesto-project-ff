// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция удаления карточки
const deleteCard = (elem) => {
    elem.remove();
};

// Функция добавления лайка карточки
const likeCard = (elem) => {
    elem.classList.toggle('card__like-button_is-active');
};

// Функция создания карточки
const createCard = (card, deleteCardCallback = deleteCard, likeCardCallback = likeCard, openImagePopupCallback) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');

    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;

    cardLikeButton.addEventListener('click', (evt) => likeCardCallback(evt.target));
    cardDeleteButton.addEventListener('click', (evt) => deleteCardCallback(evt.target.closest('.card')));
    cardImage.addEventListener('click', () => {
        openImagePopupCallback(card.name, card.link, card.name);
    });

    return cardElement;
};

export { createCard, likeCard, deleteCard };