let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let submitButton = document.querySelector('.popup__button-submit');
let closeButton = document.querySelector('.popup__button-close');

let userName = popup.getElementById('username');
let aboutUser = popup.getElementById('aboutuser');

function openPopup() {
  popup.classList.add('.popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened'); // убрать класс "popup_opened"
}

function submitPopup(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы.
  userName.textContent = userName.value; //вставить новые значения в свойства value.
  aboutUser.textContent = aboutUser.value; //вставить новые значения в свойства value.  
  closePopup();
}


editButton.addEventListener('click', openPopup);
submitButton.addEventListener('submit', submitPopup);
closeButton.addEventListener('click', closePopup);