

export function getDB() {
    console.log('Call to getDB')
    return new Promise((resolve, reject) => {
        const dbName = "IDB";
        const dbVersion = 3;
        const request = indexedDB.open(dbName, dbVersion);

        console.log("Processing request")
        request.onupgradeneeded = (event) => {
            console.log("Upgrading DB");
            const db = event.target.result;
            resolve(db); // Resolve the promise with the database object
            console.log("Database updated successfully");

            // Set up your database schema and initial data here if needed

            // Event listeners for success and error should be outside onupgradeneeded
        };
        request.onsuccess = (event) => {
            const db = event.target.result;
            resolve(db); // Resolve the promise with the database object
            console.log("Database opened successfully");
        };
        request.onerror = (event) => {
            reject(event.error); // Reject the promise with the error
            console.error("Error opening the database", event.error);
        };
    });
}


export class ClientObjectStore {

    _objectStoreName = "clientObjectStore"

    constructor(db) {
        this._db = db;
        this._objectStore = null;
        this._transaction = null;

        console.log("Initializing ClientObjectStore", db);

        // You can use a separate method to create the object store when needed
        this.initializeObjectStore();
    }

    initializeObjectStore() {
        if (!this._db.objectStoreNames.contains(this._objectStoreName)) {
            this._objectStore = this._db.createObjectStore(this._objectStoreName, { keyPath: "email" });

            // Create indexes here if needed
            this._objectStore.createIndex("name", "name",
              { unique: false });
            this._objectStore.createIndex("email", "email",
              { unique: true });
            this._objectStore.createIndex("phone", "phone",
              { unique: false });
            this._objectStore.createIndex("company", "company",
              { unique: false });

            console.log("Object store 'clientObjectStore' created");
        } else {
            console.log("Object store 'clientObjectStore' already exists")
        }
    }

    addClient (client) {
        const transaction = this._db.transaction([this._objectStoreName], "readwrite")
        const clientObjectStore = transaction.objectStore(this._objectStoreName)
        const request = clientObjectStore.add(client)

        request.onsuccess = (event) => {
            console.log("Client successfully added")
        }
        request.onerror = (event) => {
            console.log("Unable to add client", event.target.error)
        }
    }

    getClient (clientEmail) {
        const transaction = this._db.transaction([this._objectStoreName], "readonly")
        const clientObjectStore = transaction.objectStore(this._objectStoreName)
        const request = clientObjectStore.get(clientEmail)

        request.onsuccess = (event) => {
            console.log("Client successfully fetched")
        }
        request.onerror = (event) => {
            console.log("Unable to fetch client", event.target.error)
        }
        return request.result
    }

    removeClient (clientEmail) {
        const transaction = this._db.transaction([this._objectStoreName], "readwrite")
        const clientObjectStore = transaction.objectStore(this._objectStoreName)
        const request = clientObjectStore.delete(clientEmail)

        request.onsuccess = (event) => {
            console.log("Client successfully deleted")
        }
        request.onerror = (event) => {
            console.log("Unable to delete client", event.target.error)
        }
    }

    editClient (clientData) {
        const transaction = this._db.transaction([this._objectStoreName], "readwrite")
        const clientObjectStore = transaction.objectStore(this._objectStoreName)
        const request = clientObjectStore.put(clientData)

        request.onsuccess = (event) => {
            console.log("Client successfully edited")
        }
        request.onerror = (event) => {
            console.log("Unable to edit client", event.target.error)
        }
    }

    clientExists (clientEmail) {
        const transaction = this._db.transaction([this._objectStoreName], "readonly")
        const clientObjectStore = transaction.objectStore(this._objectStoreName)
        const request = clientObjectStore.get(clientEmail)
        let exists = false

        request.onsuccess = (event) => {
            console.log("Client exists")
            exists = true
        }
        request.onerror = (event) => {
            console.log("Client does not exist", event.target.error)
            exists = false
        }
        return exists
    }

    async getAllClients () {
        const transaction = this._db.transaction([this._objectStoreName], "readonly")
        const clientObjectStore = transaction.objectStore(this._objectStoreName)
        const request = clientObjectStore.getAll();

        const clients = request.onsuccess = (event) => {
            console.log("Successfully retrieved all clients");
            return event;
        };

        request.onerror = (event) => {
            console.log("Unable to retrieve all clients", event.target.error);
        }

        return clients
    }
}




