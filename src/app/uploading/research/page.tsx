"use client";

import { UploadingButton } from "@/app/lib/components/uploading-button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    ChangeEvent,
    ChangeEventHandler,
    ReactEventHandler,
    Suspense,
    useEffect,
    useState,
} from "react";
import { Toaster } from "sonner";

interface ResearchRequestBody {
    title: string;
    degree: string;
    description: string;
    authors: string;
    issueDate: string;
}

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
    const [information, setInformation] = useState<ResearchRequestBody>({
        title: "",
        degree: "",
        authors: "",
        issueDate: "",
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
                        <span>Research Title</span>
                        <input
                            type="text"
                            placeholder="Research Title"
                            className="input input-md text-lg w-full"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setInformation({
                                    ...information,
                                    title: e.target.value,
                                });
                            }}
                        />
                    </label>

                    <label className="floating-label">
                        <span>Authors</span>
                        <input
                            type="text"
                            placeholder="Authors"
                            className="input input-md text-lg w-full"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setInformation({
                                    ...information,
                                    authors: e.target.value,
                                });
                            }}
                        />
                    </label>

                    <div className="grid grid-cols-2 gap-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Level</legend>
                            <select
                                className="select"
                                defaultValue={"Select a degree level"}
                                onChange={(
                                    e: ChangeEvent<HTMLSelectElement>,
                                ) => {
                                    setInformation({
                                        ...information,
                                        degree: e.target.value,
                                    });
                                }}
                            >
                                <option disabled={true}>
                                    Select a degree level
                                </option>
                                <option>Bachelors</option>
                                <option>Masters</option>
                                <option>Doctorate</option>
                                <option>Others</option>
                            </select>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                                Issue Year
                            </legend>
                            <input
                                type="text"
                                className="input"
                                value={information.issueDate}
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>,
                                ) => {
                                    const number = e.target.value.replace(
                                        /[^0-9]/g,
                                        "",
                                    );
                                    setInformation({
                                        ...information,
                                        issueDate: number,
                                    });
                                }}
                            />
                        </fieldset>
                    </div>

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
                        <UploadingButton trigger="research" data={information}>
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
