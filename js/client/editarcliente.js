import { editClient, getClient } from "../../db/ClientsObjectStore.js";
import {ValidateClient} from "./ValidateClient.js";
import { alertField, removeAlert, toggleSubmit, validForm } from "./nuevocliente.js";

const editNameField = document.getElementById("name");
const editEmailField = document.getElementById("email");
const editPhoneField = document.getElementById("phone");
const editCompanyField = document.getElementById("company");
const submitButton = document.getElementById("submitButton");

const formValid = {
  nameValid: false,
  emailValid: false,
  phoneValid: false,
  companyValid: false,
  valid: false
}

const formData = {
  nameValid: null,
  emailValid: null,
  phoneValid: null,
  companyValid: null
}

editNameField.addEventListener("blur", function (e) {
  editBlurHandler(formData, formValid, e.target)
})

editEmailField.addEventListener("blur", function (e) {
  editBlurHandler(formData, formValid, e.target)
})

editPhoneField.addEventListener("blur", function (e) {
  editBlurHandler(formData, formValid, e.target)
})

editCompanyField.addEventListener("blur", function (e) {
  editBlurHandler(formData, formValid, e.target)
})

submitButton.addEventListener("click", function (e) {
  e.preventDefault()
  submitForm(formData)
})

function editBlurHandler(formData, formValid, target) {
  const editFieldValue = target.value

  switch (target.id) {
    case "name": {
      formValid.nameValid = ValidateClient.validName(editFieldValue)
      if (!formValid.nameValid) { alertField(target) } else { removeAlert(target); formData.name = editFieldValue }
      break
    }
    case "email": {
      formValid.emailValid = ValidateClient.validEmail(editFieldValue)
      if (!formValid.emailValid) { alertField(target) } else { removeAlert(target); formData.email = editFieldValue }
      break
    }
    case "phone": {
      formValid.phoneValid = ValidateClient.validPhone(editFieldValue)
      if (!formValid.phoneValid) { alertField(target) } else { removeAlert(target); formData.phone = editFieldValue }
      break
    }
    case "company": {
      formValid.companyValid = ValidateClient.validCompany(editFieldValue)
      if (!formValid.companyValid) { alertField(target) } else { removeAlert(target); formData.company = editFieldValue}
      break
    }
  }
  validForm(formValid)
  toggleSubmit(formValid, submitButton)
}

function changeWindowToEdit() {
  window.location.href = "editar-cliente.html"
}

export function editClientInfo(clientID) {
  changeWindowToEdit()
  const client = getClient(clientID)
  showExistingData(client)
}

function showExistingData(client) {
  editNameField.setAttribute("placeholder", client.name)
  editEmailField.setAttribute("placeholder", client.email)
  editPhoneField.setAttribute("placeholder", client.phone)
  editCompanyField.setAttribute("placeholder", client.company)
}

function submitForm(clientData) {
  editClient(clientData)
}

