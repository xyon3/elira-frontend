"use server";

import axios from "axios";
import { School, SquarePen } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ManageDepartmentsPage(props: {
    searchParams: Promise<{
        action: string;
        id: string;
    }>;
}) {
    const { data } = await axios({
        method: "GET",
        url: process.env.ELIRA_BACKEND + "/api/users?filter=depts",
    });

    const { id, action } = await props.searchParams;

    if (action === "deactivate") {
        axios({
            method: "DELETE",
            url: process.env.ELIRA_BACKEND + "/api/users/" + id,
        }).then(() => {});
        console.log("3223");
        redirect("/manage/departments#");
    } else if (action === "activate") {
        axios({
            method: "PUT",
            url: process.env.ELIRA_BACKEND + "/api/users/" + id,
        }).then(() => {});
        console.log("3223");
        redirect("/manage/departments#");
    }

    return (
        <article>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Department Name</th>
                            <th>Tags</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {data.users.length > 0 &&
                            data.users.map((dept: any) => {
                                return (
                                    <tr key={dept.email}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <School size={32} />
                                                </div>
                                                <div>
                                                    <div className="font-bold">
                                                        {dept.fullname}
                                                    </div>
                                                    <div className="text-sm opacity-50">
                                                        {dept.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="flex gap-2">
                                            <span className="badge badge-ghost badge-sm">
                                                {dept.role.title}
                                            </span>
                                            <span className="badge badge-ghost badge-sm">
                                                {dept.isActive
                                                    ? "Activated"
                                                    : "Deactivated"}
                                            </span>
                                        </td>
                                        <th>
                                            {dept.isActive ? (
                                                <a
                                                    className="btn btn-error"
                                                    href={`/manage/departments/?id=${dept.id}&action=deactivate`}
                                                >
                                                    Deactivate
                                                </a>
                                            ) : (
                                                <a
                                                    className="btn btn-info"
                                                    href={`/manage/departments/?id=${dept.id}&action=activate`}
                                                >
                                                    Activate
                                                </a>
                                            )}
                                        </th>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </article>
    );
}
