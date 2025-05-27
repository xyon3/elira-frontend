"use server";

import axios from "axios";
import { School, SquarePen } from "lucide-react";
import Link from "next/link";
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
        })
            .then(() => {})
            .finally(() => {
                redirect("/manage/departments#");
            });
    } else if (action === "activate") {
        axios({
            method: "PUT",
            url: process.env.ELIRA_BACKEND + "/api/users/" + id,
        })
            .then(() => {})
            .finally(() => {
                redirect("/manage/departments#");
            });
    } else if (action === "delete") {
        axios({
            method: "DELETE",
            url:
                process.env.ELIRA_BACKEND +
                "/api/users/" +
                id +
                "?persist=true",
        })
            .then(() => {
                return redirect("/manage/departments#");
            })
            .catch(() => {
                return redirect("/manage/departments#");
            })
            .finally(() => {
                return redirect("/manage/departments#");
            });
    }

    return (
        <article>
            <div className="overflow-x-auto space-y-4">
                <Link
                    href="/manage/departments/new"
                    className="btn btn-primary"
                >
                    New Department
                </Link>

                <div role="alert" className="alert alert-error alert-dash">
                    <span className="font-bold">
                        Warning: Departments with uploaded repository or books
                        will not be deleted.
                    </span>
                </div>
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
                                if (action === "delete" && dept.id == id)
                                    return null;

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
                                                {!dept.isActive
                                                    ? "Deactivated"
                                                    : "Activated"}
                                            </span>
                                        </td>
                                        <th className="space-x-2">
                                            {dept.isActive ? (
                                                <a
                                                    className="btn btn-warning"
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

                                            <a
                                                className="btn btn-error"
                                                href={`/manage/departments/?id=${dept.id}&action=delete`}
                                            >
                                                Delete
                                            </a>
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
