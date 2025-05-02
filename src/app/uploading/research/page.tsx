"use server";

import { UploadingButton } from "@/app/lib/components/uploading-button";
import Link from "next/link";
import { Suspense } from "react";

interface Props {
    // params: {};
    searchParams?: Promise<any>;
}

export default async function ResearchUploading({ searchParams }: Props) {
    const query = await searchParams;
    console.log(query?.send);

    if (query?.send !== undefined) return <Uploads />;

    return <InputInformation />;
}

function InputInformation() {
    return (
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
                    <span>Research Title</span>
                    <input
                        type="text"
                        placeholder="Research Title"
                        className="input input-md text-lg w-full"
                    />
                </label>

                <label className="floating-label">
                    <span>Authors</span>
                    <input
                        type="text"
                        placeholder="Authors"
                        className="input input-md text-lg w-full"
                    />
                </label>

                <div className="grid grid-cols-2 gap-4">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Level</legend>
                        <select
                            defaultValue="Pick a browser"
                            className="select"
                        >
                            <option>Bachelors</option>
                            <option>Masters</option>
                            <option>Others</option>
                        </select>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Browsers</legend>
                        <input type="text" className="input" />
                    </fieldset>
                </div>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Description</legend>
                    <textarea
                        className="textarea h-40 w-full"
                        placeholder=""
                    ></textarea>
                </fieldset>

                <Suspense>
                    <UploadingButton
                        trigger="research"
                        data={{
                            title: "",
                            degree: "",
                            description: "",
                            authors: "",
                            issueDate: "",
                        }}
                    >
                        Next
                    </UploadingButton>
                </Suspense>
            </div>
        </article>
    );
}

function Uploads() {
    return (
        <article className="flex flex-col items-center justify-center gap-16">
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
