export default class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this.userName = document.querySelector(nameSelector);
    this.userAbout = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return {
      userName: this.userName.textContent,
      userAbout: this.userAbout.textContent,
    };
  }

  setUserInfo({userName, userAbout}) {
    this.userName.textContent = userName;
    this.userAbout.textContent = userAbout;
  }
}