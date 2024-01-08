import { create } from 'zustand';

export const useStore = create((set) => ({
  loginIsSuccessful: false,
  username: '',
  password: '',
  setLoginIsSuccessful: (value) => set({ loginIsSuccessful: value }),
  setUsername: (value) => set({ username: value }),
  setPassword: (value) => set({ password: value }),
}));
