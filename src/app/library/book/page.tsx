"use server";
import axios from "axios";
import { Maximize } from "lucide-react";
import { Toaster } from "sonner";

axios.defaults.baseURL = process.env.ELIRA_BACKEND;

export default async function Repository(props: {
    searchParams: Promise<{
        id: string;
    }>;
}) {
    const { id } = await props.searchParams;

    const response = await axios({
        method: "GET",
        url: "/api/books/" + id,
    });

    const resource =
        process.env.ELIRA_BACKEND +
        response.data.path +
        "/" +
        response.data.filename;

    return (
        <article className="space-y-6">
            <div className="space-y-2 w-[64rem]">
                <h3 className="text-2xl font-bold">{response.data.title}</h3>
                <span className="text-black/80">
                    <b> Description: </b>
                    {response.data.description}
                </span>
            </div>
            <div className="flex">
                <iframe
                    src={resource + "#toolbar=0"}
                    className="w-full h-screen"
                ></iframe>
                <div className="w-96 mx-8 flex flex-col gap-8">
                    <div className="flex flex-col gap-2 bg-base-100 rounded-2xl p-6 shadow-xl">
                        <span className="text-black/60 text-sm">
                            ID: {response.data.id}
                        </span>
                        <span className="text-black/60 text-sm">
                            Upload Date: {response.data.uploadDate}
                        </span>
                    </div>
                    <a
                        href={
                            process.env.ELIRA_BACKEND +
                            response.data.path +
                            "/" +
                            response.data.filename
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
