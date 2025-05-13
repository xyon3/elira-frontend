import axios from "axios";
import { SquarePen } from "lucide-react";
import Link from "next/link";

export default async function ManageRepositoryPage(props: {
    searchParams: Promise<{
        page?: string;
        search?: string;
    }>;
}) {
    const { page = "1", search = "" } = await props.searchParams;

    const paginatedResponse = await axios({
        method: "GET",
        url: `${process.env.ELIRA_BACKEND}/api/publications`, // make sure you're hitting the right base URL
        params: {
            isPaginated: 1,
            limit: 18,
            randomize: 0,
            page,
            keyword: search, // include the search query
        },
    });

    const paginated: any = paginatedResponse.data;

    return (
        <article className="space-y-8">
            <div className="overflow-x-auto bg-base-100 p-8 h-full rounded-3xl">
                {/* Search Form */}
                <form method="GET" className="mb-6">
                    <label className="input">
                        <input
                            type="search"
                            name="search"
                            defaultValue={search}
                            className="grow"
                            placeholder="Search"
                        />
                        <svg
                            className="h-[1em] opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                    </label>
                </form>

                {/* Publications Table */}
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className="w-[10%]"></th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.data.map(
                            (publication: any, index: number) => {
                                return (
                                    <tr
                                        key={publication.id}
                                        className="hover:bg-base-200"
                                    >
                                        <th>
                                            <div className="flex items-center ">
                                                <Link
                                                    className="btn btn-primary btn-sm"
                                                    href={`/manage/repository/${publication.id}`}
                                                >
                                                    <SquarePen size={18} /> Edit
                                                </Link>
                                                &nbsp; &nbsp;
                                                {index + 1}
                                            </div>
                                        </th>
                                        <td>
                                            <Link
                                                className="font-bold"
                                                href={`/manage/repository/${publication.id}`}
                                            >
                                                ({publication.issueDate}){" "}
                                                {publication.title}
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-center mt-10">
                    <div className="join">
                        {Array.from(
                            { length: paginated.meta.lastPage },
                            (_, i) => {
                                const pageNum = i + 1;
                                const query = new URLSearchParams({
                                    page: pageNum.toString(),
                                    ...(search && { search }),
                                }).toString();

                                return (
                                    <a
                                        key={`${i}-page`}
                                        className="join-item btn"
                                        href={`/manage/repository?${query}`}
                                    >
                                        {pageNum}
                                    </a>
                                );
                            },
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
