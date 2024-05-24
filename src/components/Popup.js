export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // using arrow function bc otherwise "this" doesn't work
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._modals = document.querySelectorAll(".modal");
    this._modals.forEach((modal) => {
      modal.addEventListener("mousedown", (evt) => {
        // overlay close
        if (evt.target.classList.contains("modal_opened")) {
          this.close();
        }
        // close button
        if (evt.target.classList.contains("modal__close")) {
          this.close();
        }
      });
    });
  }
}
