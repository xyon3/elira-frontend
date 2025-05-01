"use client";
import { PanelLeft, Upload } from "lucide-react";
import { LoginModal } from "./login-modal";
import { useRouter } from "next/navigation";

export function Header() {
    const router = useRouter();

    return (
        <header className="flex justify-end w-full bg-red ml-auto items-center gap-6">
            <LoginModal />
            <div className="text-2xl font-bold mr-auto flex items-center gap-2">
                <PanelLeft className="hidden" color="#ffffff" />
                <h1 className="">ELIRA</h1>
            </div>
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
            <button className="btn btn-primary relative left-0">
                <Upload color="#ffffff" />
                Upload
            </button>
        </header>
    );
}
