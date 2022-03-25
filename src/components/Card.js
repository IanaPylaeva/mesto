export default class Card {
  constructor(data, cardTemplateSelector, handleCardClick) {
    this._title = data.title;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    const elementTemplate = document.querySelector(this._cardTemplateSelector).content;//взяли контент и переложили его в переменную
    return elementTemplate.querySelector('.element').cloneNode(true);// клонируем содержимое тега template
  };

  //Лайки.

  _likeElement = () => {
    this._likeButton.classList.toggle('element__like_active');
  };

  //Удаление карточки Element при нажатии корзины.

  _deleteElement = () => {
    this._cardElement.remove();
  };

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._likeElement);
    this._deleteButton.addEventListener('click', this._deleteElement);

    this._cardElement.querySelector('.element__mask-group').addEventListener('click', () => {
    this._handleCardClick(this._title, this._link);
    });
  };

  _fillCard() {
    this._cardElement.querySelector('.element__title').textContent = this._title;
 
    this._cardImage.alt = this._title;
    this._cardImage.src = this._link;
  };

  generateCard() {
    this._cardElement = this._getTemplate();

    this._likeButton = this._cardElement.querySelector('.element__like');
    this._deleteButton = this._cardElement.querySelector('.element__delete');
    this._cardImage = this._cardElement.querySelector('.element__mask-group');

    this._fillCard();
    this._setEventListeners();
    
    return this._cardElement;
  };
};  