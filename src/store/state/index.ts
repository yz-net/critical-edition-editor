import { create } from "zustand";

interface AppState {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const useStateStore = create<AppState>()((set) => ({
  loading: false,
  setLoading: (value) => set((state) => ({ ...state, loading: value })),
}));
