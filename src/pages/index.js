import "./index.css";
import {
  disabledSubmitButton,
  enableValidation,
  toggleButtonState,
  resetValidation,
  settings,
} from "../scripts/validate.js";
import Api from "../utils/Api.js";
import setButtonText from "../utils/Helper.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "52c275a0-bc3b-40b6-9de1-91f319344d34",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileImage.src = userInfo.avatar;
    cards.forEach(function (item) {
      const card = getCardElement(item);
      cardContainer.prepend(card);
    });
  })
  .catch((err) => {
    console.error(err);
  });

const cardTemplate = document.querySelector("#card-template");
const cardContainer = document.querySelector(".cards__list");
const imageModal = document.querySelector("#image-modal");
const modalPicture = imageModal.querySelector(".modal__image");
const modalCaption = imageModal.querySelector(".modal__caption");
const modalImageCloseBtn = imageModal.querySelector(".modal__x-btn");
const getCardElement = (data) => {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__description");
  cardTitle.textContent = data.name;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);
  cardImage.addEventListener("click", () => {
    openModal(imageModal);
    modalPicture.setAttribute("src", data.link);
    modalPicture.setAttribute("alt", data.name);
    modalCaption.textContent = data.name;
  });
  const likeBtn = cardElement.querySelector(".card__like-logo");
  if (data.isLiked) {
    likeBtn.classList.add("card__like-logo_color_red");
  } else {
    likeBtn.classList.remove("card__like-logo_color_red");
  }
  likeBtn.addEventListener("click", (evt) => {
    handleLikeCard(evt, data);
  });

  const deleteCardBtn = cardElement.querySelector(".card__delete-btn");
  deleteCardBtn.addEventListener("click", () => {
    handleDeleteCard(cardElement, data._id);
  });
  return cardElement;
};

modalImageCloseBtn.addEventListener("click", () => {
  closeModal(imageModal);
});

const profileEditModal = document.querySelector("#edit-profile-modal");
const profileSubmitBtn = profileEditModal.querySelector(".modal__save-button");
const newPostModal = document.querySelector("#new-post-modal");
const editButton = document.querySelector(".profile__edit");
const profileCloseBtn = profileEditModal.querySelector(".modal__close-button");
const postBtn = document.querySelector(".profile__button");
const postCloseBtn = newPostModal.querySelector(".modal__close-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const inputName = profileEditModal.querySelector("#input-name");
const inputDescription = profileEditModal.querySelector("#input-description");
const formSubmit = profileEditModal.querySelector(".modal__form");
const addCardFormElement = newPostModal.querySelector(".modal__form");
const linkInput = addCardFormElement.querySelector("#card-image-name");
const captionInput = addCardFormElement.querySelector("#card-caption-name");
const cardModalSaveBtn = addCardFormElement.querySelector(
  ".modal__save-button"
);
const profileAvatarBtn = document.querySelector(".profile__avatar-btn");

//avatar form elements
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__save-button");
const avatarCloseBtn = avatarModal.querySelector(".modal__close-button");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");
const profilePencilIcon = document.querySelector(".profile__pencil-icon");

//delete modal elements
const deleteModal = document.querySelector("#delete-modal");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-button");
const cancelModalBtn = deleteModal.querySelector(
  ".modal__save-button_type_cancel"
);
const deleteModalBtn = deleteModal.querySelector(
  ".modal__save-button_type_delete"
);
const deleteForm = deleteModal.querySelector(".modal__form");

// delete card from the server

let selectedCard;
let selectedCardId;

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleDeleteModalSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true, "delete", "deleting...");
  api
    .deleteCard(selectedCardId)
    .then(() => {
      closeModal(deleteModal);
      selectedCard.remove();
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false, "delete", "deleting...");
    });
}

function handleLikeCard(event, data) {
  const isLiked = event.target.classList.contains("card__like-logo_color_red");
  api
    .changeLikeStatus(isLiked, data._id)
    .then(() => {
      event.target.classList.toggle("card__like-logo_color_red");
    })
    .catch(console.error);
}

const inputList = Array.from(
  profileEditModal.querySelectorAll(".modal__input-name")
);
const buttonElement = profileEditModal.querySelector(".modal__save-button");

function closeModalOverlay(evt) {
  const currentModal = document.querySelector(".modal_is-opened");
  if (evt.target === evt.currentTarget) {
    closeModal(currentModal);
  }
}
const addListenerModalOverlay = () => {
  document.querySelectorAll(".modal").forEach((modalElement) => {
    modalElement.addEventListener("click", closeModalOverlay);
  });
};

const removeListenerModalOverlay = () => {
  document.querySelectorAll(".modal").forEach((modalElement) => {
    modalElement.removeEventListener("click", closeModalOverlay);
  });
};

const eventListenerEscapeKey = (evt) => {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    if (modal.classList.contains("modal_is-opened") && evt.key === "Escape") {
      closeModal(modal);
    }
  });
};

const addEventListenerEscapeKey = () => {
  document.addEventListener("keydown", eventListenerEscapeKey);
};

const removeEventListenerEscapeKey = () => {
  document.removeEventListener("keydown", eventListenerEscapeKey);
};

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  addListenerModalOverlay();
  addEventListenerEscapeKey();
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  removeEventListenerEscapeKey();
  removeListenerModalOverlay();
}

function openEditContent() {
  resetValidation(formSubmit, [inputName, inputDescription], settings);
  toggleButtonState(inputList, buttonElement, settings);
  openModal(profileEditModal);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

editButton.addEventListener("click", openEditContent);

profileCloseBtn.addEventListener("click", function () {
  closeModal(profileEditModal);
});

postBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

postCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

profileAvatarBtn.addEventListener("click", function () {
  openModal(avatarModal);
});

avatarCloseBtn.addEventListener("click", function () {
  closeModal(avatarModal);
});

deleteModalCloseBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});

cancelModalBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

function handleProfileFormSubmit(e) {
  e.preventDefault();
  const submitBtn = e.submitter;
  setButtonText(submitBtn, true);
  api
    .editUserInfo({ name: inputName.value, about: inputDescription.value })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(profileEditModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}
formSubmit.addEventListener("submit", handleProfileFormSubmit);

function handleCardFormSubmit(e) {
  e.preventDefault();
  const submitBtn = e.submitter;
  setButtonText(submitBtn, true);
  api
    .addCard({ name: captionInput.value, link: linkInput.value })
    .then((data) => {
      closeModal(newPostModal);
      const card = getCardElement(data);
      cardContainer.prepend(card);

      addCardFormElement.reset();
      cardModalSaveBtn.classList.add(settings.inactiveButtonClass);
      disabledSubmitButton(cardModalSaveBtn);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleAvatarSubmit(e) {
  e.preventDefault();
  const submitBtn = e.submitter;
  setButtonText(submitBtn, true);
  api
    .editavatarInfo({ avatar: avatarInput.value })
    .then((data) => {
      profileImage.src = data.avatar;
      closeModal(avatarModal);
      avatarForm.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

addCardFormElement.addEventListener("submit", handleCardFormSubmit);

deleteForm.addEventListener("submit", (evt) => {
  handleDeleteModalSubmit(evt);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);

enableValidation(settings);
