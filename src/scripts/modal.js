// Функция открытия модального окна
const openModal = (elem) => {
    elem.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalOnEscape);
};

// Функция закрытия модального окна
const closeModal = (elem) => {
    elem.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalOnEscape);
};

// Функция закрытия модального окна по нажатию на Esc
const closeModalOnEscape = (evt) => {
    if (evt.key === 'Escape') {
        const currentPopup = document.querySelector('.popup_is-opened');
        closeModal(currentPopup);
    }
};

export { openModal, closeModal };