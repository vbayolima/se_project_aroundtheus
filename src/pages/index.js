import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  profileEditBtn,
  addNewCardButton,
  profileEditForm,
  addCardForm,
  profileNameInput,
  profileDescriptionInput,
} from "../utils/constants.js";

// VALIDATION
const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Functions

// function to create a new card from Card.js
function createCard(cardData) {
  const card = new Card(cardData, "#card__template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

// to render/add single created card
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
}

// creates premade cards as page loads
const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);
section.renderItems();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
});

const editProfilePopup = new PopupWithForm(
  "#profile__edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

function handleProfileEditSubmit(inputValues) {
  console.log(inputValues);
  userInfo.setUserInfo(inputValues);
  editProfilePopup.close();
  editFormValidator.resetValidation();
}

const newCardPopup = new PopupWithForm(
  "#card__add-modal",
  handleAddCardFormSubmit
);
newCardPopup.setEventListeners();

function handleAddCardFormSubmit(inputValues) {
  console.log(inputValues);
  renderCard(inputValues);
  newCardPopup.close();
  addFormValidator.resetValidation();
}

// PREVIEW IMAGE MODAL
function handleImageClick(cardData) {
  imageModal.open(cardData);
}

const imageModal = new PopupWithImage("#preview__img-modal");
imageModal.setEventListeners();

/* Shows modal to screen */
profileEditBtn.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  profileNameInput.value = currentUser.name;
  profileDescriptionInput.value = currentUser.description;
  editFormValidator.resetValidation();

  editProfilePopup.open();
  addFormValidator.resetValidation();
});

//add new card button opens modal using css modifier
addNewCardButton.addEventListener("click", () => newCardPopup.open());
