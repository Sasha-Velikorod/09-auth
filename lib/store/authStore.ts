import { User } from '@/types/user';
import { create } from 'zustand';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearIsAuth: () => void;
}

const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user: User) => set(() => ({ user, isAuthenticated: true })),
  clearIsAuth: () => set(() => ({ user: null, isAuthenticated: false })),
}));

export default useAuthStore;
