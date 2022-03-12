export class Card {
  constructor(data, cardTemplateSelector, openZoomPopup) { // '#elementtemplate'
    this._elementTemplate = document.querySelector(cardTemplateSelector).content;//взяли контент и переложили его в переменную
    this._name = data.name;
    this._link = data.link;
    this._openZoomPopup = openZoomPopup;
  }

  _getTemplate() {
    this._cardElement = this._elementTemplate.querySelector('.element').cloneNode(true);// клонируем содержимое тега template
  };

  createCard() {
    this._getTemplate();
    this._cardElement.querySelector('.element__title').textContent = this._name;
    const cardImage = this._cardElement.querySelector('.element__mask-group');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._addListeners(this._cardElement);
    return this._cardElement;
  };

  _addListeners(el) {
    el.querySelector('.element__delete').addEventListener('click', this._deleteElement);
    el.querySelector('.element__like').addEventListener('click', this._likeElement);
    el.querySelector('.element__mask-group').addEventListener('click', this._openZoomPopup);
  };

  //Лайки.

  _likeElement = (event) => {
    event.target.closest('.element__like').classList.toggle('element__like_active');
  };

  //Удаление карточки Element при нажатии корзины.

  _deleteElement = () => {
    this._cardElement.remove();
  };

}