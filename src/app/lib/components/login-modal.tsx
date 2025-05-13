"use client";

import axios from "axios";
import { X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useAuthStore } from "../store/auth-store";
import { toast } from "sonner";

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
                    <div className="place-self-end flex w-full">
                        <h1 className="text-2xl font-black mr-auto">LOGIN</h1>
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
                                if (response.data.results === "not active") {
                                    toast.error("User not activated", {
                                        closeButton: true,
                                        richColors: true,
                                    });
                                    return;
                                }

                                console.log(response.data);
                                if (response.data.results.statusCode === 401) {
                                    toast.error(
                                        "Incorrect username or password",
                                        {
                                            closeButton: true,
                                            richColors: true,
                                        },
                                    );
                                    return;
                                }
                                setSubject(response.data.results);
                                toast.success("Login Success!", {
                                    closeButton: true,
                                    richColors: true,
                                });
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
