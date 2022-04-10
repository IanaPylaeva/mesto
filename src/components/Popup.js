export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  };

  open() {
    this._popup.classList.add('popup_opened');
  };
  
  close() {
    this._popup.classList.remove('popup_opened');
    this._removeEventListeners();
  };

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    };
  };

  _handleClickClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    };
  };

  setEventsListeners() {
    this._popup.addEventListener('click', this._handleClickClose);
    this._popup.querySelector('.popup__button-close').addEventListener('click', () => this.close());
    document.addEventListener('keydown', this._handleEscClose);
  };

  _removeEventListeners() {
    this._popup.removeEventListener('click', this._handleClickClose);
    this._popup.querySelector('.popup__button-close').removeEventListener('click', () => this.close());
    document.removeEventListener('keydown', this._handleEscClose);
  };

};
