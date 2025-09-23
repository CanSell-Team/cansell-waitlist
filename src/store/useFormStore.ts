import { create } from "zustand";

interface FormState {
  email: string;
  phone: string;
  isLoading: boolean;
  isSubmitted: boolean;
  error: string | null;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setLoading: (loading: boolean) => void;
  setSubmitted: (submitted: boolean) => void;
  setError: (error: string | null) => void;
  resetForm: () => void;
}

export const useFormStore = create<FormState>((set) => ({
  email: "",
  phone: "",
  isLoading: false,
  isSubmitted: false,
  error: null,
  setEmail: (email) => set({ email }),
  setPhone: (phone) => set({ phone }),
  setLoading: (isLoading) => set({ isLoading }),
  setSubmitted: (isSubmitted) => set({ isSubmitted }),
  setError: (error) => set({ error }),
  resetForm: () =>
    set({
      email: "",
      phone: "",
      isLoading: false,
      isSubmitted: false,
      error: null,
    }),
}));
