import { clientObjectStore } from '../db/ClientsObjectStore.js'
import { changeWindow } from './clientFormFunctions.js'

export const localStorageClientKey = "clientDataEdit"

document.addEventListener("DOMContentLoaded", function () {
    const clientListHTML = document.getElementById("listado-clientes");

    // Load event listeners when the DOM is ready
    loadEventListeners();

    function loadEventListeners() {
        // Add click event listener to the client list
        clientListHTML.addEventListener("click", async (e) => {
            await clickHandler(e.target, clientListHTML);
        });

        // Fetch all clients from the object store and render the list
        clientObjectStore.getAllClients().then((clients) => {
            renderClientList(clients, clientListHTML);
        });
    }
});

async function clickHandler(clientRow, clientListHTML) {
    if (clientRow.id.includes("edit")) {
        // Handle "Edit" button click
        const clientData = await clientObjectStore.getClient(clientRow.id.split("-")[0]);
        localStorage.setItem(localStorageClientKey, JSON.stringify(clientData));
        changeWindow("editar-cliente.html"); // Redirect to the edit client page
    } else if (clientRow.id.includes("delete")) {
        // Handle "Delete" button click
        clientObjectStore.removeClient(clientRow.id.split("-")[0]).then(() => {
            // After deleting, fetch and render the updated client list
            clientObjectStore.getAllClients().then((clients) => {
                renderClientList(clients, clientListHTML);
            });
        });
    }
}

function renderClientList(clients, clientListHTML) {
    console.log("Render clients list", clients);
    clientListHTML.innerHTML = "";

    for (const client of clients) {
        let row = document.createElement('tr');

        row.innerHTML = `
        <td>${client.name}</td>
        <td>${client.phone}</td>
        <td>${client.email}</td>
        <td>${client.company}
        <td><button type="button" id="${client.email}-edit">Edit</button></td>
        <td><button type="button" id="${client.email}-delete">Delete</button></td>
        `;

        clientListHTML.appendChild(row);
    }
}
