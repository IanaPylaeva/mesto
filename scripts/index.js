const popupEditProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_card-add');
const popupPicture = document.querySelector('.popup_type_picture');

const popupContainer = document.querySelector('.popup__container_type_change');
const popupPlaceContainer = document.querySelector('.popup__container_type_place');
const pictureZoom = document.querySelector('.popup__zoom');
const popupCaption = document.querySelector('.popup__caption');

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

const elementTemplate = document.querySelector('#elementtemplate').content;//взяли контент и переложили его в переменную
const elements = document.querySelector('.elements');


//замена 6 карточек из "коробки" при загрузке страницы. Общие функции.

function createCard(card) {
const cardElement = elementTemplate.querySelector('.element').cloneNode(true);// клонируем содержимое тега template
cardElement.querySelector('.element__title').textContent = card.name;
const cardImage = cardElement.querySelector('.element__mask-group');
cardImage.src = card.link;
cardImage.alt = card.name;
addListeners(cardElement);
return cardElement;
};

function render() {
  initialCards.forEach((card) => {elements.append(createCard(card))
  });
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
  openPopup(popupEditProfile);
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
};

function closeAddPopup() {
  closePopup(popupAddCard);
};

function addCardPopup(event) {
  event.preventDefault(); // отмена стандартной отправки формы.
  elements.prepend(createCard({name: inputPlaceName.value, link: inputPlaceLink.value}));
  closeAddPopup();
};

popupPlaceContainer.addEventListener('submit', addCardPopup);
buttonAdd.addEventListener('click', openAddPopup);
buttonClosePlace.addEventListener('click', closeAddPopup);


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
  openPopup(popupPicture);
  pictureZoom.src = event.target.src;
  pictureZoom.alt = event.target.alt;
  popupCaption.textContent = event.target.alt;
};

function closeZoomPopup() {
  closePopup(popupPicture);
};

buttonCloseZoom.addEventListener('click', closeZoomPopup);