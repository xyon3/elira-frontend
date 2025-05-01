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

export function Sidebar() {
    const [isHidden, setIsHidden] = useState(false);
    return (
        <>
            <div className={isHidden ? "w-24" : "w-96 2xl:w-[24rem]"}></div>
            <nav
                className={
                    "bg-base-200 rounded-box h-full fixed " +
                    (isHidden ? "" : "w-64")
                }
            >
                <button
                    className="btn btn-ghost m-1 mt-4"
                    onClick={() => {
                        setIsHidden(!isHidden);
                    }}
                >
                    <PanelLeft color="#ffffff" />
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
                                <House color="#ffffff" />
                                <span hidden={isHidden}>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/library">
                                <SquareLibrary color="#ffffff" />
                                <span hidden={isHidden}>E-Library</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/repository">
                                <BookMarked color="#ffffff" />
                                <span hidden={isHidden}>Repository</span>
                            </Link>
                        </li>
                    </ul>
                </div>
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
                                <Settings color="#ffffff" />
                                <span hidden={isHidden}>Manage</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
