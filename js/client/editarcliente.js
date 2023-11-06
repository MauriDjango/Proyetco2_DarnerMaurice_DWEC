import { ClientObjectStore, getDB } from '../db/ClientsObjectStore.js'
import { formBlurHandler, loadEventListeners } from './nuevocliente.js'


let clientObjectStore
getDB()
.then((db) => {
  clientObjectStore = new ClientObjectStore(db)
})
.catch((error) => {
  console.error(error)
})

document.addEventListener("DOMContentLoaded", function() {

  loadEventListeners()
})

function changeWindowToEdit() {
  window.location.href = "editar-cliente.html"
}

export function editClientInfo(clientID) {
  changeWindowToEdit()
  const client = clientObjectStore.getClient(clientID)
  showExistingData(client)
}

function showExistingData(client) {
  name.setAttribute("placeholder", client.name)
  email.setAttribute("placeholder", client.email)
  phone.setAttribute("placeholder", client.phone)
  company.setAttribute("placeholder", client.company)
}

function submitForm(clientData) {
  clientObjectStore.editClient(clientData)
}

