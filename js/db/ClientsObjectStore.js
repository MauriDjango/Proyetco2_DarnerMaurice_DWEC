import { clientIDBManager } from './DatabaseFactory.js';

export class ObjectStore {
    _objectStoreName;
    _idbManager;

    constructor(idbManager, objectStoreName) {
        this._idbManager = idbManager;
        this._objectStoreName = objectStoreName;

        // You can use a separate method to create the object store when needed
        this.initializeObjectStore();
    }

    async initializeObjectStore() {
        console.log("Initializing object store:", this._objectStoreName);
        const db = await this._idbManager.openDB();
        console.log("Active database:", db, "Object store names:", db.objectStoreNames);
        if (!db.objectStoreNames.contains(this._objectStoreName)) {
            const store = db.createObjectStore(this._objectStoreName, { keyPath: "email" });

            // Create indexes here if needed
            store.createIndex("name", "name", { unique: false });
            store.createIndex("email", "email", { unique: true });
            store.createIndex("phone", "phone", { unique: false });
            store.createIndex("company", "company", { unique: false });

            console.log("Object store '" + this._objectStoreName + "' created");
        } else {
            console.log("Object store '" + this._objectStoreName + "' already exists");
        }
        this._idbManager.closeDB(db);
    }

    async addClient(clientData) {
        const db = await this._idbManager.openDB();
        const transaction = db.transaction([this._objectStoreName], "readwrite");
        const objectStore = transaction.objectStore(this._objectStoreName);
        const result = objectStore.add(clientData);

        result.onsuccess = (event) => {
            console.log("Client added successfully");
            this._idbManager.closeDB(db);
        };
        result.onerror = (event) => {
            console.log("Error adding client:", event.error);
            this._idbManager.closeDB(db);
        };
    }

    async getClient(clientEmail) {
        const db = await this._idbManager.openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([this._objectStoreName], "readwrite");
            const objectStore = transaction.objectStore(this._objectStoreName);
            const result = objectStore.get(clientEmail);

            result.onsuccess = (event) => {
                console.log("Client fetched successfully:", event.target.result);
                this._idbManager.closeDB(db);
                resolve(event.target.result);
            };
            result.onerror = (event) => {
                console.log("Client not found:", event.error);
                reject(event.error);
                this._idbManager.closeDB(db);
            };
        });
    }

    async removeClient(clientEmail) {
        const db = await this._idbManager.openDB();
        const transaction = db.transaction([this._objectStoreName], "readwrite");
        const objectStore = transaction.objectStore(this._objectStoreName);
        const result = objectStore.delete(clientEmail);

        result.onsuccess = (event) => {
            console.log("Client deleted successfully");
            this._idbManager.closeDB(db);
        };
        result.onerror = (event) => {
            console.log("Error removing the client:", event.error);
            this._idbManager.closeDB(db);
        };
    }

    async editClient(clientData) {
        console.log("Editing client:", clientData);
        const db = await this._idbManager.openDB();
        const transaction = db.transaction([this._objectStoreName], "readwrite");
        const objectStore = transaction.objectStore(this._objectStoreName);
        const result = objectStore.put(clientData);

        result.onsuccess = (event) => {
            console.log("Client edited successfully");
            this._idbManager.closeDB(db);
        };
        result.onerror = (event) => {
            console.log("Error editing the client:", event.error);
            this._idbManager.closeDB(db);
        };
    }

    async clientExists(clientEmail) {
        console.log("Checking if client exists for clientEmail:", clientEmail);

        return new Promise(async (resolve, reject) => {
            const db = await this._idbManager.openDB();
            const transaction = db.transaction([this._objectStoreName], "readwrite");
            const objectStore = transaction.objectStore(this._objectStoreName);
            const result = objectStore.get(clientEmail);

            result.onsuccess = (event) => {
                if (event.target.result !== undefined) {
                    console.log("Client exists for clientEmail:", clientEmail);
                    resolve(true);
                } else {
                    console.log("Client does not exist for clientEmail:", clientEmail);
                    resolve(false);
                }
                this._idbManager.closeDB(db);
            };

            result.onerror = (event) => {
                console.log("Error checking if client exists:", event.error);
                this._idbManager.closeDB(db);
                reject(event.error);
            };
        });
    }

    async getAllClients() {
        return new Promise(async (resolve) => {
            const db = await this._idbManager.openDB();
            const transaction = db.transaction([this._objectStoreName], "readwrite");
            const objectStore = transaction.objectStore(this._objectStoreName);
            const result = objectStore.getAll();

            result.onsuccess = (event) => {
                console.log("Retrieved all clients successfully:", event.target.result);
                resolve(event.target.result);
                this._idbManager.closeDB(db);
            };
            result.onerror = (event) => {
                console.log("Error retrieving all clients:", event.error);
                this._idbManager.closeDB(db);
            };
        });
    }
}

const clientStoreName = "clientObjectStore";
export const clientObjectStore = new ObjectStore(clientIDBManager, clientStoreName);
