
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/types';
import { currencies } from '@/data/mock-data';

// Define the state structure, allowing user to be null
type UserState = {
  user: Omit<User, 'password'> | null;
  currency: string;
  setUser: (user: Omit<User, 'password'> | null) => void;
  setCurrency: (currency: string) => void;
};

// Create the store with persistence
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      currency: currencies.find(c => c.value === 'pkr')?.symbol || '₨',
      setUser: (user) => set({ user }),
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'user-storage', // unique name for localStorage key
      storage: createJSONStorage(() => sessionStorage), // (optional) use sessionStorage instead of localStorage
    }
  )
);
