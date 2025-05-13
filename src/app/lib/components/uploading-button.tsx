"use client";

import axios, { AxiosError } from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import LoadingComponent from "./loading-comp";

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
    const send = params.get("send") ?? "";

    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    let publication_required = false;

    if (props.data) {
        publication_required =
            (props.data as ResearchRequestBody).issueDate === "" ||
            (props.data as ResearchRequestBody).degree === "" ||
            (props.data as ResearchRequestBody).authors === "" ||
            (props.data as ResearchRequestBody).title === "";
    }

    return (
        <>
            {isUploading ? <LoadingComponent /> : null}
            {props.trigger == "upload" && (
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">
                        Pick a research paper
                    </legend>
                    <input
                        type="file"
                        className="file-input file-input-lg  w-96"
                        onChange={handleFileChange}
                        accept="application/pdf"
                    />
                    <label className="label">Only pdf files are allowed</label>
                </fieldset>
            )}
            <button
                className="btn btn-primary"
                disabled={isLoading}
                onClick={() => {
                    if (props.trigger == "research") {
                        if (publication_required) {
                            return toast.error("Incomplete Fields", {
                                closeButton: true,
                                richColors: true,
                                description:
                                    "All fields are required to be filled except 'Description'",
                            });
                        }
                        return createResearchHandler(
                            props.data as ResearchRequestBody,
                        )
                            .then((res) => {
                                router.replace(
                                    `?ref=${res.referenceID}&send=publication`,
                                );
                                setIsLoading(true);
                            })
                            .finally(() => setIsLoading(false));
                    }
                    if (props.trigger == "book") {
                        if (props.data?.title === "") {
                            return toast.error("Incomplete Fields", {
                                closeButton: true,
                                richColors: true,
                                description:
                                    "All fields are required to be filled except 'Description'",
                            });
                        }
                        return createBookHandler(props.data as BookRequestBody)
                            .then((res) => {
                                router.replace(
                                    `?ref=${res.referenceID}&send=book`,
                                );
                                setIsLoading(true);
                            })
                            .finally(() => setIsLoading(false));
                    }
                    if (props.trigger == "upload") {
                        setIsUploading(true);
                        return fileUploadHandler(file, ref, send)
                            .then(() => {
                                setIsLoading(true);
                                setIsLoading(false);
                                setIsUploading(false);
                                router.replace("/resource-success");
                            })
                            .catch((e) => {
                                const err = e as AxiosError;
                                const { response } = err;

                                if (response?.status === 400) {
                                    toast.warning("No file attatched", {
                                        richColors: true,
                                        closeButton: true,
                                    });
                                    return;
                                }
                                if (response?.status === 415) {
                                    toast.error("Could not upload file", {
                                        richColors: true,
                                        description:
                                            "Only PDF files are allowed",
                                        closeButton: true,
                                    });
                                    return;
                                }
                                if (response?.status === 413) {
                                    toast.error("Could not upload file", {
                                        richColors: true,
                                        description: "File must no exceed 20mb",
                                        closeButton: true,
                                    });
                                    return;
                                }
                            })
                            .finally(() => {
                                setIsUploading(false);
                            });
                    }
                }}
            >
                {isLoading ? (
                    <span className="loading loading-spinner loading-lg"></span>
                ) : (
                    props.children
                )}
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

async function fileUploadHandler(
    file: File | null,
    referenceID: string,
    type: string,
) {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const url =
        type === "publication"
            ? "/api/info-publication?unique="
            : "/api/info-book?unique=";

    const res = await axios.put(url + referenceID, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}
