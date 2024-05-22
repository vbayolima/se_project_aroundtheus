export const initialCards = [
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

//Elements
export const profileEditBtn = document.querySelector("#profile__edit-button");
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(
  ".profile__description"
);

export const addNewCardButton = document.querySelector(".profile__add-button");
export const addNewCardModal = document.querySelector("#card__add-modal");

export const previewImgModal = document.querySelector("#preview__img-modal");
export const imageModalElement = previewImgModal.querySelector(".popup__img");
export const imageModalCaption = previewImgModal.querySelector(
  ".preview__img_caption"
);

export const profileEditForm = document.forms["profile-form"];
export const addCardForm = document.forms["card-form"];

export const profileNameInput = document.querySelector("#profile__name-input");
export const profileDescriptionInput = document.querySelector(
  "#profile__description-input"
);
