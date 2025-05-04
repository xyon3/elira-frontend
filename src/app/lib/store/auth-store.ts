import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Subject {
    name: string;
    email: string;
    role: string;
    code: number;
}
interface AuthStore {
    isLoggedIn: boolean;
    subject: Subject | null;
    setSubject: (newSubject: Subject) => void;
    logout: (newSubject: null) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            isLoggedIn: false,
            subject: null,

            setSubject: (newSubject: Subject) =>
                set(() => ({ isLoggedIn: true, subject: newSubject })),
            logout: (newSubject: null) =>
                set(() => ({ isLoggedIn: false, subject: newSubject })),
        }),
        {
            name: "user-storage", // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
);
