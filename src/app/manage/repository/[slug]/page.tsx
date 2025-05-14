"use client";

import LoadingComponent from "@/app/lib/components/loading-comp";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Toaster } from "sonner";

export default function ManageOneRepositoryPage() {
    const { slug } = useParams<{ slug: string }>();

    const [pubDetails, setPubDetails] = useState<null | any>(null);

    useEffect(() => {
        if (!pubDetails) {
            axios({
                method: "GET",
                url: "/api/info-publication",
                params: {
                    pub_id: slug,
                },
            }).then((res) => {
                setPubDetails(res.data);
            });
        }
    }, [pubDetails]);

    if (!pubDetails) {
        return (
            <div className="fixed h-screen w-screen top-0 left-0 flex justify-center items-center flex-col">
                <span className="loading loading-spinner loading-4xl"></span>
                <span className="text-xl">Loading, please wait..</span>
            </div>
        );
    }
    return (
        <article className="space-y-8">
            <InputInformation pubDetails={pubDetails} />
        </article>
    );
}

interface ResearchRequestBody {
    title: string;
    degree: string;
    description: string;
    authors: string;
    issueDate: string;
}

function InputInformation(props: { pubDetails: any }) {
    const router = useRouter();
    const [information, setInformation] = useState<ResearchRequestBody>({
        title: props.pubDetails.title,
        degree: props.pubDetails.degree,
        authors: props.pubDetails.authors,
        issueDate: props.pubDetails.issueDate,
        description: props.pubDetails.description,
    });

    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }
    };

    const [isUploading, setIsUploading] = useState(false);

    const handleSave = async () => {
        axios({
            method: "PATCH",
            url: "/api/info-publication",
            data: information,
            params: {
                unique: props.pubDetails.id,
            },
        }).then(() => {
            window.location.href = "/manage/repository";
        });

        if (file) {
            setIsUploading(true);
            fileUploadHandler(file, props.pubDetails.id, "publication")
                .then(() => {
                    setIsUploading(false);
                })
                .finally(() => {
                    setIsUploading(false);
                });
        }
    };

    return (
        <>
            <Toaster />
            {isUploading ? <LoadingComponent /> : null}
            <article className="flex items-center justify-center gap-16 mt-30">
                <div className="grid w-[36rem] gap-6">
                    <label className="floating-label">
                        <span>Research Title</span>
                        <input
                            type="text"
                            placeholder="Research Title"
                            className="input input-md text-lg w-full"
                            value={information.title}
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
                            value={information.authors}
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
                                value={information.degree}
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
                            value={information.description}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                setInformation({
                                    ...information,
                                    description: e.target.value,
                                });
                            }}
                        ></textarea>
                    </fieldset>
                </div>

                <div className="divider divider-horizontal"></div>

                <div className="flex flex-col gap-16">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">
                            Change the research paper
                        </legend>
                        <input
                            id="files"
                            type="file"
                            className="file-input file-input-lg  w-96"
                            onChange={handleFileChange}
                            accept="application/pdf"
                        />
                        <label className="label">
                            Only pdf files are allowed
                        </label>
                        <div className="divider"></div>
                        <label className="label font-bold">
                            Upload date: {props.pubDetails.uploadDate}
                        </label>
                        <label className="label font-bold">
                            Uploaded by: {props.pubDetails.uploadedBy.email}
                        </label>
                        <a className="label link">{props.pubDetails.id}</a>
                    </fieldset>

                    <div className="space-x-2 flex justify-end">
                        <button
                            className="btn btn-success"
                            onClick={() => {
                                handleSave();
                            }}
                        >
                            Save
                        </button>
                        <button
                            className="btn btn-error"
                            onClick={() => {
                                router.back();
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </article>
        </>
    );
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
