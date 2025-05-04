"use server";

import { Book } from "lucide-react";
import Link from "next/link";

export default async function Uploading() {
    return (
        <article className="space-y-32 flex flex-col">
            <div className="flex justify-center ">
                <ul className="steps w-[42rem]">
                    <li className="step step-primary cursor-pointer">
                        <Link href="/uploading">Book or Research?</Link>
                    </li>
                    <li className="step">Input Information</li>
                    <li className="step">Upload & Save</li>
                </ul>
            </div>

            <div className="space-y-12">
                <h1 className="text-4xl font-bold text-center">
                    I'm uploading a...
                </h1>
                <div className="flex justify-center gap-6">
                    <Link
                        href="/uploading/book"
                        className="cursor-pointer hover:bg-base-200 rounded-3xl border-base-300 border-[0.1rem] p-8 space-y-4 w-64 flex flex-col items-center"
                    >
                        <Book size={96} />
                        <span className="text-3xl font-bold">Book</span>
                    </Link>
                    <div className="divider divider-horizontal">OR</div>
                    <Link
                        href="/uploading/research"
                        className="cursor-pointer hover:bg-base-200 rounded-3xl border-base-300 border-[0.1rem] p-8 space-y-4 w-64 flex flex-col items-center"
                    >
                        <Book size={96} />
                        <span className="text-3xl font-bold">Research</span>
                    </Link>
                </div>
            </div>
        </article>
    );
}
