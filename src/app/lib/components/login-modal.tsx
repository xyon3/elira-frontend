"use client";

import axios from "axios";
import { X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useAuthStore } from "../store/auth-store";

export function LoginModal() {
    const search = useSearchParams();
    const router = useRouter();

    const { setSubject, subject } = useAuthStore();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    if (search.get("modal_login") !== "") {
        return <></>;
    }

    return (
        <>
            <div className="fixed z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/15 backdrop-blur-xs h-screen w-screen"></div>
            <section className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <div className="place-self-end">
                        <button
                            className="btn btn-ghost btn-sm hover:text-red-200"
                            onClick={() => {
                                const params = new URLSearchParams();

                                params.delete("modal_login");

                                router.replace(`?${params.toString()}`);
                            }}
                        >
                            <X className="text-sm" size={16} />
                        </button>
                    </div>

                    <label className="label">Email</label>
                    <input
                        type="email"
                        className="input"
                        placeholder="your.email@gma.uphsl.edu.ph"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setCredentials({
                                ...credentials,
                                email: e.target.value,
                            });
                        }}
                    />

                    <label className="label">Password</label>
                    <input
                        type="password"
                        className="input"
                        placeholder="Password"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setCredentials({
                                ...credentials,
                                password: e.target.value,
                            });
                        }}
                    />

                    <button
                        className="btn btn-primary mt-4"
                        onClick={() => {
                            axios({
                                method: "POST",
                                url: "/api/auth",
                                data: credentials,
                            }).then((response) => {
                                setSubject(response.data.results);
                                router.replace("/home");
                            });
                        }}
                    >
                        Login
                    </button>
                </fieldset>
            </section>
        </>
    );
}
function loginHandler() {}
