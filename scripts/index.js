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
