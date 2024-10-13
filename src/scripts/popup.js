// Функция открытия модального окна
const openPopup = (elem) => {
    elem.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupOnEscape);
};

// Функция закрытия модального окна
const closePopup = (elem) => {
    elem.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupOnEscape);
};

// Функция закрытия модального окна по нажатию на Esc
const closePopupOnEscape = (evt) => {
    if (evt.key === 'Escape') {
        const currentPopup = document.querySelector('.popup_is-opened');
        closePopup(currentPopup);
    }
};

// Функция закрытия модального окна по нажатию на фон
const closePopupOnOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    }
};

module.exports = { openPopup, closePopup, closePopupOnOverlay };