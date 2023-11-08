import { localStorageClientKey } from './clientes.js'
import {
  formInputHandler,
  submitEditForm,
  toggleSubmit,
  validForm
} from './clientFormFunctions.js'


document.addEventListener("DOMContentLoaded", function() {
  // Fetch HTML elements
  const editButton = document.getElementById("editButton");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const company = document.getElementById("company");

  // Fetch original client data from local storage
  const originalClientData = JSON.parse(localStorage.getItem(localStorageClientKey))
  const formData = JSON.parse(localStorage.getItem(localStorageClientKey))

  loadExistingData(originalClientData);
  loadEventListeners();

  function loadEventListeners() {
    // Event listeners for form inputs
    name.addEventListener("input", function (e) {
      formInputHandler(formData, e.target);
      toggleSubmit(validForm(formData), editButton);
    });
    email.addEventListener("input", function (e) {
      formInputHandler(formData, e.target);
      toggleSubmit(validForm(formData), editButton);
    });
    phone.addEventListener("input", function (e) {
      formInputHandler(formData, e.target);
      toggleSubmit(validForm(formData), editButton);
    });
    company.addEventListener("input", function (e) {
      formInputHandler(formData, e.target);
      toggleSubmit(validForm(formData), editButton);
    });

    // Event listener for edit button click
    editButton.addEventListener("click", async function (e) {
      e.preventDefault();
      await submitEditForm(originalClientData, formData);
    });
  }

  // Populate form fields with existing client data
  function loadExistingData(clientData) {
    name.value = clientData.name;
    email.value = clientData.email;
    phone.value = clientData.phone;
    company.value = clientData.company;
  }
});
