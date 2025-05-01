"use server";

import { UploadingButton } from "@/app/lib/components/uploading-button";
import axios from "axios";
import Link from "next/link";

export default async function ResearchUploading() {
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

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Description</legend>
                    <textarea
                        className="textarea h-40 w-full"
                        placeholder=""
                    ></textarea>
                </fieldset>

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
            </div>
        </article>
    );
}
