import '../pages/index.css';
import { createCard, likeCard, deleteCardInit as deleteCard, confirmDeleteCard } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getInitialInfo, updateProfile, addCard, updateProfileAvatar } from './api.js';

// DOM узлы
const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImageContainer = document.querySelector('.profile__image-container');
const profileImage = document.querySelector('.profile__image');

// Элементы модального окна редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditForm = document.forms['edit-profile'];

// Элементы модального окна добавления новой карточки
const profileAddButton = document.querySelector('.profile__add-button');
const profileAddPopup = document.querySelector('.popup_type_new-card');
const profileAddForm = document.forms['new-place'];

const confirmPopup = document.querySelector('.popup_type_confirm');
const confirmPopupButton = confirmPopup.querySelector('.popup__button');

// Элементы модального окна с изображением
const imagePopup = document.querySelector('.popup_type_image');
const imagePopup_caption = imagePopup.querySelector('.popup__caption');
const imagePopup_image = imagePopup.querySelector('.popup__image');

// Элементы модального окна обновления аватара пользователя
const avatarPopup = document.querySelector('.popup_type_new-avatar');
const avatarUpdateForm = document.forms['new-avatar'];

// Конфиг валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

let userId = null;

// Обновление информации профиля
const fillProfile = (userInfo) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
};

// Функция UX для отображения состояния
const renderLoading = (isLoading, buttonElement, operation) => {
    const states = {
        save: {
            progress: 'Сохранение...',
            done: 'Сохранить'
        },
        delete: {
            progress: 'Удаление...',
            done: 'Да'
        }
    };

    if (isLoading) {
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
        buttonElement.disabled = true;
        buttonElement.textContent = states[operation].progress;
    } else {
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
        buttonElement.disabled = false;
        buttonElement.textContent = states[operation].done;
    }
};

// Функция добавления карточек в контейнер
const renderCardsList = (container, card, likeCard, deleteCard, openImagePopup, append = true) => {
    const newCard = createCard(userId, card, deleteCard, likeCard, openImagePopup);
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

    const submitButton = profileEditForm.querySelector('.popup__button');

    renderLoading(true, submitButton, 'save');
    updateProfile({
        name: profileEditForm.elements.name.value,
        about: profileEditForm.elements.description.value
    })
        .then((updatedProfile) => {
            fillProfile(updatedProfile);
            closeModal(profileEditPopup);
        })
        .catch((err) => console.log(err))
        .finally(() => renderLoading(false, submitButton, 'save'));
};

// Функция-обработчик формы добавления новой карточки
const handleProfileAddFormSubmit = (evt) => {
    evt.preventDefault();

    const submitButton = profileAddForm.querySelector('.popup__button');

    renderLoading(true, submitButton, 'save');
    addCard({
        name: profileAddForm.elements['place-name'].value,
        link: profileAddForm.elements.link.value
    })
        .then((createdCard) => {
            renderCardsList(placesList, createdCard, likeCard, deleteCard, openImageModal, false);
            closeModal(profileAddPopup);
        })
        .catch((err) => console.log(err))
        .finally(() => renderLoading(false, submitButton, 'save'));
};

// Функция-обработчик формы обновления профиля пользователя
const handleAvatarUpdateFormSubmit = (evt) => {
    evt.preventDefault();

    const submitButton = avatarUpdateForm.querySelector('.popup__button');

    renderLoading(true, submitButton, 'save');
    updateProfileAvatar({
        avatar: avatarUpdateForm.elements.link.value
    })
        .then((updatedProfile) => {
            fillProfile(updatedProfile);
            closeModal(avatarPopup);
        })
        .catch((err) => console.log(err))
        .finally(() => renderLoading(false, submitButton, 'save'));
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
    clearValidation(profileEditForm, validationConfig);

    profileEditForm.elements.name.value = profileTitle.textContent;
    profileEditForm.elements.description.value = profileDescription.textContent;

    openModal(profileEditPopup);
});

// Слушатель события отправки формы модального окна редактирования профиля
profileEditForm.addEventListener('submit', handleProfileEditFormSubmit);

// Слушатель события клика на кнопку добавления новой карточки
profileAddButton.addEventListener('click', () => {
    clearValidation(profileAddForm, validationConfig);
    profileAddForm.reset();
    openModal(profileAddPopup);
});

// Слушатель события отправки формы модального окна добавления новой карточки
profileAddForm.addEventListener('submit', handleProfileAddFormSubmit);

// Слушатель события подтвеждения удаления карточки
confirmPopupButton.addEventListener('click', (evt) => confirmDeleteCard(evt.target.closest('.popup'), renderLoading));

// Слушатель события открытия формы обновления аватара пользователя
profileImageContainer.addEventListener('click', () => {
    clearValidation(avatarUpdateForm, validationConfig);
    avatarUpdateForm.reset();
    openModal(avatarPopup);
});

// Слушатель события отправки формы модального окна обновления аватара пользователя
avatarUpdateForm.addEventListener('submit', handleAvatarUpdateFormSubmit);

// Загрузка профиля пользователя и списка карточек
getInitialInfo()
    .then((res) => {
        const userInfo = res[0];
        userId = userInfo._id;
        fillProfile(userInfo);

        const initialCards = res[1];
        initialCards.forEach(card => renderCardsList(placesList, card, likeCard, deleteCard, openImageModal));
    })
    .catch((err) => console.log(err));

// Инициализация валидации форм
enableValidation(validationConfig);