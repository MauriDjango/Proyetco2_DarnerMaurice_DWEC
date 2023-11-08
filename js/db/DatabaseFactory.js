

class IndexedDBManager {
  _dbName

  constructor(dbName) {
    this._dbName = dbName;
  }

  openDB(dbVersion = 1) {
    const request = indexedDB.open(this._dbName, dbVersion);
    return new Promise(function(resolve, reject) {
      console.log('Opening IndexedDB')

      request.onupgradeneeded = (event) => {
        console.log("Database updated successfully");
        resolve(event.target.result)
      };
      request.onsuccess = (event) => {
        console.log("Database opened successfully");
        resolve(event.target.result)
      };
      request.onerror = (event) => {
        console.error("Error opening the database", event.error);
        reject("Error opening the database", event.error)
      };
    })
  }

  closeDB(idb) {
    idb.close();
  }
}

const clientIDBManName = 'Client IBD'
export const clientIDBManager = new IndexedDBManager(clientIDBManName)

