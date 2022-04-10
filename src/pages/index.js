import './index.css'; // импорт главного файла стилей
import {
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

let userId = '';


/* Api */

const api = new Api({
  serverUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',//Адрес сервера проекта Mesto
  headers: {
    authorization: 'a8870c90-962a-4e80-9995-2681c6a34a53',//Мой токен
    'Content-Type': 'application/json'
  }
})


/* Одновременное получение данных пользователя и карточек */

Promise.all([api.getUserData(), api.getInitialCards()])
  .then((res) => {
    userId = res[0]._id; 
    profile.setUserInfo(res[0]); 
    profile.setUserAvatar(res[0]);
    cardList.renderItems(res[1]);
  })
  .catch((err) => {
    console.error(err);
  });


/* Валидация FormValidator */

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


/* Section */

const cardList = new Section(
  {
    renderer: (item) => {
      const addedCard = createCard(item, userId); 
      cardList.addItem(addedCard);
    }
  },
  '.elements'
);


/* Card */

const createCard = (data) => {
  const card = new Card(
    {
      name: data.name,
      link: data.link,
      likes: data.likes,
      id: data._id,
      userId: userId,
      ownerId: data.owner._id
    },
    '#elementtemplate',
    () => {
      popupZoom.open({name: data.name, link: data.link});
    },
    (id) => {
      popupAskerDeleteForm.open();
      popupAskerDeleteForm.setSubmitAction(() => {
        api.deleteCard(id)
          .then(card.removeCard())
          .catch((err) => {
            console.log(`${err}`);
          })
      })
    },
    (id) => {
      if (card.isLiked()) {
        api.deleteLike(id)
        .then(res => {
          card.setLike(res.likes)
        })
        .catch((err) => {
          console.error(err);
        })
      } else {
        api.putLike(id)
        .then(res => {
          card.setLike(res.likes);
        })
        .catch((err) => {
          console.error(err);
        })
      }
    }
  );
  return card.generateCard();
}


/* PopupWithImage - попап с увеличенной картинкой */ 

const popupZoom = new PopupWithImage('.popup_type_picture');


/* Попап согласие на удаление карточки PopupWithConfirmation */

const popupAskerDeleteForm = new PopupWithConfirmation('.popup_type_deleteask');



/* Форма добавления новой карточки ADD */

const popupAddForm = new PopupWithForm(
  '.popup_type_card-add',
  {
    handleSubmitForm: (inputValues) => {
      popupAddForm.renderLoading(true);
      api.postCard(inputValues)
        .then((data) => {
          const newCard = createCard(data);
          cardList.addNewItem(newCard);
          popupAddForm.close();
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
  '.popup_type_profile',
  {
    handleSubmitForm: (data) => {
      popupEditForm.renderLoading(true);
      api.patchUserInfo(data)
        .then((res) => {
          profile.setUserInfo(res);
          popupEditForm.close();
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


/* Форма редактирования Аватара */

const popupAvatarForm = new PopupWithForm(
    '.popup_type_update-avatar',
  {
    handleSubmitForm: (data) => {
      popupAvatarForm.renderLoading(true);
      api.patchUserAvatar(data)
        .then((res) => {
          profile.setUserAvatar(res);
          popupAvatarForm.close();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          popupAvatarForm.renderLoading(false);
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
popupAskerDeleteForm.setEventsListeners();