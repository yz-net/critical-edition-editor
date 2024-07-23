import { create } from "zustand";

type Toast = {
  className: string;
  text: string;
} | null;

interface AppState {
  loading: boolean;
  setLoading: (value: boolean) => void;
  toast: Toast;
  setToast: (value: Toast) => void;
}

export const useStateStore = create<AppState>()((set) => ({
  loading: false,
  setLoading: (value) => set((state) => ({ ...state, loading: value })),
  toast: null,
  setToast: (value) => set((state) => ({ ...state, toast: value })),
}));
