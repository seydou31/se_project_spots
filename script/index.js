const profileEditModal = document.querySelector("#edit-profile-modal");
const profilePostModal = document.querySelector("#new-post-modal");
const EditButton = document.querySelector(".profile__edit");
const profileCloseBtn = profileEditModal.querySelector(".modal__close-button");
const postBtn = document.querySelector(".profile__button");
const postCloseBtn = profilePostModal.querySelector(".modal__close-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const inputName = profileEditModal.querySelector("#input-name");
const inputDescription = profileEditModal.querySelector("#input-description");
const formSubmit = profileEditModal.querySelector(".modal__form");
const addCardFormElement = profilePostModal.querySelector(".modal__form");
const linkInput = addCardFormElement.querySelector("#card-image-name");
const captionInput = addCardFormElement.querySelector("#card-caption-name");

EditButton.addEventListener("click", function () {
  profileEditModal.classList.add("modal_is-opened");
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

profileCloseBtn.addEventListener("click", function () {
  profileEditModal.classList.remove("modal_is-opened");
});

postBtn.addEventListener("click", function () {
  profilePostModal.classList.add("modal_is-opened");
});

postCloseBtn.addEventListener("click", function () {
  profilePostModal.classList.remove("modal_is-opened");
});

formSubmit.addEventListener("submit", function (e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  profileEditModal.classList.remove("modal_is-opened");
});

addCardFormElement.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(linkInput.value);
  console.log(captionInput.value);
  profilePostModal.classList.remove("modal_is-opened");
});
