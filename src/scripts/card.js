import { addLike, removeLike } from './api.js';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция добавления лайка карточки
const likeCard = (cardId, cardLikeButton, cardLikeCount) => {
    if (cardLikeButton.classList.contains('card__like-button_is-active')) {
        removeLike(cardId)
            .then((res) => {
                cardLikeCount.textContent = res.likes.length;
                cardLikeButton.classList.remove('card__like-button_is-active');
            })
            .catch((err) => console.log(err));
    } else {
        addLike(cardId)
            .then((res) => {
                cardLikeCount.textContent = res.likes.length;
                cardLikeButton.classList.add('card__like-button_is-active');
            })
            .catch((err) => console.log(err));
    }
};

// Функция создания карточки
const createCard = (userId, card, deleteCardCallback, likeCardCallback = likeCard, openImagePopupCallback) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.dataset.cardId = card._id;
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardLikeCount = cardElement.querySelector('.card__like-count');
    const cardImage = cardElement.querySelector('.card__image');

    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardLikeCount.textContent = card.likes.length;
    cardElement.querySelector('.card__title').textContent = card.name;

    const isLiked = card.likes.some((like) => like._id === userId);
    if (isLiked) {
        cardLikeButton.classList.add('card__like-button_is-active');
    }

    if (card.owner._id === userId) {
        cardDeleteButton.addEventListener('click', (evt) => deleteCardCallback(evt.target.closest('.card')));
    } else {
        cardDeleteButton.remove();
    }

    cardLikeButton.addEventListener('click', (evt) => likeCardCallback(card._id, cardLikeButton, cardLikeCount));
    cardImage.addEventListener('click', () => {
        openImagePopupCallback(card.name, card.link, card.name);
    });

    return cardElement;
};

export { createCard, likeCard };