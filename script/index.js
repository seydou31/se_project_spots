const profileEditModal = document.querySelector("#edit-profile-modal");
const profilePostModal = document.querySelector("#new-post-modal");
const EditButton = document.querySelector(".profile__edit");
const profileCloseBtn = profileEditModal.querySelector(".modal__close-button");
const postBtn = document.querySelector(".profile__button");
const postCloseBtn = profilePostModal.querySelector(".modal__close-button");

EditButton.addEventListener("click", function () {
  profileEditModal.classList.add("modal_is-opened");
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
