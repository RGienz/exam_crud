import { defineStore } from 'pinia';

interface User {
  fullname: string;
  email: string;
}

interface UserState {
  user: User | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
  }),

  actions: {
    setUser(user: User) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    
    loadUser() {
      const user = localStorage.getItem('user');
      if (user) {
        this.user = JSON.parse(user);
      }
    },

    clearUser() {
      this.user = null;
      localStorage.removeItem('user');
    },
  },

  getters: {
    isLoggedIn: (state) => !!state.user,
  },
});
