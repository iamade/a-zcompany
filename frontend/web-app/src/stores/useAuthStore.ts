import { create } from "zustand";
import { accountApi } from "@/src/lib/api";
import type { User, Address } from "@/src/types";

interface AuthState {
  currentUser: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;

 
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  getUserInfo: () => Promise<void>;
  updateAddress: (address: Address) => Promise<void>;
  checkAuthState: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: null,
  loading: false,
  isAuthenticated: false,

  get isAdmin() {
    const user = get().currentUser;
    if (!user) return false;
    const roles = user.roles;
    return Array.isArray(roles) ? roles.includes("Admin") : roles === "Admin";
  },

  login: async (email: string, password: string) => {
    console.log("Auth store: Starting login...");
    set({ loading: true });
    try {
      await accountApi.login({ email, password });
      console.log("Auth store: Login API successful, now getting user info...");

      const user = await accountApi.getUserInfo();
      console.log("Auth store: Got user info:", user);

      set({
        currentUser: user,
        isAuthenticated: true,
        loading: false,
      });

      console.log("Auth store: State updated successfully");

      const newState = get();
      console.log("Auth store: Current state after login:", {
        currentUser: newState.currentUser,
        isAuthenticated: newState.isAuthenticated,
        loading: newState.loading,
      });
    } catch (error) {
      console.error("Login error:", error);
      set({ loading: false });

      if ((error as any).response?.status === 401) {
        throw new Error("Email address or password incorrect");
      }

      if ((error as any).response?.status === 400) {
        throw new Error("Invalid login request");
      }

      if (!(error as any).response) {
        throw new Error("Network error. Please check your connection.");
      }

      
      throw new Error("Login failed. Please try again.");
    }
  },

  register: async (userData) => {
    set({ loading: true });
    try {
      await accountApi.register(userData);
      set({ loading: false });
    } catch (error) {
      console.error("Registration error:", error);
      set({ loading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await accountApi.logout();
      set({ currentUser: null, isAuthenticated: false, loading: false });
    } catch (error) {
      console.error("Logout error:", error);
      set({ loading: false });
    }
  },

  getUserInfo: async () => {
    set({ loading: true });
    try {
      const user = await accountApi.getUserInfo();
      set({ currentUser: user, isAuthenticated: true, loading: false });
    } catch (error) {
      console.error("Get user info error:", error);
      set({ currentUser: null, isAuthenticated: false, loading: false });
    }
  },

  updateAddress: async (address) => {
    set({ loading: true });
    try {
      const updatedAddress = await accountApi.updateAddress(address);
      set((state) => ({
        currentUser: state.currentUser
          ? {
              ...state.currentUser,
              address: updatedAddress,
            }
          : null,
        loading: false,
      }));
    } catch (error) {
      console.error("Update address error:", error);
      set({ loading: false });
      throw error;
    }
  },

  checkAuthState: async () => {
    const state = get();

    if (state.isAuthenticated && state.currentUser) {
      return;
    }

    try {
    
      await get().getUserInfo();
    } catch (error) {
    
      if (!state.isAuthenticated) {
        set({ currentUser: null, isAuthenticated: false });
      }
    }
  },
}));
