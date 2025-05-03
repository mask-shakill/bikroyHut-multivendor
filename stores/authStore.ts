import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  role: "customer" | "admin";
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  register: (formData: {
    firstName: string;
    lastName: string;
    mobileNumber: string;
    email: string;
    password: string;
  }) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  register: async (formData) => {
    set({ isLoading: true, error: null });

    try {
      const { data } = await axios.post<{ user: User }>(
        "http://localhost:3000/api/auth/signup/customer",
        formData
      );

      set({ user: data.user });
      toast.success("Account created successfully! 🎉", {
        duration: 4000,
        position: "top-center",
      });
      useRouter().push("/dashboard");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      set({ error: errorMessage });
      toast.error(`Registration failed: ${errorMessage}`, {
        duration: 4000,
        position: "top-center",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
