const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input-name",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const showInputError = (modalForm, modalInput, errorMessage) => {
  const inputError = modalForm.querySelector(`.${modalInput.id}-error`);
  modalInput.classList.add(settings.inputErrorClass);
  inputError.classList.add(settings.errorClass);
  inputError.textContent = errorMessage;
};

const hideInputError = (modalForm, modalInput) => {
  const inputError = modalForm.querySelector(`.${modalInput.id}-error`);
  modalInput.classList.remove(settings.inputErrorClass);
  inputError.classList.remove(settings.errorClass);
  inputError.textContent = "";
};

const resetValidation = (formElement, inputList) => {
  inputList.forEach((input) => {
    hideInputError(formElement, input);
  });
};

const checkInputValidity = (modalForm, modalInput) => {
  if (!modalInput.validity.valid) {
    showInputError(modalForm, modalInput, modalInput.validationMessage);
  } else {
    hideInputError(modalForm, modalInput);
  }
};

const disabledSubmitButton = (buttonEl) => {
  buttonEl.disabled = true;
};

const hasInvalidInput = (inputList) => {
  return inputList.some((modalInput) => {
    return !modalInput.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    disabledSubmitButton(buttonElement);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (modalForm) => {
  const inputList = Array.from(
    modalForm.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = modalForm.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((modalInput) => {
    modalInput.addEventListener("input", function () {
      checkInputValidity(modalForm, modalInput);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  console.log(formList);
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation(settings);
