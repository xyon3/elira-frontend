"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

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

export function UploadingButton(props: {
    children: string;
    trigger: string;
    data?: ResearchRequestBody | BookRequestBody;
}) {
    const router = useRouter();

    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }
    };

    const params = useSearchParams();

    const ref = params.get("ref") ?? "";

    return (
        <>
            {props.trigger == "upload" && (
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">
                        Pick a research paper
                    </legend>
                    <input
                        type="file"
                        className="file-input file-input-lg  w-96"
                        onChange={handleFileChange}
                    />
                    <label className="label">Only pdf files are allowed</label>
                </fieldset>
            )}
            <button
                className="btn btn-primary"
                onClick={() => {
                    if (props.trigger == "research")
                        return createResearchHandler(
                            props.data as ResearchRequestBody,
                        ).then((res) =>
                            router.replace(`?ref=${res.referenceID}&se`),
                        );
                    if (props.trigger == "book")
                        return createBookHandler(
                            props.data as BookRequestBody,
                        ).then((res) =>
                            router.replace(`?ref=${res.referenceID}&se`),
                        );
                    if (props.trigger == "upload")
                        return fileUploadHandler(file, ref);
                }}
            >
                {props.children}
            </button>
        </>
    );
}

async function createResearchHandler(data: ResearchRequestBody) {
    const response = await axios({
        method: "POST",
        url: "/api/info-publication",
        data,
    });
    return response.data;
}

async function createBookHandler(data: BookRequestBody) {
    const response = await axios({
        method: "POST",
        url: "/api/info-book",
        data,
    });
    return response.data;
}

async function fileUploadHandler(file: File | null, referenceID: string) {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
        const res = await axios.post(
            "/api/upload?unique=" + referenceID,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );

        console.log("Upload success:", res.data);
    } catch (err) {
        console.error("Upload failed:", err);
    }
}
