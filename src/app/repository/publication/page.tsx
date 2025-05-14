"use server";
import axios from "axios";
import {
    BookMarked,
    FileText,
    Link as LinkIcon,
    Maximize,
    School,
    Search,
    Sheet,
} from "lucide-react";
import { Toaster } from "sonner";

axios.defaults.baseURL = process.env.ELIRA_BACKEND;

export default async function Repository(props: {
    searchParams: Promise<{
        _id?: string;
    }>;
}) {
    const { _id } = await props.searchParams;

    const onePublication = await axios({
        method: "GET",
        url: "/api/publications/" + _id,
    });

    console.log(onePublication.data);

    const resource =
        process.env.ELIRA_BACKEND +
        onePublication.data.path +
        "/" +
        onePublication.data.filename;

    return (
        <article className="space-y-6">
            <Toaster />

            <div className="space-y-2 w-[64rem]">
                <h3 className="text-2xl font-bold">
                    {onePublication.data.title}
                </h3>
                <span className="text-black/80">
                    <b> Description: </b>
                    {onePublication.data.description}
                </span>
            </div>

            <div className="flex">
                <iframe
                    src={resource + "#toolbar=0"}
                    className="w-full h-screen"
                ></iframe>
                <div className="w-96 mx-8 flex flex-col gap-8">
                    {/*
                         *
                    <div className="flex flex-col gap-2 bg-base-100 rounded-2xl p-6 shadow-xl">
                        <h2 className="font-bold">Attatchments</h2>
                    </div>
                         * */}
                    <div className="flex flex-col gap-2 bg-base-100 rounded-2xl p-6 shadow-xl">
                        <span className="text-black/60 text-sm">
                            ID: {onePublication.data.id}
                        </span>
                        <span className="text-black/60 text-sm">
                            Upload Date: {onePublication.data.uploadDate}
                        </span>
                    </div>
                    <a
                        href={
                            process.env.ELIRA_BACKEND +
                            onePublication.data.path +
                            "/" +
                            onePublication.data.filename
                        }
                        className="btn btn-info btn-sm"
                    >
                        View fullscreen
                        <Maximize size={18} />
                    </a>
                </div>
            </div>
        </article>
    );
}

function FlexibleIcon(props: { type: string; size: number }) {
    const Icon = {
        link: <LinkIcon size={props.size} />,
        pdf: <FileText size={props.size} />,
        docs: <FileText size={props.size} />,
        sheet: <Sheet size={props.size} />,
    };

    return Icon[props.type as keyof typeof Icon];
}
