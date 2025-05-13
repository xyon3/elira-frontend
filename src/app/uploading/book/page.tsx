"use client";

import { UploadingButton } from "@/app/lib/components/uploading-button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, Suspense, useState } from "react";
import { Toaster } from "sonner";

interface BookRequestBody {
    title: string;
    description: string;
}

export default function ResearchUploading() {
    const params = useSearchParams();

    if (params.get("send") !== null) return <Uploads />;

    return <InputInformation />;
}

function InputInformation() {
    const [information, setInformation] = useState<BookRequestBody>({
        title: "",
        description: "",
    });

    return (
        <>
            <Toaster />
            <article className="flex flex-col items-center justify-center gap-16">
                <div className="flex justify-center ">
                    <ul className="steps w-[42rem]">
                        <li className="step step-primary cursor-pointer">
                            <Link href="/uploading">Book or Research?</Link>
                        </li>
                        <li className="step step-primary">Input Information</li>
                        <li className="step">Upload & Save</li>
                    </ul>
                </div>

                <div className="grid w-[36rem] gap-6">
                    <label className="floating-label">
                        <span>Book Title</span>
                        <input
                            type="text"
                            placeholder="Book Title"
                            className="input input-md text-lg w-full"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setInformation({
                                    ...information,
                                    title: e.target.value,
                                });
                            }}
                        />
                    </label>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Description</legend>
                        <textarea
                            className="textarea h-40 w-full"
                            placeholder=""
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                setInformation({
                                    ...information,
                                    description: e.target.value,
                                });
                            }}
                        ></textarea>
                    </fieldset>

                    <Suspense>
                        <UploadingButton trigger="book" data={information}>
                            Next
                        </UploadingButton>
                    </Suspense>
                </div>
            </article>
        </>
    );
}

function Uploads() {
    return (
        <article className="flex flex-col items-center justify-center gap-16">
            <Toaster />
            <div className="flex justify-center mb-32">
                <ul className="steps w-[42rem]">
                    <li className="step step-primary cursor-pointer">
                        <Link href="/uploading">Book or Research?</Link>
                    </li>
                    <li className="step step-primary">Input Information</li>
                    <li className="step step-primary">Upload & Save</li>
                </ul>
            </div>

            <Suspense>
                <UploadingButton trigger="upload">
                    Upload & Save
                </UploadingButton>
            </Suspense>
        </article>
    );
}
