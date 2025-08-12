import localforage from "localforage";

localforage.config({
  name: "StorageEntertainmentWebApp",
  storeName: "StorageEntertainmentWebAppDataStore",
  version: 1.0,
  description: "Local storage for Frontend Mentor - Entertainment web app",
  size: 5 * 1024 * 1024, // 5MB
  driver: [localforage.WEBSQL, localforage.INDEXEDDB, localforage.LOCALSTORAGE],
});

export default localforage;
