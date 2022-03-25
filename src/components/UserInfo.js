export default class UserInfo {
  constructor( { nameSelector, aboutSelector } ) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
  };

  getUserInfo() {
   this._userInfo = {
     title: this._name.textContent,
     subtitle: this._about.textContent,
   };
   return this._userInfo;
  };

  setUserInfo(formValues) {
    this._name.textContent = formValues.username;
    this._about.textContent = formValues.aboutuser;
  };
};