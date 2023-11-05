import { getAllClients, removeClient } from "../../db/ClientsObjectStore.js"
import { editClientInfo } from "./editarcliente.js";


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


