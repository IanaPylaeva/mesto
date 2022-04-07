import Popup from './Popup.js';
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }
  
  setSubmitAction(submitHandler) {
    this._handleSubmitForm = submitHandler;
  }

  setEventsListeners() {
    super.setEventsListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm();
      this.close();
    });
  }
}