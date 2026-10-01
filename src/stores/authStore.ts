import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {examStamp, STUDENT} from '../constants/student';

type AuthState = {
  token: string | null;
  login: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: null,
      login: () => set({token: `ktxgo-${STUDENT.mssv}-${examStamp()}`}),
      logout: () => set({token: null}),
    }),
    {
      name: `ktxgo-auth-${STUDENT.mssv}`,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
