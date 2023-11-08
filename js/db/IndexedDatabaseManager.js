

// A class for managing IndexedDB operations
class IndexedDBManager {
  _dbName;

  // Constructor to initialize the database name
  constructor(dbName) {
    this._dbName = dbName;
  }

  // Opens the IndexedDB database with an optional version
  openDB(dbVersion = 1) {
    console.log('Opening IndexedDB');
    const request = indexedDB.open(this._dbName, dbVersion);
    return new Promise(function(resolve, reject) {

      // Event handler for database upgrade (schema change)
      request.onupgradeneeded = (event) => {
        console.log("Database updated successfully");
        resolve(event.target.result);
      };

      // Event handler for successful database opening
      request.onsuccess = (event) => {
        console.log("Database opened successfully");
        resolve(event.target.result);
      };

      // Event handler for database opening error
      request.onerror = (event) => {
        console.error("Error opening the database", event.error);
        reject("Error opening the database", event.error);
      };
    });
  }

  // Closes the IndexedDB database
  closeDB(idb) {
    idb.close();
    console.log("Database closed")
  }
}

// Name for the IndexedDB database
const clientIDBManName = 'Client IBD';

// Create an instance of the IndexedDBManager
export const clientIDBManager = new IndexedDBManager(clientIDBManName);
