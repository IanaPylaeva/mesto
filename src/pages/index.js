import './index.css'; // импорт главного файла стилей
import { 
  /* initialCards, */
  validationConfig,
  buttonAdd,
  buttonEdit,
  buttonAvatarEdit,
  inputName,
  inputAbout,
  popupAddCardForm,
  popupEditCardForm,
  popupAvatarEditForm
} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';

let currentUser = '';


/* Api */

const api = new Api({
  serverUrl: 'https://mesto.nomoreparties.co/v1/cohort-39', //Адрес сервера проекта Mesto
  headers: {
    authorization: 'a8870c90-962a-4e80-9995-2681c6a34a53', //Мой токен
    'Content-Type': 'application/json'
  }
})


/* Получение данных пользователя */

api.getUserInfo()
  .then((res) => {
    currentUser = res._id; 
    profile.setUserInfo(res); 
    profile.setUserInfo(res);
  })
  .catch((err) => {
    console.error(err);
  });


/* Получение карточек */

api.getInitialCards()
.then((res) => {
  cardList.renderItems(res)
})
.catch((err) => {
  console.error(err);
});
  

/* Проект 7 Валидация FormValidator */

const editProfileValidator = new FormValidator(validationConfig, popupEditCardForm);
const addCardValidator = new FormValidator(validationConfig, popupAddCardForm);
const avatarEditValidator = new FormValidator(validationConfig, popupAvatarEditForm)

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
avatarEditValidator.enableValidation();


/* UserInfo */

const profile = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
});


// взять текст для input из profile.

const setProfileInputs = (info) => {
  inputName.value = info.title;
  inputAbout.value = info.subtitle;
};


/* Card */

const createCard = (item) => {
  const card = new Card({
    item: { ...item, currentUser },
    handlePopupZoom,
    handleDeleteCard: (cardId) => {
      popupAskerDeleteForm.open();
      popupAskerDeleteForm.setSubmitAction(() => {
        api.deleteCard(cardId)
          .then(() => {
            card.deleteCard();
          })
          .catch((err) => {
            console.error(err);
          })
      })
    }
  },
    api,
    '#elementtemplate');

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


/* PopupWithConfirmation */

const popupAskerDeleteForm = new PopupWithConfirmation('.popup_type_deleteask');
popupAskerDeleteForm.setEventsListeners();


/* PopupWithImage - попап с увеличенной картинкой */ 

const popupZoom = new PopupWithImage('.popup_type_picture');

function handlePopupZoom(title, link) {
  popupZoom.open({ name: title, link: link });
}


/* Форма добавления новой карточки ADD */

const popupAddForm = new PopupWithForm(
  {
    popupSelector: '.popup_type_card-add', 
    handleSubmitForm: (data) => {
      api.postCard(data)
        .then((res) => {
          const newCard = createCard(res, currentUser);
          cardList.addNewItem(newCard);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          popupAddForm.renderLoading(false);
        })
    }
  }
);


/* Форма редактирования профиля EDIT */

const popupEditForm = new PopupWithForm(
  {
    popupSelector: '.popup_type_profile', 
    handleSubmitForm: (data) => {
      /*popupEditForm.renderLoading(true);*/
      api.patchUserInfo(data)
        .then((res) => {
          profile.setUserInfo(res);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          popupEditForm.renderLoading(false);
        })     
    }
  }
);


/* Форма редактирования профиля Аватара */

const popupAvatarForm = new PopupWithForm(
  {
    popupSelector: '.popup_type_update-avatar', 
    handleSubmitForm: (data) => {
      popupAvatarForm.renderLoading(false);
      api.patchUserAvatar(data)
        .then((res) => {
          profile.setUserAvatar(res);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          popupAvatarForm.renderLoading(true);
        })     
    }
  }
);


/* Слушатели */ 

buttonEdit.addEventListener('click', () => {
  editProfileValidator.resetErrors();
  editProfileValidator.activateButton();
  const currentUserInfo = profile.getUserInfo();
  setProfileInputs(currentUserInfo);
  popupEditForm.open();
});

buttonAdd.addEventListener('click', () => {
  popupAddForm.open();
  addCardValidator.resetErrors();
  addCardValidator.disableButton();
});

buttonAvatarEdit.addEventListener('click', () => {
  popupAvatarForm.open();
  avatarEditValidator.resetErrors();
  avatarEditValidator.disableButton();
});

popupZoom.setEventsListeners();
popupAddForm.setEventListeners();
popupEditForm.setEventListeners();
popupAvatarForm.setEventListeners();

cardList.renderItems();