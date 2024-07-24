import { create } from "zustand";

type Toast = {
  className: string;
  text: string;
} | null;

interface AppStates {
  loading: boolean;
  toast: Toast;
}

interface AppActions {
  setLoading: (value: boolean) => void;
  setToast: (value: Toast) => void;
}

export const useStateStore = create<AppStates & AppActions>()((set) => ({
  loading: false,
  setLoading: (value) => set((state) => ({ ...state, loading: value })),
  toast: null,
  setToast: (value) => set((state) => ({ ...state, toast: value })),
}));
