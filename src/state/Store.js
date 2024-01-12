import { create } from 'zustand';

export const createLoginSlice = (set) => ({
  loginIsSuccessful: false,
  username: '',
  password: '',
  accessToken: '',
  setLoginIsSuccessful: (value) => set({ loginIsSuccessful: value }),
  setUsername: (value) => set({ username: value }),
  setPassword: (value) => set({ password: value }),
  setAccessToken: (value) => set({ accessToken: value }),
})

export const createCurrentUserSlice = (set) => ({
    currentUser: {
      id: 0,
      name: '',
      password: '',
      roles: '',
      country: '',
      bio: '',
      languages: ''
    },
    setCurrentUser: (updatedUser) => set((state) => ({ currentUser: { ...state.currentUser, ...updatedUser } })),
})

export const createCurrentUserAppointmentsSlice = (set) => ({
    	appointments: [],
      setAppointments: (value) => set({ appointments: value }),
      usersInAppointments: [],
      setUsersInAppointments: (value) => set({ usersInAppointments: value }),
})

export const createOtherUsersSlice = (set) => ({
      otherUsers: [],
      setOtherUsers: (value) => set({ otherUsers: (Array.isArray(value)? value : [value] )}),
})

export const createGeneralDataSlice = (set) => ({
      countries: ['UK', 'USA', 'CROATIA', 'GERMANY', 'RUSSIA', 'INDIA', 'SPAIN', 'ITALY', 'FRANCE', 'CANADA', 'JAPAN'],
      languages: ['ENGLISH', 'GERMAN', 'ITALIAN', 'CROATIAN', 'SPANISH', 'HINDI', 'FRENCH', 'RUSSIAN', 'JAPANESE']
})

export const useStore = create((...a) => ({
  ...createLoginSlice(...a),
  ...createCurrentUserSlice(...a),
  ...createCurrentUserAppointmentsSlice(...a),
  ...createOtherUsersSlice(...a),
  ...createGeneralDataSlice(...a),
}))