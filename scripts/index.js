const initialCards = [
  { name: "Val Thorens", link: "../images/1.jpg" },
  { name: "Restaurant Terrace", link: "../images/2.jpg" },
  { name: "An outdoor cafe", link: "../images/3.jpg" },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "../images/4.jpg",
  },
  { name: "Tunnel with morning light", link: "../images/5.jpg" },
  { name: "Mountain house", link: "../images/6.jpg" },
];

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
  modalImageCloseBtn.addEventListener("click", () => {
    closeModal(imageModal);
  });
  const likeBtn = cardElement.querySelector(".card__like-logo");
  likeBtn.addEventListener("click", () => {
    console.log("Like button clicked!");
    likeBtn.classList.toggle("card__like-logo_color_red");
  });
  const deleteBtn = cardElement.querySelector(".card__delete-btn");
  deleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });
  return cardElement;
};

initialCards.forEach(function (item) {
  console.log(item.name);
  console.log(item.link);
  const card = getCardElement(item);
  cardContainer.prepend(card);
});

const profileEditModal = document.querySelector("#edit-profile-modal");
const newPostModal = document.querySelector("#new-post-modal");
const EditButton = document.querySelector(".profile__edit");
const profileCloseBtn = profileEditModal.querySelector(".modal__close-button");
const postBtn = document.querySelector(".profile__button");
const postCloseBtn = newPostModal.querySelector(".modal__close-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const inputName = profileEditModal.querySelector("#input-name");
const inputDescription = profileEditModal.querySelector("#input-description");
const formSubmit = profileEditModal.querySelector(".modal__form");
const addCardFormElement = newPostModal.querySelector(".modal__form");
const linkInput = addCardFormElement.querySelector("#card-image-name");
const captionInput = addCardFormElement.querySelector("#card-caption-name");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

function openEditContent() {
  openModal(profileEditModal);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

EditButton.addEventListener("click", openEditContent);

profileCloseBtn.addEventListener("click", function () {
  closeModal(profileEditModal);
});

postBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

postCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closeModal(profileEditModal);
}
formSubmit.addEventListener("submit", handleProfileFormSubmit);

function handleCardFormSubmit(e) {
  e.preventDefault();
  console.log(linkInput.value);
  console.log(captionInput.value);
  closeModal(newPostModal);
  const card = getCardElement({
    name: captionInput.value,
    link: linkInput.value,
  });
  cardContainer.prepend(card);

  addCardFormElement.reset();
}
addCardFormElement.addEventListener("submit", handleCardFormSubmit);
