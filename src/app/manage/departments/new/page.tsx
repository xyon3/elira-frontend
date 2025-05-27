"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewDepartmentsPage() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            fullname,
            email,
            password,
        };

        try {
            const res = await fetch("/api/departments/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                // Handle error case
                console.error("Failed to create department");
                return;
            }

            // Navigate or show success
            router.push("/manage/departments");
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };

    return (
        <div className="mt-24 flex items-center justify-center">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold mb-6">
                        Create New Department
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label" htmlFor="fullname">
                                <span className="label-text">
                                    Department Name
                                </span>
                            </label>
                            <input
                                id="fullname"
                                name="fullname"
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Enter 'College of ...'"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="email">
                                <span className="label-text">
                                    Department Email
                                </span>
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="input input-bordered w-full"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="password">
                                <span className="label-text">
                                    Secure Password
                                </span>
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="input input-bordered w-full"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className="btn btn-primary w-full"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                    <a
                        href="/manage/departments"
                        className="btn btn-error w-full mt-2"
                    >
                        Cancel
                    </a>
                </div>
            </div>
        </div>
    );
}
