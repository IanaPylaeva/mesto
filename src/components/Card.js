export default class Card {
  constructor({data, currentUser, handleCardClick, handleDeleteCard, handleLikeCard}, cardTemplateSelector ) {
    this._cardId = data._id; //параметр _id карточки, которую нужно удалить._id каждой карточки есть в её JSON ("_id": "5d1f0611d321eb4bdcd707dd", — вот он)
    this._name = data.name;
    this._link = data.link;
    this._like = data.likes;
    this._ownerId = data.owner._id;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteCard = handleDeleteCard;
    this._currentUser = currentUser;
  };

  _getTemplate() {
    const elementTemplate = document.querySelector(this._cardTemplateSelector).content;//взяли контент и переложили его в переменную
    return elementTemplate.querySelector('.element').cloneNode(true);// клонируем содержимое тега template
  };


  /* Проверить собственника карточки, установить на картинку значок корзина */

  _checkOwnerCard() {
    if (this._ownerId === this._currentUser) {
      this._deleteButton.classList.add('element__delete_show');
    }
  }


  /* Заполнить карточку данными */

  _fillCard() {
    this._cardElement.querySelector('.element__title').textContent = this._title;
 
    this._cardImage.alt = this._title;
    this._cardImage.src = this._link;
  };


  /* Сформировать готовую карточку */

  generateCard() {
    this._cardElement = this._getTemplate();

    this._likeButton = this._cardElement.querySelector('.element__like');
    this._deleteButton = this._cardElement.querySelector('.element__delete');
    this._cardImage = this._cardElement.querySelector('.element__mask-group');
    this._likeNumber = this._cardElement.querySelector('.element__likes-number');

    this._fillCard();

    this._likeNumber.textContent = this._like.length;

    this._checkOwnerCard();

    this._setEventListeners();
    
    return this._cardElement;
  };


  /* Удаление карточки Element при нажатии корзины. */

  _deleteElement = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._toggleLikeState);
    this._deleteButton.addEventListener('click', this._deleteElement);

    this._cardElement.querySelector('.element__mask-group').addEventListener('click', () => {
    this._handleCardClick(this._title, this._link);
    });
  };

  
  /* Лайки */

  _setLike = () => {
    this._likeButton.classList.add('element__like_active');
  };

  _unsetLike = () => {
    this._likeButton.classList.remove('element__like_active');
  };

  _checkUserLike() {
    return this._like.some((item) => item._id === this._currentUser);
  }

  _toggleLikeState() {
    if (this._checkUserLike()) {
      this._setLike();
    } else {
      this._unsetLike();
    }        
  }

}
