

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

export function clientExists(clientEmail) {
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



