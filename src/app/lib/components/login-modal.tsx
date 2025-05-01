"use client";

import { X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export function LoginModal() {
    const search = useSearchParams();
    const router = useRouter();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    if (search.get("modal_login") !== "") {
        return <> </>;
    }

    return (
        <>
            <div className="fixed z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/15 h-screen w-screen"></div>
            <section className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    {/* <legend className="fieldset-legend text-lg">Login</legend> 

                    */}

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
                    />

                    <label className="label">Password</label>
                    <input
                        type="password"
                        className="input"
                        placeholder="Password"
                    />

                    <button className="btn btn-primary mt-4">Login</button>
                </fieldset>
            </section>
        </>
    );
}
function loginHandler() {}
