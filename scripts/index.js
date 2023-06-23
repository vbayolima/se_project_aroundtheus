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

const modalCloseBtn = document.querySelector("#modal__close-button");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const profileNameInput = document.querySelector("#profile__name-input");
const profileDescriptionInput = document.querySelector(
  "#profile__description-input"
);

const profileEditForm = profileEditModal.querySelector(".modal__form");

const cardListElement = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;

// Functions

/* function to close modal popup so don't have to repeat code multiple times, only call this function */
function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}

/* creates the cards */
function getCardElement(cardData) {
  // clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  // access the card title and image and store them in variables
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardNameElement = cardElement.querySelector(".card__name");
  // set the path to the image to the link field of the object
  cardImageElement.src = cardData.link;
  // set the image alt text to the name field of the object
  cardImageElement.alt = cardData.name;
  // set the card title to the name field of the object, too
  cardNameElement.textContent = cardData.name;
  // return the ready HTML element with the filled-in data
  return cardElement;
}

// Event Handlers

/* function so name and description changes to modal input */
function handleProfileEditSubmit(event) {
  event.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closePopup();
}

// Event Listeners

/* Shows modal to screen by adding modal_opened modifier from css */
profileEditBtn.addEventListener("click", function () {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  profileEditModal.classList.add("modal_opened");
});

/* Removes modal_opened modifier when click close button of modal */
modalCloseBtn.addEventListener("click", closePopup);

/* This makes it so name and description changes to modal input when press submit/save button */
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

/* This creates each card using function getCardElement and makes it so the last card added is 
   the first in the list by using prepend */
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListElement.prepend(cardElement);
});
