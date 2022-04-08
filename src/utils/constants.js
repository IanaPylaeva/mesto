export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text', //форма инпута
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__text_type_error', //подчеркивание красным
  errorClass: 'popup__text-error' //красный текст ошибки span
};

export const buttonAdd = document.querySelector('.profile__add-button');
export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAvatarEdit = document.querySelector('.profile__edit-avatar');

export const inputAbout = document.querySelector('.popup__text_type_about');
export const inputName = document.querySelector('.popup__text_type_name');

export const popupAddCardForm = document.querySelector('.popup__addform');
export const popupEditCardForm = document.querySelector('.popup__editform');
export const popupAvatarEditForm = document.querySelector('.popup__avatarform');