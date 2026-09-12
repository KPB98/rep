(function () {
  const DATABASE = 'rep-database';
  const STORE = 'app-state';
  let databasePromise;
  let writeQueue = Promise.resolve();

  function openDatabase() {
    if (!('indexedDB' in window)) return Promise.reject(new Error('IndexedDB is unavailable'));
    if (!databasePromise) {
      databasePromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(DATABASE, 1);
        request.onupgradeneeded = () => request.result.createObjectStore(STORE);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }
    return databasePromise;
  }

  async function readIndexedDB(key) {
    const database = await openDatabase();
    return new Promise((resolve, reject) => {
      const request = database.transaction(STORE, 'readonly').objectStore(STORE).get(key);
      request.onsuccess = () => resolve(request.result ?? null);
      request.onerror = () => reject(request.error);
    });
  }

  async function writeIndexedDB(key, value) {
    const database = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(STORE, 'readwrite');
      transaction.objectStore(STORE).put(value, key);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
  }

  async function load(key) {
    try {
      const saved = await readIndexedDB(key);
      if (saved) return saved;
    } catch (error) {
      console.warn('IndexedDB read failed; using localStorage.', error);
    }

    const legacy = localStorage.getItem(key);
    if (!legacy) return null;

    try {
      const value = JSON.parse(legacy);
      await save(key, value);
      return value;
    } catch (error) {
      console.warn('Saved Rep data could not be read.', error);
      return null;
    }
  }

  function save(key, value) {
    const snapshot = structuredClone(value);
    writeQueue = writeQueue.then(async () => {
      try {
        await writeIndexedDB(key, snapshot);
        localStorage.removeItem(key);
      } catch (error) {
        console.warn('IndexedDB write failed; using localStorage.', error);
        localStorage.setItem(key, JSON.stringify(snapshot));
      }
    });
    return writeQueue;
  }

  window.RepStorage = { load, save };
})();
