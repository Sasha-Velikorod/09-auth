import { User } from '@/types/user';
import { create } from 'zustand';

interface AuthStore {
  user: User | null;
  isAuth: boolean;
  setUser: (user: User) => void;
  clearIsAuth: () => void;
}

const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuth: false,
  setUser: (user: User) => set(() => ({ user, isAuth: true })),
  clearIsAuth: () => set(() => ({ user: null, isAuth: false })),
}));

export default useAuthStore;
