import { initialCards } from './cards.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { pictureZoom, popupCaption, openPopup, popupPicture, closePopup } from './Utils.js';

const popupEditProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_card-add');

const popupAddCardForm = document.querySelector('.popup__addform');
const popupEditCardForm = document.querySelector('.popup__editform');

const popupContainer = document.querySelector('.popup__container_type_change');
const popupPlaceContainer = document.querySelector('.popup__container_type_place');

const buttonAdd = document.querySelector('.profile__add-button');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonCloseEdit = document.querySelector('.popup__button-close_type_edit');
const buttonClosePlace = document.querySelector('.popup__button-close_type_place');
const buttonCloseZoom = document.querySelector('.popup__button-close_type_zoom');

const userName = document.querySelector('.profile__title');
const aboutUser = document.querySelector('.profile__subtitle');

const inputName = document.querySelector('.popup__text_type_name');
const inputAbout = document.querySelector('.popup__text_type_about');

const inputPlaceName = document.querySelector('.popup__text_type_place');
const inputPlaceLink = document.querySelector('.popup__text_type_link');

const elements = document.querySelector('.elements');


/* Проект 7 FormValidator */

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text', //форма инпута
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__text_type_error', //подчеркивание красным
  errorClass: 'popup__text-error' //красный текст ошибки span
}

const editProfileValidator = new FormValidator(validationConfig, popupEditCardForm);
const addCardValidator = new FormValidator(validationConfig, popupAddCardForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();


/* Проект 7 Card */

function generateCard(data) {
  const card = new Card(data, '#elementtemplate', openZoomPopup);
  return card.createCard();
}

function render() {
    initialCards.forEach((data) => {elements.append(generateCard(data))
  });

};

render();

//Pop-up форма редактирования профайла.

function openEditPopup() {
  inputName.value = userName.textContent; //взять текст для input из profile.
  inputAbout.value = aboutUser.textContent; //взять текст для input из profile.
  openPopup(popupEditProfile);
  editProfileValidator.resetErrors();
};

function closeEditPopup() {
   closePopup(popupEditProfile); 
};

function submitEditPopup(event) {
  event.preventDefault(); // отмена стандартной отправки формы.
  userName.textContent = inputName.value; //вставить новые значения в свойства value.
  aboutUser.textContent = inputAbout.value; //вставить новые значения в свойства value.
  closeEditPopup();
};

buttonEdit.addEventListener('click', openEditPopup);
buttonCloseEdit.addEventListener('click', closeEditPopup);
popupContainer.addEventListener('submit', submitEditPopup);

//Pop-up форма добавления карточек.

function openAddPopup() {
  openPopup(popupAddCard);
  addCardValidator.resetErrors();  
};

function closeAddPopup() {
  closePopup(popupAddCard);
};

function addCardPopup(event) {
  event.preventDefault(); // отмена стандартной отправки формы.
  elements.prepend(generateCard({name: inputPlaceName.value, link: inputPlaceLink.value}));
  closeAddPopup();
};

popupPlaceContainer.addEventListener('submit', addCardPopup);
buttonAdd.addEventListener('click', openAddPopup);
buttonClosePlace.addEventListener('click', closeAddPopup);

//Zoom картинки pop-up.

function openZoomPopup(event) {  
  pictureZoom.src = event.target.src;
  pictureZoom.alt = event.target.alt;
  popupCaption.textContent = event.target.alt;
  openPopup(popupPicture);
};

function closeZoomPopup() {
  closePopup(popupPicture);
};

buttonCloseZoom.addEventListener('click', closeZoomPopup);