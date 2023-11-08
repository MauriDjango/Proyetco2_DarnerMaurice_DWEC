import { clientObjectStore } from '../db/ClientsObjectStore.js'
import { localStorageClientKey } from './clientes.js'
import { formBlurHandler, toggleSubmit, validForm } from './nuevocliente.js'



document.addEventListener("DOMContentLoaded", function() {
  console.log("Edit client loaded")
  const editButton = document.getElementById("editButton")
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

  const originalClientData = JSON.parse(localStorage.getItem(localStorageClientKey))
  loadExistingData(originalClientData)
  loadEventListeners()

  function loadEventListeners() {

    name.addEventListener("input", function (e) {
      formBlurHandler(formData, e.target)
      toggleSubmit(validForm(formData), editButton)
    })
    email.addEventListener("input", function (e) {
      formBlurHandler(formData, e.target)
      toggleSubmit(validForm(formData), editButton)
    })
    phone.addEventListener("input", function (e) {
      formBlurHandler(formData, e.target)
      toggleSubmit(validForm(formData), editButton)
    })
    company.addEventListener("input", function (e) {
      formBlurHandler(formData, e.target)
      toggleSubmit(validForm(formData), editButton)
    })
    editButton.addEventListener("click", async function (e) {
      e.preventDefault()
      await submitForm(originalClientData,formData)
    })
  }

  function loadExistingData(clientData) {
    name.value = clientData.name
    email.value = clientData.email
    phone.value = clientData.phone
    company.value = clientData.company

    formData.name = clientData.name
    formData.email = clientData.email
    formData.phone = clientData.phone
    formData.company = clientData.company
  }

  async function submitForm(originalClientData, clientData) {
    console.log("Original Client data", originalClientData,"Client Data", clientData)
    if (await clientObjectStore.clientExists(clientData.email)) {
      console.log("Client exists submitting form")
      await clientObjectStore.editClient(clientData)
    } else {
      console.log("Client does not exist submitting form")
      await clientObjectStore.removeClient(originalClientData.email)
      await clientObjectStore.addClient(clientData)
    }
  }
})


