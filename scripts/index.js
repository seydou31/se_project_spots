const initialCards = [
  { name: "Val Thorens ", link: "../images/1" },
  { name: " Restaurant Terrace", link: "../images/2 " },
  { name: "An outdoor cafe ", link: " ../images/3" },
  {
    name: "A very long bridge, over the forest and through the trees ",
    link: "../images/4 ",
  },
  { name: " Tunnel with morning light", link: "../images/5 " },
  { name: " Mountain house", link: " ../images/6" },
];

initialCards.forEach(function (item) {
  console.log(item.name);
  console.log(item.link);
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
  addCardFormElement.reset();
}
addCardFormElement.addEventListener("submit", handleCardFormSubmit);
