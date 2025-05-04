"use server";
import axios from "axios";
import { BookMarked, FileText, Search } from "lucide-react";

axios.defaults.baseURL = process.env.ELIRA_BACKEND;

export default async function Repository(props: {
    searchParams: Promise<{
        page: string;
    }>;
}) {
    const { page } = await props.searchParams;

    const recentresponse = await axios({
        method: "GET",
        url: "/api/publications?isPaginated=1&page=1&limit=5",
    });

    const paginatedResponse = await axios({
        method: "GET",
        url:
            "/api/publications?isPaginated=1&limit=12&randomize=1&page=" +
            (page ? page : 1),
    });

    const recentResearches = recentresponse.data.data;
    const paginated = paginatedResponse.data;

    console.log(paginated);

    return (
        <article className="space-y-6">
            <section className="space-y-8 flex flex-col items-center">
                <div className="bg-base-300/40 w-full flex justify-center rounded-3xl">
                    <img
                        className="rounded-3xl drop-shadow"
                        src="/assets/repository-banner.png"
                        alt="repository-banner"
                        width={800}
                    />
                </div>

                <p className="text-lg w-[800px]">
                    The Research Repository of the University of Perpetual Help
                    System GMA Campus, in collaboration with the University
                    Library and Research Office, welcomes research contributions
                    from faculty, students, and organizations within the campus
                    community.
                </p>
            </section>

            <div className="divider"></div>

            <section className="grid grid-cols-2">
                <div className="p-8">
                    <h4 className="font-bold text-lg">Departments</h4>
                    <ul className="list"></ul>
                </div>
                <div className="p-8">
                    <h4 className="font-bold text-lg">Recent uploads</h4>
                    <ul className="list">
                        {recentResearches.map((research: any) => {
                            return (
                                <li
                                    key={research.id}
                                    className="list-row hover:bg-base-200"
                                >
                                    <a
                                        href={`${process.env.ELIRA_BACKEND}${research.path}/${research.filename}`}
                                    >
                                        {research.title} ({research.issueDate})
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>

            <div className="divider"></div>

            <section className="grid space-y-8 place-items-center mt-24">
                <h2
                    id="search"
                    className="font-black text-4xl flex items-center"
                >
                    <BookMarked size={64} />
                    &nbsp; The Repository
                </h2>

                <label className="input input-lg max-w-96 w-full">
                    <Search />

                    <input
                        type="search"
                        className="grow"
                        placeholder="Search"
                    />
                </label>

                <div className="grid place-items-center gap-8">
                    <ul className="list text-lg">
                        {paginated.data.map((research: any) => {
                            return (
                                <li
                                    key={research.id + "00"}
                                    className="list-row hover:bg-base-200"
                                >
                                    <FileText />
                                    <a
                                        href={`${process.env.ELIRA_BACKEND}${research.path}/${research.filename}`}
                                    >
                                        {research.title} ({research.issueDate})
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="join">
                        {Array.from(
                            { length: paginated.meta.lastPage },
                            (_, i) => {
                                return (
                                    <a
                                        key={`${i}-page`}
                                        className="join-item btn"
                                        href={`/repository?page=${i + 1}#search`}
                                    >
                                        {i + 1}
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
