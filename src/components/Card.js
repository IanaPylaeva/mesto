export default class Card {
  constructor(data, cardTemplateSelector , handleCardClick, handleDeleteClick , handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id; //параметр id карточки, которую нужно удалить.id каждой карточки есть в её JSON ("_id": "5d1f0611d321eb4bdcd707dd", — вот он)
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._cardTemplateSelector = cardTemplateSelector;
  };

  _getTemplate() {
    const elementTemplate = document.querySelector(this._cardTemplateSelector).content;//взяли контент и переложили его в переменную
    return elementTemplate.querySelector('.element').cloneNode(true);// клонируем содержимое тега template
  };

  
  /* Лайки */ 

  _addLike = () => {
    this._likeButton.classList.add('element__like_active');
  };

  _removeLike = () => {
    this._likeButton.classList.remove('element__like_active');
  };

  isLiked() {
    return this._likes.find(user => user._id === this._userId);
  }
  
  setLike(newLike) {
    this._likes = newLike;
    this._likeNumber = this._cardElement.querySelector('.element__likes-number');
    this._likeNumber.textContent = this._likes.length;

    if(this.isLiked()){
      this._addLike();
    } else {
      this._removeLike();
    }
  }

  
  /* Заполнить карточку данными */

  _fillCard() {
    this._cardElement.querySelector('.element__title').textContent = this._name;
 
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
  };


  /* Проверить собственника карточки, убрать с чужой картинки значок корзина */

  _checkOwnerCard() {
    if (this._ownerId !== this._userId) {
      this._deleteButton.style.display = 'none';
    }
  }


  /* Сформировать готовую карточку */

  generateCard() {
      this._cardElement = this._getTemplate();

      this._cardImage = this._cardElement.querySelector('.element__mask-group');
      this._likeButton = this._cardElement.querySelector('.element__like');
      this._deleteButton = this._cardElement.querySelector('.element__delete');

      this._fillCard();
      this._setEventListeners();
      this._checkOwnerCard();

      return this._cardElement;
  };


  /* Слушатели */

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => {this._handleDeleteClick(this._id)});
    this._likeButton.addEventListener('click', () => {this._handleLikeClick(this._id)});
    this._cardImage.addEventListener('click', () => {this._handleCardClick(this._name, this._link)});
  };


  /* Удаление карточки Element при нажатии корзины. */

  removeCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }

}