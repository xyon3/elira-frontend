"use server";

import Link from "next/link";

export default async function BookUploading() {
    return (
        <article className="space-y-16 flex flex-col justify-between">
            <div className="flex justify-center ">
                <ul className="steps w-[42rem]">
                    <li className="step step-primary cursor-pointer">
                        <Link href="/uploading">Book or Research?</Link>
                    </li>
                    <li className="step step-primary">Input Information</li>
                    <li className="step">Upload & Save</li>
                </ul>
            </div>

            <form action="">
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">I'm uploading a</legend>
                    <select className="select">
                        <option>Book</option>
                        <option>Research</option>
                    </select>
                </fieldset>

                <button className="btn btn-success">Save</button>
            </form>
        </article>
    );
}
