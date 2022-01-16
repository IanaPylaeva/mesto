let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__button-close');
let userName = document.querySelector('.profile__title');
let aboutUser = document.querySelector('.profile__subtitle');
let inputName = document.getElementById('username');
let inputAbout = document.getElementById('aboutuser');
let popupContainer = document.querySelector('.popup__container');

function openPopup() {
  popup.classList.add('popup_opened');
  inputName.value = userName.textContent; //взять текст для input из profile.
  inputAbout.value = aboutUser.textContent; //взять текст для input из profile.
}

function closePopup() {
  popup.classList.remove('popup_opened'); // убрать класс "popup_opened"
}

function submitPopup(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы.
  userName.textContent = inputName.value; //вставить новые значения в свойства value.
  aboutUser.textContent = inputAbout.value; //вставить новые значения в свойства value.
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popupContainer.addEventListener('submit', submitPopup);