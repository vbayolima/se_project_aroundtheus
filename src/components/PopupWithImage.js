import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._caption = this._popupElement.querySelector(".preview__img_caption");
    this._image = this._popupElement.querySelector(".popup__img");
  }

  open(data) {
    this._image.src = data.link;
    this._image.alt = data.name;
    this._caption.textContent = data.name;
    super.open();
  }
}

// create one instance of this class in index.js & call popup's
// setEventListeners() method
