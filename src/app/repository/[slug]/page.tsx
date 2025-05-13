"use server";
import axios from "axios";
import { BookMarked, FileText, School, Search } from "lucide-react";
import { Toaster } from "sonner";

axios.defaults.baseURL = process.env.ELIRA_BACKEND;

export default async function Repository(props: {
    searchParams: Promise<{
        page?: string;
        search?: string;
    }>;
}) {
    const { page = "1", search = "" } = await props.searchParams;

    const paginatedResponse = await axios({
        method: "GET",
        url: "/api/publications",
        params: {
            isPaginated: 1,
            limit: 12,
            randomize: 1,
            page,
            keyword: search,
        },
    });

    const departments = await axios({
        method: "GET",
        url: "/api/users",
        params: {
            filter: "depts",
        },
    });

    const paginated = paginatedResponse.data;

    return (
        <article className="space-y-6">
            <Toaster />

            <section className="grid space-y-8 place-items-center mt-24">
                <h2
                    id="therepo"
                    className="font-black text-4xl flex items-center"
                >
                    <BookMarked size={64} />
                    &nbsp; The Repository
                </h2>

                {/* Search Form */}
                <form
                    method="GET"
                    action="/repository#therepo"
                    className="w-full max-w-96"
                >
                    <label className="input input-lg w-full">
                        <Search />
                        <input
                            type="search"
                            name="search"
                            defaultValue={search}
                            className="grow"
                            placeholder="Search"
                        />
                    </label>
                </form>

                <div className="grid place-items-center gap-8">
                    <ul className="list text-lg">
                        {paginated.data.length > 0 ? (
                            paginated.data.map((research: any) => {
                                return (
                                    <li
                                        key={research.id + "00"}
                                        className="list-row hover:bg-base-200"
                                    >
                                        <FileText />
                                        <a
                                            href={`${process.env.ELIRA_BACKEND}${research.path}/${research.filename}`}
                                        >
                                            {research.title} (
                                            {research.issueDate})
                                        </a>
                                    </li>
                                );
                            })
                        ) : (
                            <div className="text-center flex flex-col gap-12 mt-32">
                                <span className="text-9xl">🤷🏻</span>
                                <div>
                                    <h3 className="font-bold text-4xl">
                                        There are no papers here..
                                    </h3>
                                    <p>Ask the a custodian to upload some!</p>
                                </div>
                            </div>
                        )}
                    </ul>
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
                                        href={`/repository?${query}#search`}
                                    >
                                        {pageNum}
                                    </a>
                                );
                            },
                        )}
                    </div>
                </div>
            </section>
        </article>
    );
}
