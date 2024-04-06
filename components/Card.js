export default class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._cardData = cardData;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

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
          name: this._cardData.name,
          link: this._cardData.link,
        });
      });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    // sets the path to img to the link field of obj
    this._cardElement
      .querySelector(".card__image")
      .setAttribute("src", this._cardData.link);
    // sets img alt text to name field of obj
    this._cardElement
      .querySelector(".card__image")
      .setAttribute("alt", this._cardData.name);
    //sets card title to name field of obj
    this._cardElement.querySelector(".card__name").textContent =
      this._cardData.name;

    this._setEventListeners();

    return this._cardElement;
  }
}
