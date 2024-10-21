// Инициализация валидаторов форм
const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(
            formElement,
            validationConfig.inputSelector,
            validationConfig.submitButtonSelector,
            validationConfig.inactiveButtonClass,
            validationConfig.inputErrorClass,
            validationConfig.errorClass
        );
    });
};

// Отображение сообщения об ошибке валидации
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

// Скрытие сообщения об ошибке валидации
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
};

// Проверка валидности пола ввода
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

// Установка слушателей на поля ввода
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    toggleButtonState(inputList, buttonElement, inactiveButtonClass);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
        
    });
};

// Проверка фалидности формы
const hasInvalidInput = (inputList) => {
    console.log(inputList);
    return inputList.some((inputElement) => !inputElement.validity.valid);
};

// Смена состояния кнопки в зависимости от валидности формы
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    console.log(buttonElement);
    if (hasInvalidInput(inputList)) {
        console.log('dsds');
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

// Очистка сообщений об ошибках валидации
const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
        inputElement.setCustomValidity('');
    });
};

export { enableValidation, clearValidation };