import {
  persist,
  createJSONStorage,
  create,
  zustandStorage,
} from '../../core/storageManager';
import {User} from '../../types/user';

export interface AuthState {
  user: User;
  setUser: (userData: User) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: {} as User,
      setUser: userData => set({user: userData}),
      clearUser: () => set({user: {} as User}),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => zustandStorage), // Assuming `zustandStorage` is just `localStorage`
    },
  ),
);

// Usage example:
// const { user, setUser, clearUser } = useAuthStore();
