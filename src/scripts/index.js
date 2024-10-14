import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, likeCard, deleteCard } from './card.js';
import { openModal, closeModal } from './modal.js';

// DOM узлы
const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Элементы модального окна редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditForm = document.forms['edit-profile'];

// Элементы модального окна добавления новой карточки
const profileAddButton = document.querySelector('.profile__add-button');
const profileAddPopup = document.querySelector('.popup_type_new-card');
const profileAddForm = document.forms['new-place'];

// Элементы модального окна с изображением
const imagePopup = document.querySelector('.popup_type_image');
const imagePopup_caption = imagePopup.querySelector('.popup__caption');
const imagePopup_image = imagePopup.querySelector('.popup__image');

// Функция добавления карточек в контейнер
const renderCardsList = (container, card, likeCard, deleteCard, openImagePopup, append = true) => {
    const newCard = createCard(card, deleteCard, likeCard, openImagePopup);
    append ? container.append(newCard) : container.prepend(newCard);
};

// Функция заполнения и открытия модального окна с изображением
const openImageModal = (title, link, alt) => {
    imagePopup_caption.textContent = title;
    imagePopup_image.src = link;
    imagePopup_image.alt = alt;
    openModal(imagePopup);
};

// Функция-обработчик формы изменения данных профиля
const handleProfileEditFormSubmit = (evt) => {
    evt.preventDefault();

    profileTitle.textContent = profileEditForm.elements.name.value;
    profileDescription.textContent = profileEditForm.elements.description.value;

    closeModal(profileEditPopup);
};

// Функция-обработчик формы добавления новой карточки
const handleProfileAddFormSubmit = (evt) => {
    evt.preventDefault();

    const card = {
        name: profileAddForm.elements['place-name'].value,
        link: profileAddForm.elements.link.value
    };

    renderCardsList(placesList, card, likeCard, deleteCard, openImageModal, false);
    closeModal(profileAddPopup);
};

// Добавление событий закрытия всех существующих модальных окон
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => closeModal(popup));
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target === evt.currentTarget) {
            closeModal(popup);
        }
    });
});

// Слушатель события клика на кнопку редактирования профиля
profileEditButton.addEventListener('click', () => {
    profileEditForm.elements.name.value = profileTitle.textContent;
    profileEditForm.elements.description.value = profileDescription.textContent;

    openModal(profileEditPopup);
});

// Слушатель события отправки формы модального окна редактирования профиля
profileEditForm.addEventListener('submit', handleProfileEditFormSubmit);

// Слушатель события клика на кнопку добавления новой карточки
profileAddButton.addEventListener('click', () => {
    profileAddForm.reset();
    openModal(profileAddPopup);
});

// Слушатель события отправки формы модального окна добавления новой карточки
profileAddForm.addEventListener('submit', handleProfileAddFormSubmit);

// Вывести карточки на страницу
initialCards.forEach(card => renderCardsList(placesList, card, likeCard, deleteCard, openImageModal));