export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameEl = document.querySelector(nameSelector);
    this._jobEl = document.querySelector(jobSelector);
  }

  getUserInfo() {
    // returns an object containing info ab the user. method will be used when necessary to display
    // user data in open form
    return {
      name: this._nameEl.textContent,
      description: this._jobEl.textContent,
    };
  }

  setUserInfo(userData) {
    // takes new user data and adds it to page. method used after successful submission of profile form
    this._nameEl.textContent = userData.name;
    this._jobEl.textContent = userData.description;
  }
}
