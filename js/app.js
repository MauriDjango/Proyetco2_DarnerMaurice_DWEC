/*


let db
const dbName = "clientDB"
const dbVersion = 1
const clientObjectStoreName = "clientObjectStore"
const request = indexedDB.open(dbName, dbVersion)


request.onupgradeneeded = (event) => {
    db = event.target.result;

    if (!db.objectStoreNames.contains(clientObjectStoreName)) {
        const clientObjectStore = db.createObjectStore(clientObjectStoreName, { keyPath: "email" });

        clientObjectStore.createIndex("name", "name", { unique: false });
        clientObjectStore.createIndex("email", "email", { unique: true });
        clientObjectStore.createIndex("phone", "phone", { unique: false });
        clientObjectStore.createIndex("company", "company", { unique: false });

        console.log("Object store 'clientObjectStore' created or upgraded.");
    }
};

request.onsuccess = (event) => {
    db = event.target.result
    console.log("Database opened successfully")
}

export function addClient(client) {
    console.log("addClient", client)
    const transaction = db.transaction(clientObjectStoreName, "readwrite")
    const clientObjectStore = transaction.objectStore(clientObjectStoreName)
    const request = clientObjectStore.add(client)
    request.onsuccess = (event) => {
        console.log("Client successfully added")
    }
    request.onerror = (event) => {
        console.log("Unable to add client", event.target.error)
    }
}

export function getClient(clientEmail) {
    const transaction = db.transaction(clientObjectStoreName, "readwrite")
    const clientObjectStore = transaction.objectStore(clientObjectStoreName)
    const request = clientObjectStore.get(clientEmail)

    request.onsuccess = (event) => {
        console.log("Client successfully fetched")
    }
    request.onerror = (event) => {
        console.log("Unable to fetch client", event.target.error)
    }
    return request.result
}

export function removeClient(clientEmail) {
    const transaction = db.transaction(clientObjectStoreName, "readwrite")
    const clientObjectStore = transaction.objectStore(clientObjectStoreName)
    const request = clientObjectStore.delete(clientEmail)

    request.onsuccess = (event) => {
        console.log("Client successfully deleted")
    }
    request.onerror = (event) => {
        console.log("Unable to delete client", event.target.error)
    }
}

export function editClient(clientData) {
    const client = getClient(clientData.email)

    const transaction = db.transaction(clientObjectStoreName, "readwrite")
    const clientObjectStore = transaction.objectStore(clientObjectStoreName)

    client.name = clientData.name
    client.email = clientData.email
    client.phone = clientData.phone
    client.company = clientData.company

    const request = clientObjectStore.put(client)
    request.onsuccess = (event) => {
        console.log("Client successfully edited")
    }
    request.onerror = (event) => {
        console.log("Unable to edit client", event.target.error)
    }
}

function clientExists(clientEmail) {
    const transaction = db.transaction(clientObjectStoreName, "readwrite")
    const clientObjectStore = transaction.objectStore(clientObjectStoreName)
    const request = clientObjectStore.get(clientEmail)
    let exists = false

    request.onsuccess = (event) => {
        console.log("Client exists")
        exists =  true
    }
    request.onerror = (event) => {
        console.log("Client does not exist", event.target.error)
        exists = false
    }
    return exists
}

export function getAllClients(callback) {
    const transaction = db.transaction(clientObjectStoreName, "readonly");
    const clientObjectStore = transaction.objectStore(clientObjectStoreName);
    const request = clientObjectStore.getAll();

    request.onsuccess = (event) => {
        const clients = event.target.result;
        console.log("Successfully retrieved all clients");
        if (typeof callback === "function") {
            callback(clients);
        }
    };

    request.onerror = (event) => {
        console.log("Unable to retrieve all clients", event.target.error);
        if (typeof callback === "function") {
            callback(event.target.error, null);
        }
    }
}

const clientListHTML = document.getElementById("listado-clientes")
const showClientButton = document.getElementById("showClients")

document.addEventListener("click", (e) => {
    clickHandler(e.target)
})
showClientButton.addEventListener('click', function(e) {
    getAllClients(renderClientList)
})

function clickHandler(clientRow) {
    if (clientRow.id.includes("edit"))
    {
        editClientInfo(clientRow.id.split("-")[0])
        getAllClients(renderClientList)
    }
    else if (clientRow.id.includes("delete"))
    {
        removeClient(clientRow.id.split("-")[0])
        getAllClients(renderClientList)
    }
}

function renderClientList(clients) {
    clientListHTML.innerHTML = ""

    for (const client of clients) {
        let row = document.createElement('tr')

        row.innerHTML = `
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td>${client.phone}</td>
        <td>${client.company}
        <td><button type="button" id="${client.email}-edit">Edit</button></td>
        <td><button type="button" id="${client.email}-delete">Delete</button></td>
        `

        clientListHTML.appendChild(row)
    }
}

function createClient (clientData) {
    return {
        name: clientData.name,
        email: clientData.email,
        phone: clientData.phone,
        company: clientData.company,
    }
}

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

function removeAlert(form) {
    const alert = document.getElementById(`${form.id}.alert`)
    if (alert !== null) {
        alert.remove()
    }
}

function validForm(form) {
    form.valid = form.nameValid &&
        form.companyValid &&
        form.emailValid &&
        form.companyValid
}

function resetFormValid(formValid) {
    formValid.nameValid = false
    formValid.emailValid = false
    formValid.phoneValid = false
    formValid.companyValid = false
    formValid.valid = false
}

function resetFormData(formData) {
    formData.name = null
    formData.email = null
    formData.phone = null
    formData.company = null
}

function toggleSubmit(form, submit) {
    if (form.valid) {
        submit.removeAttribute("disabled")
        submit.setAttribute( "class", "bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold")
    } else {
        submit.setAttribute("disabled", true)
        submit.setAttribute("class", "bg-grey-600 hover:bg-grey-900 w-full mt-5 p-2 text-white uppercase font-bold")
    }
}


const editNameField = document.getElementById("name")
const editEmailField = document.getElementById("email")
const editPhoneField = document.getElementById("phone")
const editCompanyField = document.getElementById("company")
const submitButton = document.getElementById("submitButton")

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
            formValid.nameValid = validName(editFieldValue)
            if (!formValid.nameValid) { editAlert(target) } else { removeEditAlert(target); formData.name = editFieldValue }
            break
        }
        case "email": {
            formValid.emailValid = ValidateClient.validEmail(editFieldValue)
            if (!formValid.emailValid) { editAlert(target) } else { removeEditAlert(target); formData.email = editFieldValue }
            break
        }
        case "phone": {
            formValid.phoneValid = ValidateClient.validPhone(editFieldValue)
            if (!formValid.phoneValid) { editAlert(target) } else { removeEditAlert(target); formData.phone = editFieldValue }
            break
        }
        case "company": {
            formValid.companyValid = ValidateClient.validCompany(editFieldValue)
            if (!formValid.companyValid) { editAlert(target) } else { removeEditAlert(target); formData.company = editFieldValue}
            break
        }
    }
    validForm(formValid)
    toggleSubmit(formValid, submitButton)
}

function editAlert(form) {
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

function removeEditAlert(form) {
    const alert = document.getElementById(`${form.id}.alert`)
    if (alert !== null) {
        alert.remove()
    }
}

function changeWindowToEdit() {
    window.location.href = "editar-cliente.html"
}

function editClientInfo(clientID) {
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

const nameRegex = /(\w+)\s+(\w+)\s+(\w+)/
//This is a simplified email regex for the purposes of this project
const emailRegex = /\S+@\S+[.\S]+/
const phoneRegex = /[0-9]{9}/
const companyRegex = /[\w\s]+/

class ValidateClient {
    static validName (name) { return nameRegex.test(name) }

    static validEmail (email) { return emailRegex.test(email) }

    static validPhone (phone) { return phoneRegex.test(phone) }

    static validCompany (company) { return companyRegex.test(company) }

    static validAll (name, email, phone, company) {
        return ValidateClient.validName(name) &&
            ValidateClient.validEmail(email) &&
            ValidateClient.validPhone(phone) &&
            ValidateClient.validCompany();
    }
}

*/
