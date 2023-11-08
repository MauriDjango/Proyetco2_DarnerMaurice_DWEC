import {
  formInputHandler,
  submitNewClient,
  toggleSubmit,
  validForm,
} from './clientFormFunctions.js'


// When the DOM is ready, execute the following code
document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submitButton");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const company = document.getElementById("company");
  const formData = {
    name: null,
    email: null,
    phone: null,
    company: null
  };

  loadEventListeners();

  function loadEventListeners() {
    // Add input event listeners to form fields
    name.addEventListener("input", function (e) {
      formInputHandler(formData, e.target);
      toggleSubmit(validForm(formData), submitButton);
    });
    email.addEventListener("input", function (e) {
      formInputHandler(formData, e.target);
      toggleSubmit(validForm(formData), submitButton);
    });
    phone.addEventListener("input", function (e) {
      formInputHandler(formData, e.target);
      toggleSubmit(validForm(formData), submitButton);
    });
    company.addEventListener("input", function (e) {
      formInputHandler(formData, e.target);
      toggleSubmit(validForm(formData), submitButton);
    });
    submitButton.addEventListener("click", async function (e) {
      e.preventDefault();
      await submitNewClient(formData);
    });
  }
});

