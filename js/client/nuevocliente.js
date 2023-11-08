import { ValidateClient } from './ValidateClient.js'
import { createClient } from "./Client.js";
import { clientObjectStore } from '../db/ClientsObjectStore.js'

//TODO refactor onBlur to onInput because it will be nicer
document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submitButton")
  const name = document.getElementById("name")
  const email = document.getElementById("email")
  const phone = document.getElementById("phone")
  const company = document.getElementById("company")
  const formData = {
    name: null,
    email: null,
    phone: null,
    company: null
  }

  loadEventListeners()

  function loadEventListeners() {

    //onblur event can only be added to focusable elements
    name.addEventListener("input", function (e) {
      formBlurHandler(formData, e.target)
      toggleSubmit(validForm(formData), submitButton)
    })
    email.addEventListener("input", function (e) {
      formBlurHandler(formData, e.target)
      toggleSubmit(validForm(formData), submitButton)
    })
    phone.addEventListener("input", function (e) {
      formBlurHandler(formData, e.target)
      toggleSubmit(validForm(formData), submitButton)
    })
    company.addEventListener("input", function (e) {
      formBlurHandler(formData, e.target)
      toggleSubmit(validForm(formData), submitButton)
    })
    submitButton.addEventListener("click", async function (e) {
      e.preventDefault()
      await submitForm(formData)
    })
  }
})

  export function formBlurHandler(formData, target) {
    const fieldValue = target.value

    switch (target.id) {
      case "name": {
        if (ValidateClient.validName(fieldValue)) {
          removeAlert(target)
          formData.name = fieldValue
        } else {
          alertField(target)
        }
        break
      }
      case "email": {
        if (ValidateClient.validEmail(fieldValue)) {
          removeAlert(target)
          formData.email = fieldValue
        } else {
          alertField(target)
        }
        break
      }
      case "phone": {
        if (ValidateClient.validPhone(fieldValue)) {
          removeAlert(target)
          formData.phone = fieldValue
        } else {
          alertField(target)
        }
        break
      }
      case "company": {
        if (ValidateClient.validCompany(fieldValue)) {
          removeAlert(target)
          formData.company = fieldValue
        } else {
          alertField(target)
        }
        break
      }
    }
  }

  function alertField(form) {
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

  export function validForm(formData) {
   return formData.name !== null &&
     formData.phone !== null &&
     formData.email !== null &&
     formData.company !== null
  }

  function resetFormData(formData) {
    formData.name = null
    formData.email = null
    formData.phone = null
    formData.company = null
  }

  export function toggleSubmit(formValid, submitButton) {
    if (formValid) {
      submitButton.removeAttribute("disabled")
      submitButton.setAttribute("class", "bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold")
    } else {
      submitButton.setAttribute("disabled", true)
      submitButton.setAttribute("class", "bg-grey-600 hover:bg-grey-900 w-full mt-5 p-2 text-white uppercase font-bold")
    }
  }

  async function submitForm (formData) {
    const client = createClient(formData)
    console.log("Submitting client")
    await clientObjectStore.addClient(client)
    resetFormData(formData)
  }




