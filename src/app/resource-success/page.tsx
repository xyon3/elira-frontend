import { FileCheck2 } from "lucide-react";

export default function ResourceSuccessPage() {
    return (
        <article className="flex">
            <div className="flex items-center gap-8 justify-center  absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="text-center flex flex-col items-center ">
                    <FileCheck2 className="text-success mb-12" size={128} />
                    <h1 className="text-4xl font-bold text-success">
                        Upload Successful!
                    </h1>

                    <p className="mt-4 text-lg ">
                        Your file has been uploaded successfully.
                    </p>

                    <div className="flex gap-2 justify-end">
                        <a href="/home" className="btn btn-ghost mt-6">
                            Go to Home
                        </a>
                        <a href="/uploading" className="btn btn-primary mt-6">
                            Upload another
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
}
