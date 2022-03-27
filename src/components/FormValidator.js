export default class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
  };
  
  _showInputError(input) {
    this._errorClass = this._form.querySelector(`.${input.id}-error`); //нашли span
    this._errorClass.textContent = input.validationMessage; //выводится сообщение об ошибке span
    input.classList.add(this._settings.inputErrorClass); //к инпут добавляется подчеркивание красным    
  };

  _hideInputError(input) {
    this._errorClass = this._form.querySelector(`.${input.id}-error`); //нашли span
    this._errorClass.textContent = '';
    input.classList.remove(this._settings.inputErrorClass);
  };

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    };
  };
  
  disableButton() {
    this._button.disabled = true;
    this._button.classList.add(this._settings.inactiveButtonClass);
  };

  activateButton() {
    this._button.disabled = false;
    this._button.classList.remove(this._settings.inactiveButtonClass);
  }
  
  _checkButtonValidity() {
    if (this._form.checkValidity()) {
      this.activateButton();
    } else {
      this.disableButton();
    };
  };
  
  enableValidation() {
    this._inputs = this._form.querySelectorAll(this._settings.inputSelector);
    this._button = this._form.querySelector(this._settings.submitButtonSelector);

    this._form.addEventListener('reset', () => {
      this.disableButton();
    });

    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._checkButtonValidity(input);
      });
    });
  };

  resetErrors() {
    this._form.reset();
    this._inputs.forEach(input => {
      this._hideInputError(input);
    });
    this.disableButton();
  };
};