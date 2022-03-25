import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._pictureZoom = this._popup.querySelector('.popup__zoom');
    this._popupCaption = this._popup.querySelector('.popup__caption');
  };

  open({ name, link }) {  
    this._popupCaption.textContent = name;
    this._pictureZoom.alt = name;
    this._pictureZoom.src = link;
    super.open(); 
  }; 
};