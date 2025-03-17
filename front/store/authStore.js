import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: (userData) => {
        set({
          isAuthenticated: true,
          user: userData.user,
          token: userData.token,
        });
      },
      logout: () => {
        set({ isAuthenticated: false, user: null, token: null });
      },
    }),
    {
      name: "auth-store",
      getStorage: () => localStorage,
      allowlist: ["isAuthenticated", "user", "token"],
    }
  )
);
