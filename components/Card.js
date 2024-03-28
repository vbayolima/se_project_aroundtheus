function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    // finds the opened modal
    const modalOpened = document.querySelector(".modal_opened");
    closePopup(modalOpened);
  }
}

export default class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;

    this._handleImageClick = handleImageClick;

    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    // changes background of like button to active img when clicked
    this._likeButton.addEventListener("click", () => this._handleLikeIcon());

    //find delete btn and add event listener so can function

    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCard()
    );

    //makes the img preview modal
    this._cardImageElement.addEventListener("click", () =>
      this._handlePreviewImage()
    );
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  handleImageClick() {
    this._cardImageElement.src = this._link;
    //alternative text for image
    this._cardImageElement.alt = this._name;
    this._cardNameElement.textContent = this._name;

    openModal(previewImgModal);
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();

    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(".card__delete-btn");
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardNameElement = this._cardElement.querySelector(".card__name");

    this._setEventListeners();
  }
}
