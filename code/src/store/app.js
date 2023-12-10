// Utilities
import { defineStore } from 'pinia'
import { toRaw } from 'vue'

export const useAppStore = defineStore('app', {
  state: () => ({
    db: null,
    entries: []
  }),
  getters: {
    getEntryById(state) {
      return (id) => state.entries.find((entry) => entry.id == id)
    }
  },
  actions: {
      initialize() {
        const request = indexedDB.open("webdiary", 1);

        request.onerror = (event) => {
          console.error(`Database error: ${event.target.errorCode}`);
        };
        request.onsuccess = (event) => {
          this.db = event.target.result;
          this.load();
        };
        request.onupgradeneeded = (event) => {
          this.db = event.target.result;

          // initialize object store
          const objectStore = this.db.createObjectStore("entries", { keyPath: "id" });

          objectStore.transaction.oncomplete = (event) => {
            this.load();
          };
        };
      },
      load() {
        this.db.transaction("entries").objectStore("entries").getAll().onsuccess = (event) => {
          for (var e of event.target.result) {
            // keep initial array
            this.entries.push(e);
          };
        }
      },
      remove(entry) {
         this.entries.remove(entry);
         this.db.transaction("entries", "readwrite").objectStore("entries").delete(entry.id);
      },
      add(entry) {
          this.entries.push(entry);
          this.db.transaction("entries", "readwrite").objectStore("entries").add(toRaw(entry));
      },
      update(entry, newComment) {
          entry.comment = newComment;
          this.db.transaction("entries", "readwrite").objectStore("entries").put(toRaw(entry));
      }
  }
})
