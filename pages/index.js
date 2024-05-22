import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* Elements */

const profileEditBtn = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile__edit-modal");
//chooses profile edit modal close button specifically
const profileModalCloseBtn = profileEditModal.querySelector(
  "#modal__close-button"
);

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardModal = document.querySelector("#card__add-modal");
//specifies add new card modal close button
const addNewCardModalCloseBtn = addNewCardModal.querySelector(
  "#modal__close-button"
);

const previewImgModal = document.querySelector("#preview__img-modal");
const imageModalElement = previewImgModal.querySelector(".popup__img");
const imageModalCaption = previewImgModal.querySelector(
  ".preview__img_caption"
);
const previewImgModalCloseBtn = previewImgModal.querySelector(
  "#modal__close-button"
);

const cardSelector = "#card__template";

// Form data
const profileEditForm = document.forms["profile-form"];
const addCardForm = document.forms["card-form"];

const profileNameInput = document.querySelector("#profile__name-input");
const profileDescriptionInput = document.querySelector(
  "#profile__description-input"
);

const cardTitleInput = addCardForm.querySelector(".modal__input_title");
const cardLinkInput = addCardForm.querySelector(".modal__input_link");

const cardListElement = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;

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

// creates premade cards as page loads
const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardEl = createCard(cardData);
      section.addItem(cardEl);
    },
  },
  ".cards__list"
);
section.renderItems();

// to render/add single created card
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
}

const userInfo = new UserInfo({
  nameSelector: "#profile__name-input",
  jobSelector: "#profile__description-input",
});

const editProfilePopup = new PopupWithForm(
  "#profile__edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

function handleProfileEditSubmit(inputValues) {
  console.log(inputValues);
  userInfo.setUserInfo(inputValues);
  editFormValidator.toggleButtonState();
  editProfilePopup.close();
}

const newCardPopup = new PopupWithForm(
  "#card__add-modal",
  handleAddCardFormSubmit
);
newCardPopup.setEventListeners();

function handleAddCardFormSubmit(inputValues) {
  console.log(inputValues);
  // const cardData = { name: inputValues.name, link: inputValues.link };
  // renderCard(cardData);
  renderCard(inputValues);
  addFormValidator.toggleButtonState();
  newCardPopup.close();
}

// PREVIEW IMAGE MODAL
function handleImageClick(cardData) {
  imageModal.open(cardData);
}

const imageModal = new PopupWithImage("#preview__img-modal");
imageModal.setEventListeners();

/* Shows modal to screen */
profileEditBtn.addEventListener("click", () => {
  // profileNameInput.value = profileName.textContent;
  // profileDescriptionInput.value = profileDescription.textContent;
  const currentUser = userInfo.getUserInfo();
  profileNameInput.value = currentUser.name;
  profileDescriptionInput.value = currentUser.description;
  editFormValidator.resetValidation();

  editProfilePopup.open();
  addFormValidator.resetValidation();
});

/* This makes it so name and description changes to modal input when press submit/save button */
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

//add new card button opens modal using css modifier
addNewCardButton.addEventListener("click", () => newCardPopup.open());

// DISREGARD REST OF FILE, CODE HISTORY TO BE ERASED

// //in these open and close modal function, also adds and
// //removes the closing w esc button function
// function closePopup(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", handleEscape);
// }

// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", handleEscape);
// }

// // function to create a new card from Card.js
// function createCard(cardData) {
//   const card = new Card(cardData, "#card__template", handleImageClick);
//   const cardElement = card.getView();
//   return cardElement;
// }

// // creates premade cards as page loads
// const section = new Section(
//   {
//     items: initialCards,
//     renderer: (cardData) => {
//       const cardEl = createCard(cardData);
//       section.addItem(cardEl);
//     },
//   },
//   ".cards__list"
// );
// section.renderItems();

// // to render/add single created card
// function renderCard(cardData) {
//   const cardElement = createCard(cardData);
//   cardListElement.prepend(cardElement);
// }

// Event Handlers

/* function so name and description changes to modal input */
// function handleProfileEditSubmit(event) {
//   event.preventDefault();

//   profileName.textContent = profileNameInput.value;
//   profileDescription.textContent = profileDescriptionInput.value;

//   closePopup(profileEditModal);
// }

// const userInfo = new UserInfo({
//   nameSelector: "#profile__name-input",
//   jobSelector: "#profile__description-input",
// });

// const editProfilePopup = new PopupWithForm(
//   "#profile__edit-modal",
//   handleProfileEditSubmit
// );
// editProfilePopup.setEventListeners();

// function handleProfileEditSubmit(inputValues) {
//   console.log(inputValues);
//   // profileName.textContent = inputValues.name;
//   // profileDescription.textContent = inputValues.description;
//   const currentUserData = {
//     nameSelector: "#profile__name-input".textContent,
//     jobSelector: "#profile__description-input".textContent,
//   };
//   console.log(currentUserData);
//   userInfo.setUserInfo(currentUserData);
//   editProfilePopup.close();
// }

// function handleProfileEditSubmit(inputValues) {
//   console.log(inputValues);
//   userInfo.setUserInfo(inputValues);
//   editFormValidator.toggleButtonState();
//   editProfilePopup.close();
// }

// function handleAddCardFormSubmit(event) {
//   event.preventDefault();

//   const name = cardTitleInput.value;
//   const link = cardLinkInput.value;
//   const cardData = { name, link };

//   // adds the new cards that are created in form
//   renderCard(cardData);

//   // resets the input so user doesn't have to manually delete prior inputs
//   event.target.reset();

//   // resets submit button, no adding empty cards
//   addFormValidator.toggleButtonState();

//   closePopup(addNewCardModal);
// }

// const newCardPopup = new PopupWithForm(
//   "#card__add-modal",
//   handleAddCardFormSubmit
// );
// newCardPopup.setEventListeners();

// function handleAddCardFormSubmit(data) {
//   const cardData = { name: data.name, link: data.link };
//   const cardEl = createCard(cardData);

//   section.addItem(cardEl);
//   addFormValidator.toggleButtonState();
//   newCardPopup.close();
// }

// function handleAddCardFormSubmit(inputValues) {
//   console.log(inputValues);
//   // const cardData = { name: inputValues.name, link: inputValues.link };
//   // renderCard(cardData);
//   renderCard(inputValues);
//   addFormValidator.toggleButtonState();
//   newCardPopup.close();
// }

// // PREVIEW IMAGE MODAL
// function handleImageClick(cardData) {
//   // imageModalElement.setAttribute("src", cardData.link);
//   // imageModalElement.setAttribute("alt", cardData.name);
//   // imageModalCaption.textContent = cardData.name;
//   // openModal(previewImgModal);

//   imageModal.open(cardData);
// }

// const imageModal = new PopupWithImage("#preview__img-modal");
// imageModal.setEventListeners();

// Event Listeners

// /* Shows modal to screen */
// profileEditBtn.addEventListener("click", () => {
//   // profileNameInput.value = profileName.textContent;
//   // profileDescriptionInput.value = profileDescription.textContent;
//   userInfo.getUserInfo();

//   editFormValidator.resetValidation();

//   // openModal(profileEditModal);
//   editProfilePopup.open();
// });

// //closes when press esc key
// function handleEscape(evt) {
//   if (evt.key === "Escape") {
//     // finds the opened modal
//     const modalOpened = document.querySelector(".modal_opened");
//     closePopup(modalOpened);
//   }
// }

// // this closes modal w close button and overlay
// const modals = document.querySelectorAll(".modal");
// modals.forEach((modal) => {
//   modal.addEventListener("mousedown", (evt) => {
//     // overlay close
//     if (evt.target.classList.contains("modal_opened")) {
//       closePopup(modal);
//     }
//     // close button
//     if (evt.target.classList.contains("modal__close")) {
//       closePopup(modal);
//     }
//   });
// });

// /* This makes it so name and description changes to modal input when press submit/save button */
// profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// //add new card button opens modal using css modifier
// addNewCardButton.addEventListener("click", () => openModal(addNewCardModal));

/* This creates each card using Card.js and makes it so the last card added is 
   the first in the list by using prepend */
// initialCards.forEach((cardData) => {
//   renderCard(cardData);
// });
