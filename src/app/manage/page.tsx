import { Columns3Cog, FileCog, FolderCog, School } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Repository() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
        return <>Not Allowed</>;
    }

    const identity = JSON.parse(token.value);

    console.log(identity);

    const buttonStyle =
        "btn btn-ghost flex flex-col text-3xl h-full btn-neutral border border-black/10 py-16 px-16  bg-base-100/75 hover:bg-black/75";
    const iconSize = 98;

    return (
        <div className="flex justify-start">
            <div className="grid grid-cols-4 gap-6">
                <Link href="/manage/repository" className={buttonStyle}>
                    <FolderCog size={iconSize} />
                    Repository
                </Link>

                {(identity.role == "custodian" || identity.role) ==
                "uploader" ? (
                    <>
                        <Link href="/manage/library" className={buttonStyle}>
                            <Columns3Cog size={iconSize} />
                            Library
                        </Link>
                        <Link
                            href="/manage/departments"
                            className={buttonStyle}
                        >
                            <School size={iconSize} />
                            Departments
                        </Link>
                    </>
                ) : null}
            </div>
        </div>
    );
}
