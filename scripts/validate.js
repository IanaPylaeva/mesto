/* ВАЛИДАЦИЯ */

const formSubmit = (event, form) => {
  event.preventDefault();
};

const setInputValid = (inputErrorClass, errorClass, input) => {
  errorClass.textContent = '';
  input.classList.remove(inputErrorClass);
};

const setInputInvalid = (inputErrorClass, errorClass, input) => {
  errorClass.textContent = input.validationMessage;
  input.classList.add(inputErrorClass);
};

const checkInputValidity = ({ inputErrorClass }, form, input) => {
  const errorClass = form.querySelector(`.${input.id}-error`);

  if (input.validity.valid) {
    setInputValid(inputErrorClass, errorClass, input);
  } else {
    setInputInvalid(inputErrorClass, errorClass, input);
  };
};

const disableButton = (inactiveButtonClass, button) => {
  button.setAttribute('disabled', '');
  button.classList.add(inactiveButtonClass);
};

const checkButtonValidity = ({ inactiveButtonClass }, form, button) => {
  if (form.checkValidity()) {
    button.removeAttribute('disabled');
    button.classList.remove(inactiveButtonClass);
  } else {
    disableButton(inactiveButtonClass, button);
  };
};

function enableValidation({ formSelector, inputSelector, submitButtonSelector, ...rest }) {
  const forms = document.querySelectorAll(formSelector);

  forms.forEach(form => {
    form.addEventListener('submit', (event) => formSubmit(event, form));
    const inputs = form.querySelectorAll(inputSelector);
    const button = form.querySelector(submitButtonSelector);

    form.addEventListener('reset', () => {
      disableButton(rest, button);
    });

    checkButtonValidity(rest, form, button);

    inputs.forEach(input => {
      input.addEventListener('input', (event) => {
        checkInputValidity(rest, form, input);
        checkButtonValidity(rest, form, button);
      });
    });
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__text', //форма инпута
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__text_type_error', //подчеркивание красным
  errorClass: 'popup__text-error' //красный текст ошибки span
});