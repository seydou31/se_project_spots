export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input-name",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const showInputError = (modalForm, modalInput, errorMessage, config) => {
  const inputError = modalForm.querySelector(`.${modalInput.id}-error`);
  modalInput.classList.add(config.inputErrorClass);
  inputError.classList.add(config.errorClass);
  inputError.textContent = errorMessage;
};

const hideInputError = (modalForm, modalInput, config) => {
  const inputError = modalForm.querySelector(`.${modalInput.id}-error`);
  modalInput.classList.remove(config.inputErrorClass);
  inputError.classList.remove(config.errorClass);
  inputError.textContent = "";
};

export const resetValidation = (formElement, inputList, config) => {
  inputList.forEach((input) => {
    hideInputError(formElement, input, config);
  });
};

const checkInputValidity = (modalForm, modalInput, config) => {
  if (!modalInput.validity.valid) {
    showInputError(modalForm, modalInput, modalInput.validationMessage, config);
  } else {
    hideInputError(modalForm, modalInput, config);
  }
};

export const disabledSubmitButton = (buttonEl) => {
  buttonEl.disabled = true;
};

const hasInvalidInput = (inputList) => {
  return inputList.some((modalInput) => {
    return !modalInput.validity.valid;
  });
};

export const toggleButtonState = (inputList, buttonElement, config) => {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    disabledSubmitButton(buttonElement);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (modalForm, config) => {
  const inputList = Array.from(
    modalForm.querySelectorAll(config.inputSelector)
  );
  const buttonElement = modalForm.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((modalInput) => {
    modalInput.addEventListener("input", function () {
      checkInputValidity(modalForm, modalInput, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};
export const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  console.log(formList);
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};
