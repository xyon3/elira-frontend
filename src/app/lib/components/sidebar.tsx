"use client";

import {
    BookMarked,
    House,
    PanelLeft,
    Settings,
    SquareLibrary,
    Upload,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "../store/auth-store";

export function Sidebar() {
    const [isHidden, setIsHidden] = useState(false);

    const { isLoggedIn, subject } = useAuthStore();

    return (
        <>
            <div className={isHidden ? "w-24" : "w-96 2xl:w-[24rem]"}></div>
            <nav
                className={`bg-base-100/80 h-full fixed shadow-2xl top-0 left-0 rounded-r-2xl ${isHidden ? "" : "w-64"}`}
            >
                <button
                    className="btn btn-ghost m-1 mt-4"
                    onClick={() => {
                        setIsHidden(!isHidden);
                    }}
                >
                    <PanelLeft />
                </button>

                <div>
                    <h3
                        hidden={isHidden}
                        className="text-lg font-bold m-4 mt-6 mb-2"
                    >
                        General
                    </h3>

                    <ul className="menu w-full font-bold grid gap-4">
                        <li>
                            <Link href="/home">
                                <House />
                                <span hidden={isHidden}>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/library">
                                <SquareLibrary />
                                <span hidden={isHidden}>E-Library</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/repository">
                                <BookMarked />
                                <span hidden={isHidden}>Repository</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                {isLoggedIn && (subject?.code ?? 3) < 3 ? (
                    <div>
                        <h3
                            hidden={isHidden}
                            className="text-lg font-bold m-4 mt-6 mb-2"
                        >
                            Administration
                        </h3>
                        <ul className="menu w-full font-bold grid gap-4">
                            <li>
                                <Link href="/uploading">
                                    <Upload />
                                    <span hidden={isHidden}>Uploading</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/manage">
                                    <Settings />
                                    <span hidden={isHidden}>Manage</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                ) : null}
            </nav>
        </>
    );
}
