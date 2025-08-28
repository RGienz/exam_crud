import { defineStore } from 'pinia';

interface User {
  id: string;
  fullname: string;
  email: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
  }),
  actions: {
    setUser(userData: User) {
      this.user = userData;
      this.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(userData));
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    initializeStore() {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          this.user = JSON.parse(storedUser) as User;
          this.isAuthenticated = true;
        } catch (e) {
          console.error("Failed to parse user data from local storage", e);
          this.logout();
        }
      }
    }
  },
  getters: {
    getUser: (state) => state.user,
    getIsAuthenticated: (state) => state.isAuthenticated,
  },
});