import { ClientObjectStore, getDB } from '../db/ClientsObjectStore.js'

const clientListHTML = document.getElementById("listado-clientes")
let clientObjectStore
getDB()
.then((db) => {
    clientObjectStore = new ClientObjectStore(db)
})
.catch((error) => {
    console.error(error)
})

document.addEventListener("DOMContentLoaded", function () {
    loadEventListeners(clientListHTML)
})

function loadEventListeners(clientListHTML) {
    const showClientButton = document.getElementById("showClients")

    document.addEventListener("click", (e) => {
        clickHandler(e.target)
    })
    showClientButton.addEventListener('click', function (e) {
        clientObjectStore.getAllClients().then((clients) => {
            renderClientList(clients, clientListHTML)

        })
    })
}

function clickHandler(clientRow, clientListHTML) {
    if (clientRow.id.includes("edit"))
    {
        window.location.href = "editar-cliente.html"
/*
        editClientInfo(clientRow.id.split("-")[0])
*/
        clientObjectStore.getAllClients().then((clients) => {
            renderClientList(clients, clientListHTML)
        })
    }
    else if (clientRow.id.includes("delete"))
    {
        clientObjectStore.removeClient(clientRow.id.split("-")[0])
        clientObjectStore.getAllClients().then((clients) => {
            renderClientList(clients, clientListHTML)
        })
    }
}

function renderClientList(clients, clientListHTML) {
    console.log("Render clients list", clients)
    clientListHTML.innerHTML = ""

    for (const client of clients) {
        let row = document.createElement('tr')

        const clientName = client.name || "N/A"; // Provide a default value if name is null
        row.innerHTML = `
        <td>${clientName}</td>
        <td>${client.email}</td>
        <td>${client.phone}</td>
        <td>${client.company}
        <td><button type="button" id="${client.email}-edit">Edit</button></td>
        <td><button type="button" id="${client.email}-delete">Delete</button></td>
        `

        clientListHTML.appendChild(row)
    }
}


