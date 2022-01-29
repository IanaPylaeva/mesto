const editPopup = document.getElementById('editpopup');
const addpopup = document.getElementById('addpopup');
const picturePopup = document.getElementById('picturepopup');

const popupContainer = document.getElementById('changepopup');
const popupPlaceContainer = document.getElementById('placepopup');
const zoomPicture = document.getElementById('zoompopup');
const popupCaption = document.getElementById('popupcaption');

const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const editCloseButton = document.getElementById('editclosebutton');
const placeCloseButton = document.getElementById('placeclosebutton');
const zoomCloseButton = document.getElementById('zoomclosebutton');

const userName = document.querySelector('.profile__title');
const aboutUser = document.querySelector('.profile__subtitle');

const inputName = document.getElementById('username');
const inputAbout = document.getElementById('aboutuser');

const inputPlaceName = document.getElementById('placename');
const inputPlaceLink = document.getElementById('placelink');

const elementTemplate = document.querySelector('#element').content;//взяли контент и переложили его в переменную
const elements = document.querySelector('.elements');


//замена 6 карточек из "коробки" при загрузке страницы.

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function render() {
  initialCards.forEach(renderItem); //рендерим разметку (отдельно функция, чтобы переиспользовать).
};

function renderItem(card) {
const cardElement = elementTemplate.querySelector('.element').cloneNode(true);// клонируем содержимое тега template
cardElement.querySelector('.element__title').textContent = card.name;
cardElement.querySelector('.element__mask-group').src = card.link;
cardElement.querySelector('.element__mask-group').alt = card.name;
elements.append(cardElement);//присоединить элемент template к elements в html
addListeners(cardElement);
};

render();

function openPopup(el) {
  el.classList.add('popup_opened');
};
function closePopup(el) {  
  el.classList.remove('popup_opened'); // убрать класс "popup_opened".
};

function addListeners(el) {
  el.querySelector('.element__delete').addEventListener('click', deleteElement);
  el.querySelector('.element__like').addEventListener('click', likeElement);
  el.querySelector('.element__mask-group').addEventListener('click', openZoomPopup);
};

//Pop-up форма редактирования профайла.

function openEditPopup() {
  inputName.value = userName.textContent; //взять текст для input из profile.
  inputAbout.value = aboutUser.textContent; //взять текст для input из profile.
  openPopup(editPopup);
};

function closeEditPopup() {
  closePopup(editPopup);
};

function submitPopup(event) {
  event.preventDefault(); // отмена стандартной отправки формы.
  userName.textContent = inputName.value; //вставить новые значения в свойства value.
  aboutUser.textContent = inputAbout.value; //вставить новые значения в свойства value.
  closeEditPopup();
};

editButton.addEventListener('click', openEditPopup);
editCloseButton.addEventListener('click', closeEditPopup);
popupContainer.addEventListener('submit', submitPopup);


//Pop-up форма добавления карточек.

function openAddPopup() {
  openPopup(addpopup);
};

function closeAddPopup() {
  closePopup(addpopup);
};

function addCardPopup(event) {
  event.preventDefault(); // отмена стандартной отправки формы.
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);// клонируем содержимое тега template.
  cardElement.querySelector('.element__title').textContent = inputPlaceName.value;
  cardElement.querySelector('.element__mask-group').src = inputPlaceLink.value;
  cardElement.querySelector('.element__mask-group').alt = inputPlaceName.value;
  elements.prepend(cardElement);//присоединить элемент template к началу elements в html.
  addListeners(cardElement);
  closeAddPopup();
};

addButton.addEventListener('click', openAddPopup);
placeCloseButton.addEventListener('click', closeAddPopup);
popupPlaceContainer.addEventListener('submit', addCardPopup);


//Удаление карточки Element при нажатии корзины.

function deleteElement(event) {
  event.target.closest('.element').remove();
};


//Лайки.

function likeElement(event) {
  event.target.closest('.element__like').classList.toggle('element__like_active');
};


//Zoom картинки pop-up.

function openZoomPopup(event) {
  openPopup(picturePopup);
  zoomPicture.src = event.target.src;
  zoomPicture.alt = event.target.alt;
  popupCaption.textContent = event.target.alt;
};

function closeZoomPopup() {
  closePopup(picturePopup);
};

zoomCloseButton.addEventListener('click', closeZoomPopup);