import { ValidateClient } from './ValidateClient.js'
import { createClient } from './Client.js'
import { clientObjectStore } from '../db/ClientsObjectStore.js'


// Handles input changes and validation
export function formInputHandler(formData, target) {
  const fieldValue = target.value;

  switch (target.id) {
    case "name":
      if (ValidateClient.validName(fieldValue)) {
        removeAlert(target);
        formData.name = fieldValue;
      } else {
        formData.name = null
        alertField(target);
      }
      break;
    case "email":
      if (ValidateClient.validEmail(fieldValue)) {
        removeAlert(target);
        formData.email = fieldValue;
      } else {
        alertField(target);
      }
      break;
    case "phone":
      if (ValidateClient.validPhone(fieldValue)) {
        removeAlert(target);
        formData.phone = fieldValue;
      } else {
        alertField(target);
      }
      break;
    case "company":
      if (ValidateClient.validCompany(fieldValue)) {
        removeAlert(target);
        formData.company = fieldValue;
      } else {
        alertField(target);
      }
      break;
  }
}

// Displays an alert for invalid form fields
function alertField(form) {
  const alert = document.getElementById(`${form.id}.alert`);
  const fieldAlert = document.createElement("P");

  if (alert !== null) {
    alert.remove();
  }

  fieldAlert.innerText = `The ${form.id} you provided is invalid`;
  fieldAlert.classList.add('bg-red-600', 'text-xs', 'text-white', 'p-2', 'text-center');
  fieldAlert.setAttribute("id", `${form.id}.alert`);

  form.parentElement.appendChild(fieldAlert);
}

// Removes an alert for invalid form fields
function removeAlert(form) {
  const alert = document.getElementById(`${form.id}.alert`);
  if (alert !== null) {
    alert.remove();
  }
}

// Checks if the form data is valid
export function validForm(formData) {
  return (
    formData.name !== null &&
    formData.phone !== null &&
    formData.email !== null &&
    formData.company !== null
  );
}

// Toggles the submit button's state based on form validity
export function toggleSubmit(formValid, submitButton) {
  if (formValid) {
    submitButton.removeAttribute("disabled");
    submitButton.setAttribute("class", "bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold");
  } else {
    submitButton.setAttribute("disabled", true);
    submitButton.setAttribute("class", "bg-grey-600 hover.bg-grey-900 w-full mt-5 p-2 text-white uppercase font-bold");
  }
}

// Submits the form by adding a new client to the object store
export async function submitNewClient(formData) {
  console.log("Submitting client");
  const client = createClient(formData);
  await clientObjectStore.addClient(client);
  changeWindow("index.html")
}

export async function submitEditForm(originalClientData, clientData) {
  console.log("Editing Client");

  // Check if the client already exists
  if (await clientObjectStore.clientExists(clientData.email)) {
    console.log("Client exists, editing information");
    await clientObjectStore.editClient(clientData);
  } else {
    console.log("Client email has changed, editing client");
    // Remove the original client data and add the updated data
    await clientObjectStore.removeClient(originalClientData.email);
    await clientObjectStore.addClient(clientData);
  }
  changeWindow("index.html")
}

export function changeWindow(html) {
  window.location.href = html
}
