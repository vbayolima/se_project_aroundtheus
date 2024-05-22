import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._caption = this._popupElement.querySelector(".preview__img_caption");
    this._image = this._popupElement.querySelector(".popup__img");
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}

// create one instance of this class in index.js & call popup's
// setEventListeners() method
