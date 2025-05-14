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

    const recentresponse = await axios({
        method: "GET",
        url: "/api/publications?isPaginated=1&page=1&limit=5",
    });

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

    const recentResearches = recentresponse.data.data;
    const paginated = paginatedResponse.data;

    return (
        <article className="space-y-6">
            <Toaster />
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
                    <ul className="list">
                        {departments.data.users.length > 0 ? (
                            departments.data.users.map((depts: any) => {
                                return (
                                    <li
                                        key={depts.id}
                                        className="list-row hover:bg-base-200"
                                    >
                                        <a
                                            href={`/repository/${depts.email}`}
                                            className=" flex items-center gap-4 font-bold"
                                        >
                                            <School />
                                            {depts.fullname}
                                        </a>
                                    </li>
                                );
                            })
                        ) : (
                            <div className="text-center flex items-center gap-6 mt-6">
                                <span className="text-5xl">🤷🏻</span>
                                <div>
                                    <h3 className="font-bold text-xl">
                                        There are no papers here..
                                    </h3>
                                    <p>Ask the a custodian to upload some!</p>
                                </div>
                            </div>
                        )}
                    </ul>
                </div>
                <div className="p-8">
                    <h4 className="font-bold text-lg">Recent uploads</h4>
                    <ul className="list">
                        {recentResearches.length > 0 ? (
                            recentResearches.map((research: any) => {
                                return (
                                    <li
                                        key={research.id}
                                        className="list-row hover:bg-base-200"
                                    >
                                        <a
                                            href={`/repository/publication?_id=${research.id}`}
                                            // href={`${process.env.ELIRA_BACKEND}${research.path}/${research.filename}`}
                                        >
                                            {research.title} (
                                            {research.issueDate})
                                        </a>
                                    </li>
                                );
                            })
                        ) : (
                            <div className="text-center flex items-center gap-6 mt-6">
                                <span className="text-5xl">🤷🏻</span>
                                <div>
                                    <h3 className="font-bold text-xl">
                                        There are no papers here..
                                    </h3>
                                    <p>Ask the a custodian to upload some!</p>
                                </div>
                            </div>
                        )}
                    </ul>
                </div>
            </section>

            <div className="divider"></div>

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
                                            href={`/repository/publication?_id=${research.id}`}
                                            // href={`${process.env.ELIRA_BACKEND}${research.path}/${research.filename}`}
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
