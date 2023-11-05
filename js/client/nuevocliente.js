import { ValidateClient } from './ValidateClient.js'
import { createClient } from "./Client.js";
import { addClient, clientExists } from "../../db/ClientsObjectStore.js"

const submitButton = document.getElementById("submitButton")
const name = document.getElementById("name")
const email = document.getElementById("email")
const phone = document.getElementById("phone")
const company = document.getElementById("company")


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

name.addEventListener("blur", function (e) {
  formBlurHandler(formData, formValid, e.target)
})
email.addEventListener("blur", function (e) {
  formBlurHandler(formData, formValid, e.target)
})
phone.addEventListener("blur", function (e) {
  formBlurHandler(formData, formValid, e.target)
})
company.addEventListener("blur", function (e) {
  formBlurHandler(formData, formValid, e.target)
})
submitButton.addEventListener("click", function (e) {
  e.preventDefault()
  submitForm(formData, formValid)
})

function formBlurHandler(formData, formValid, target) {
  const fieldValue = target.value

  switch (target.id) {
    case "name": {
      formValid.nameValid = ValidateClient.validName(fieldValue)
      if (!formValid.nameValid) { alertField(target) } else { removeAlert(target); formData.name = fieldValue }
      break
    }
    case "email": {
      formValid.emailValid = ValidateClient.validEmail(fieldValue)
      if (!formValid.emailValid) { alertField(target) } else { removeAlert(target); formData.email = fieldValue }
      break
    }
    case "phone": {
      formValid.phoneValid = ValidateClient.validPhone(fieldValue)
      if (!formValid.phoneValid) { alertField(target) } else { removeAlert(target); formData.phone = fieldValue }
      break
    }
    case "company": {
      formValid.companyValid = ValidateClient.validCompany(fieldValue)
      if (!formValid.companyValid) { alertField(target) } else { removeAlert(target); formData.company = fieldValue}
      break
    }
  }
  validForm(formValid)
  toggleSubmit(formValid, submitButton)
}

  export function alertField(form) {
  const alert = document.getElementById(`${form.id}.alert`)
  if (alert !== null) {
    alert.remove()
  }

  const fieldAlert = document.createElement("P")

  fieldAlert.innerText = `The ${form.id} you provided is invalid`
  fieldAlert.classList.add('bg-red-600', 'text-xs', 'text-white', 'p-2', 'text-center')
  fieldAlert.setAttribute("id", `${form.id}.alert`)

  form.parentElement.appendChild(fieldAlert)
}

export function removeAlert(form) {
  const alert = document.getElementById(`${form.id}.alert`)
  if (alert !== null) {
    alert.remove()
  }
}

export function validForm(form) {
  form.valid = form.nameValid &&
    form.companyValid &&
    form.emailValid &&
    form.companyValid
}

export function resetFormValid(formValid) {
  formValid.nameValid = false
  formValid.emailValid = false
  formValid.phoneValid = false
  formValid.companyValid = false
  formValid.valid = false
}

export function resetFormData(formData) {
  formData.name = null
  formData.email = null
  formData.phone = null
  formData.company = null
}
export function toggleSubmit(form, submit) {
  if (form.valid) {
    submit.removeAttribute("disabled")
    submit.setAttribute("class", "bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold")
  } else {
    submit.setAttribute("disabled", true)
    submit.setAttribute("class", "bg-grey-600 hover:bg-grey-900 w-full mt-5 p-2 text-white uppercase font-bold")
  }
}


function submitForm(formData, formValid) {
  const client = createClient(formData)
  if (!clientExists(client.email)) {
    addClient(client)
  } else {
    console.log("Client already exists")
  }
  resetFormData(formData)
  resetFormValid(formValid)
}

