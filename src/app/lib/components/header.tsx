"use client";
import { PanelLeft, Upload, UserRound } from "lucide-react";
import { LoginModal } from "./login-modal";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { useAuthStore } from "../store/auth-store";
import Link from "next/link";
import { toast } from "sonner";

export function Header() {
    const router = useRouter();

    const { isLoggedIn, logout, subject } = useAuthStore();

    return (
        <header className="flex justify-end w-full bg-red ml-auto items-center gap-6">
            <div className="text-2xl font-bold mr-auto flex items-center gap-2">
                <PanelLeft className="hidden" />
                <button
                    className="btn btn-ghost text-2xl"
                    onClick={() => {
                        router.back();
                    }}
                >
                    ELIRA
                </button>
            </div>

            {isLoggedIn ? (
                <>
                    <button
                        className="btn btn-ghost hover:bg-none font-bold"
                        onClick={() => {
                            logout(null);
                            toast.warning("You are now logged out", {
                                richColors: true,
                                closeButton: true,
                            });

                            router.refresh();
                        }}
                    >
                        Sign out
                    </button>
                    <Link
                        href="/uploading"
                        className="btn btn-primary relative left-0"
                    >
                        <UserRound fill="white" color="none" />
                        {subject && subject.name}
                    </Link>
                </>
            ) : (
                <>
                    <Suspense>
                        <LoginModal />
                    </Suspense>
                    <button
                        className="btn btn-ghost hover:bg-none font-bold"
                        onClick={() => {
                            const params = new URLSearchParams();
                            params.set("modal_login", "");
                            router.replace(`?${params.toString()}`);
                        }}
                    >
                        Sign in
                    </button>

                    <button
                        className="btn btn-primary relative left-0"
                        onClick={() => {
                            const params = new URLSearchParams();
                            params.set("modal_login", "");
                            router.replace(`?${params.toString()}`);
                        }}
                    >
                        <Upload />
                        Upload
                    </button>
                </>
            )}
        </header>
    );
}
