import { Columns3Cog, FileCog, FolderCog, School } from "lucide-react";
import Link from "next/link";

export default function Repository() {
    const buttonStyle =
        "btn btn-ghost flex flex-col text-3xl h-full btn-neutral border border-black/10 py-16 px-16  bg-base-100/75 hover:bg-black/75";
    const iconSize = 98;

    return (
        <div className="flex justify-start">
            <div className="grid grid-cols-4 gap-6">
                <Link href="/manage/library" className={buttonStyle}>
                    <Columns3Cog size={iconSize} />
                    Library
                </Link>

                <Link href="/manage/repository" className={buttonStyle}>
                    <FolderCog size={iconSize} />
                    Repository
                </Link>
                <Link href="/manage/departments" className={buttonStyle}>
                    <School size={iconSize} />
                    Departments
                </Link>
            </div>
        </div>
    );
}
