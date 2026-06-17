import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { InvestorProfile } from '../types/InvestorProfile';

interface UserState {
  profile: InvestorProfile | null;
  setProfile: (profile: InvestorProfile) => void;
  updateProfile: (updates: Partial<InvestorProfile>) => void;
  clearProfile: () => void;
  hasCompletedOnboarding: () => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      updateProfile: (updates) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null,
        })),
      clearProfile: () => set({ profile: null }),
      hasCompletedOnboarding: () => !!get().profile,
    }),
    {
      name: 'clarinvest-user-storage',
    }
  )
);
