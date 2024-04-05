export default class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._cardData = cardData;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  // private method _setEventListeners that sets necessary event listeners
  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector(".card__delete-btn")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({
          name: this._name,
          link: this._link,
        });
      });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle(".card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    // sets the path to img to the link field of obj
    this._cardElement
      .querySelector(".card__image")
      .setAttribute("src", this._link);
    // sets img alt text to name field of obj
    this._cardElement
      .querySelector(".card__name")
      .setAttribute("alt", this._name);
    //sets card title to name field of obj
    this._cardElement.querySelector(".card__name").textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
