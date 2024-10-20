import { openModal,closeModal } from './modal.js';
import { deleteCard, addLike, removeLike } from './api.js';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const popupConfirm = document.querySelector('.popup_type_confirm');

// Функция вызова модального окна подтверждения удаления карточки
const deleteCardInit = (elem) => {
    const cardId = elem.dataset.cardId;
    openModal(popupConfirm);
    popupConfirm.dataset.cardId = cardId;
};

// Функция удаления карточки
const confirmDeleteCard = (elem, renderLoading) => {
    const cardId = elem.dataset.cardId;
    const buttonElement = elem.querySelector('.popup__button');
    renderLoading(true, buttonElement, 'delete');
    
    deleteCard(cardId)
        .then((res) => {
            const card = document.querySelector(`[data-card-id="${cardId}"]`);
            card.remove();
            closeModal(popupConfirm);
        })
        .catch((err) => console.log(err))
        .finally(() => renderLoading(false, buttonElement, 'delete'));
};

// Функция добавления лайка карточки
const likeCard = (elem) => {
    const cardId = elem.dataset.cardId;
    const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
    const cardLikeCount = cardElement.querySelector('.card__like-count');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

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
const createCard = (userId, card, deleteCardCallback = deleteCard, likeCardCallback = likeCard, openImagePopupCallback) => {
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

    cardLikeButton.addEventListener('click', (evt) => likeCardCallback(evt.target.closest('.card')));
    cardImage.addEventListener('click', () => {
        openImagePopupCallback(card.name, card.link, card.name);
    });

    return cardElement;
};

export { createCard, likeCard, deleteCardInit, confirmDeleteCard };