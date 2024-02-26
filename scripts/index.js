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
const imageModalELement = previewImgModal.querySelector(".popup__img");
const imageModalCaption = previewImgModal.querySelector(
  ".preview__img_caption"
);
const previewImgModalCloseBtn = previewImgModal.querySelector(
  "#modal__close-button"
);

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

// Functions

/* function to close modal popup so don't have to repeat code multiple times, only call this function */
function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

/* creates the cards when pg loads automatically and when user adds */
function getCardElement(cardData) {
  // clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  // access the card title and image and store them in variables
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardNameElement = cardElement.querySelector(".card__name");
  // find like btn so each card, including newly made ones can toggle like btn on and off
  const likeButton = cardElement.querySelector(".card__like-button");

  // changes background of like button to active img when clicked
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  //find delete btn and add event listener so can function
  const deleteButton = cardElement.querySelector(".card__delete-btn");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  //makes the img preview modal
  cardImageElement.addEventListener("click", () => {
    imageModalELement.src = cardData.link;
    //alternative text for image
    imageModalELement.alt = cardData.name;
    imageModalCaption.textContent = cardData.name;

    openModal(previewImgModal);
  });

  // set the path to the image to the link field of the object
  cardImageElement.src = cardData.link;
  // set the image alt text to the name field of the object
  cardImageElement.alt = cardData.name;
  // set the card title to the name field of the object, too
  cardNameElement.textContent = cardData.name;
  // return the ready HTML element with the filled-in data, and ability to like the card
  return cardElement;
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListElement.prepend(cardElement);
}

// Event Handlers

/* function so name and description changes to modal input */
function handleProfileEditSubmit(event) {
  event.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();

  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link }, cardListElement);
  // resets the input so user doesn't have to manually delete prior inputs
  event.target.reset();

  closePopup(addNewCardModal);
}

// Event Listeners

/* Shows modal to screen by adding modal_opened modifier from css and presets inputs */
profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  openModal(profileEditModal);
});

// closes all modals when click their close buttons
const closeButtons = document.querySelectorAll(".modal__close");
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closePopup(modal));
});

/* This makes it so name and description changes to modal input when press submit/save button */
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

//add new card button opens modal using css modifier
addNewCardButton.addEventListener("click", () => openModal(addNewCardModal));

/* This creates each card using function getCardElement and makes it so the last card added is 
   the first in the list by using prepend */
initialCards.forEach((cardData) => renderCard(cardData, cardListElement));
