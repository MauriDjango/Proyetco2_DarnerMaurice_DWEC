import { clientObjectStore } from '../db/ClientsObjectStore.js'

export const localStorageClientKey = "clientDataEdit"

document.addEventListener("DOMContentLoaded", function () {
    const clientListHTML = document.getElementById("listado-clientes")

    loadEventListeners()

    function loadEventListeners() {

        clientListHTML.addEventListener("click", async (e) => {
            await clickHandler(e.target, clientListHTML)
        })
        clientObjectStore.getAllClients().then((clients) => {
            renderClientList(clients, clientListHTML)
        })
    }
})

async function clickHandler (clientRow, clientListHTML) {
    if (clientRow.id.includes("edit")) {
        const clientData = await clientObjectStore.getClient(clientRow.id.split("-")[0])
        console.log("getClient", clientData)
        localStorage.setItem(localStorageClientKey, JSON.stringify(clientData))
        window.location.href = "editar-cliente.html"
    } else if (clientRow.id.includes("delete")) {
        clientObjectStore.removeClient(clientRow.id.split("-")[0]).then(r =>
          clientObjectStore.getAllClients().then((clients) => {
              renderClientList(clients, clientListHTML)
          })
        )
    }
}

function renderClientList(clients, clientListHTML) {
    console.log("Render clients list", clients)
    clientListHTML.innerHTML = ""

    for (const client of clients) {
        let row = document.createElement('tr')

        row.innerHTML = `
        <td>${client.name}</td>
        <td>${client.phone}</td>
        <td>${client.email}</td>
        <td>${client.company}
        <td><button type="button" id="${client.email}-edit">Edit</button></td>
        <td><button type="button" id="${client.email}-delete">Delete</button></td>
        `

        clientListHTML.appendChild(row)
    }
}


