import { 
  initialCards,
  validationConfig,
  buttonAdd,
  buttonEdit,
  inputName,
  inputAbout,
  popupAddCardForm,
  popupEditCardForm
} from '../utils/constants.js';

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';

/* Проект 7 Валидация FormValidator */

const editProfileValidator = new FormValidator(validationConfig, popupEditCardForm);
const addCardValidator = new FormValidator(validationConfig, popupAddCardForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();


/* UserInfo */

const profile = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle'
});


/* PopupWithImage - попап с увеличенной картинкой */ 

const popupZoom = new PopupWithImage('.popup_type_picture');

function handlePopupZoom(title, link) {
  popupZoom.open({ name: title, link: link });
}


/* Card */

function createCard(item) {
  const card = new Card(item, '#elementtemplate', handlePopupZoom);
  const addedCard = card.generateCard();
  return addedCard;
};


/* Section */

const cardList = new Section(
  {
  items: initialCards,
  renderer: (item) => {
    const addedCard = createCard(item); 
    cardList.addItem(addedCard);
  }
},
'.elements'
);


/* Форма добавления новой карточки ADD */

const popupAddForm = new PopupWithForm(
  {
    popupSelector: '.popup_type_card-add', 
    handleSubmitForm: (inputValues) => {
      const newCard = createCard(inputValues);
      cardList.addNewItem(newCard);
    }
  }
);


/* Форма редактирования профиля EDIT */

const popupEditForm = new PopupWithForm(
  {
    popupSelector: '.popup_type_profile', 
    handleSubmitForm: (inputValues) => {
      profile.setUserInfo(inputValues);
    }
  }
);

// взять текст для input из profile.
const setProfileInputs = (info) => {
  inputName.value = info.title;
  inputAbout.value = info.subtitle;
};


/* Слушатели */ 

buttonEdit.addEventListener('click', () => {
  editProfileValidator.resetErrors();
  const currentUserInfo = profile.getUserInfo();
  setProfileInputs(currentUserInfo);
  popupEditForm.open();
});

buttonAdd.addEventListener('click', () => {
  popupAddForm.open();
  addCardValidator.resetErrors();
});


popupZoom.setEventsListeners();
popupAddForm.setEventListeners();
popupEditForm.setEventListeners();

cardList.renderItems();