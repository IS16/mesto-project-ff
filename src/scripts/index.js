import '../pages/index.css';
import { initialCards } from './cards.js';
import { likeCard, deleteCard, renderCardsList } from './card.js';
import { openPopup, closePopup, closePopupOnOverlay } from './popup.js';

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

// Функция заполнения и открытия модального окна с изображением
const openImagePopup = (title = '', link = '', alt = '') => {
    imagePopup_caption.textContent = title;
    imagePopup_image.src = link;
    imagePopup_image.alt = alt;
    openPopup(imagePopup);
};

// Функция заполнения формы модального окна данными
const fillProfilePopupForm = (form, name = '', description = '') => {
    form.elements.name.value = name;
    form.elements.description.value = description;
};

// Функция заполнения данных профиля
const fillProfileInfo = (name = '', description = '') => {
    profileTitle.textContent = name;
    profileDescription.textContent = description;
};

// Функция-обработчик формы изменения данных профиля
const handleProfileEditFormSubmit = (evt) => {
    evt.preventDefault();
    fillProfileInfo(profileEditForm.elements.name.value, profileEditForm.elements.description.value);
    closePopup(profileEditPopup);
};

// Функция-обработчик формы добавления новой карточки
const handleProfileAddFormSubmit = (evt) => {
    evt.preventDefault();

    const card = {
        name: profileAddForm.elements['place-name'].value,
        link: profileAddForm.elements.link.value
    };

    renderCardsList(placesList, card, likeCard, deleteCard, openImagePopup, false);
    closePopup(profileAddPopup);
};

// Слушатель события клика на кнопку редактирования профиля
profileEditButton.addEventListener('click', () => {
    fillProfilePopupForm(
        profileEditForm,
        profileTitle.textContent,
        profileDescription.textContent
    );
    openPopup(profileEditPopup);
});

// Слушатель события клика на фон модального окна редактирования профиля
profileEditPopup.addEventListener('click', (evt) => {
    closePopupOnOverlay(evt);
});

// Слушатель события отправки формы модального окна редактирования профиля
profileEditForm.addEventListener('submit', handleProfileEditFormSubmit);

// Слушатель события клика на кнопку добавления новой карточки
profileAddButton.addEventListener('click', () => {
    profileAddForm.reset();
    openPopup(profileAddPopup);
});

// Слушатель события клика на фон модального окна добавления новой карточки
profileAddPopup.addEventListener('click', (evt) => {
    closePopupOnOverlay(evt);
});

// Слушатель события отправки формы модального окна добавления новой карточки
profileAddForm.addEventListener('submit', handleProfileAddFormSubmit);

// Слушатель события клика на фон модального окна с изображением
imagePopup.addEventListener('click', (evt) => {
    closePopupOnOverlay(evt);
});

// Слушатель события нажатия на кнопку закрытия модального окна
document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
        closePopup(evt.target.parentNode.parentNode);
    }
});

// Вывести карточки на страницу
initialCards.forEach(card => {
    renderCardsList(placesList, card, likeCard, deleteCard, openImagePopup);
});