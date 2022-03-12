export const popup = document.querySelector('.popup');
export const popupPicture = document.querySelector('.popup_type_picture');
export const pictureZoom = document.querySelector('.popup__zoom');
export const popupCaption = document.querySelector('.popup__caption');

export const openPopup = (el) => {
  el.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc);
  el.addEventListener('click', closeOverlay);
  
};

/* Закрытие pop-up при нажатии ESC */

export const closeEsc = (evt) => {
  if (evt.key === 'Escape') {
  const popup = document.querySelector('.popup_opened');
  closePopup(popup);
}
};

/* Закрытие pop-up кликом на оверлей */

export const closeOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  };
};

export const closePopup = (el) => {  
  el.classList.remove('popup_opened'); // убрать класс "popup_opened".
  document.removeEventListener('keydown', closeEsc);
  el.removeEventListener('click', closeOverlay);
};

