export default class UserInfo {
  constructor( { nameSelector, aboutSelector, avatarSelector } ) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  };

  getUserInfo() {
   this._userInfo = {
     title: this._name.textContent,
     subtitle: this._about.textContent,
     avatar: this._userAvatar.src
   };
   return this._userInfo;
  };

  setUserInfo(formValues) {
    this._name.textContent = formValues.name;
    this._about.textContent = formValues.about;
  };

  setUserAvatar(formValues) {
    this._userAvatar.src = formValues.avatar;
  }
  
};
