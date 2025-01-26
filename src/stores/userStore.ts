// src/stores/userStore.ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: localStorage.getItem('userId') || '', // Retrieve from localStorage if it exists
  }),
  actions: {
    setUserId(id: string) {
      this.userId = id;
      localStorage.setItem('userId', id); // Save to local storage
    },
    resetStore() {
      // Reset the userId to an empty string
      this.userId = '';
      
      // Clear the userId from localStorage as well
      localStorage.removeItem('userId');
    },
  },
});
