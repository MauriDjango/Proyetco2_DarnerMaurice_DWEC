# IndexedDB Cheatsheet

IndexedDB is a low-level, web-based database technology that allows web applications to store and manage structured data
on a user's web browser. It provides a way for web developers to create, read, update, and delete data within a 
client-side database. IndexedDB is particularly well-suited for scenarios where web applications need to work with large
amounts of data, support offline access, and efficiently query and retrieve information.
## Configuration:

1. **Opening a Database:**

```javascript
const request = indexedDB.open('MyDatabase', 1);
request.onsuccess = function(event) {
const db = event.target.result;
};
```

2. Creating an Object Store:

```javascript
const objectStore = db.createObjectStore('MyStore', { keyPath: 'id' });
```

## Basic Operations

1. Adding Data:

```javascript
store.add({ id: 1, name: 'Item 1' });
```

2. Retrieving Data:

```javascript
const request = store.get(1);
const result = event.target.result;
};
````

3. Updating Data:

```javascript
store.put({ id: 1, name: 'Updated Item 1' });
```

4. Deleting Data:

```javascript
store.delete(1);
```
## Advanced Operations

Transactions:
- Use transactions to group multiple database operations into a single unit of work.

Indexes and Queries:
- Create indexes on object store properties to perform efficient queries.

````javascript
const nameIndex = store.index('nameIndex');
````
Cursors:
- Use cursors to iterate through records in an object store.
```javascript
const query = nameIndex.openCursor(IDBKeyRange.only('ProductA'));

query.onsuccess = function(event) {
    const cursor = event.target.result;
    if (cursor) {
      console.log('Product ID: ' + cursor.primaryKey);
      console.log('Product Name: ' + cursor.value.name);
      console.log('Product Price: ' + cursor.value.price);
      cursor.continue();
    } else {
      console.log('No more results');
    }
};

transaction.oncomplete = function() {
db.close();
};

```

Version Changes:
- Handle version changes when updating the database schema.
````javascript
request.onupgradeneeded = function(event) {
const db = event.target.result;

// Check the old version to determine the schema changes needed
const oldVersion = event.oldVersion;

// Upgrade the schema based on the old version
if (oldVersion < 1) {
// Create the object store if it doesn't exist
const objectStore = db.createObjectStore('Products', { keyPath: 'id' });
objectStore.createIndex('nameIndex', 'name', { unique: false });
}

if (oldVersion < 2) {
// Add a new object store for orders
db.createObjectStore('Orders', { keyPath: 'orderID', autoIncrement: true });
}
};
````

## Best Practices:

- Proper error handling and fallback mechanisms.
````javascript
request.onsuccess = function(event) { //Some funciton if it works }
request.onerror = function(event) { //Some funciton if the request threw an error }
````
- Avoid blocking the main thread with long-running operations.
- Limit the use of IndexedDB to small to medium-sized datasets.

>**Use Cases**:
Offline Web Apps, Client-Side Caching, Progressive Web Apps, User Preferences, Data Synchronization
, Local Databases for Games, Content Management, Shopping Carts and E-commerce, Note-Taking Apps
, Local API Caching, Collaborative Apps

[Mozzila Web Docs - IndexedDB_API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)