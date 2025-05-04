"use server";
import axios from "axios";
import {
    Book,
    BookMarked,
    FileText,
    Search,
    SquareLibrary,
} from "lucide-react";

axios.defaults.baseURL = process.env.ELIRA_BACKEND;

export default async function Repository(props: {
    searchParams: Promise<{
        page: string;
    }>;
}) {
    const { page } = await props.searchParams;

    const paginatedResponse = await axios({
        method: "GET",
        url:
            "/api/books?isPaginated=1&limit=12&randomize=1&page=" +
            (page ? page : 1),
    });

    const paginated = paginatedResponse.data;

    console.log(paginated);

    return (
        <article className="space-y-6">
            <section className="grid space-y-8 mt-16 w-full">
                <h2
                    id="search"
                    className="font-black text-4xl flex items-center"
                >
                    <SquareLibrary size={64} />
                    &nbsp; E-Library
                </h2>

                {/*
                <label className="input input-lg max-w-96 w-full">
                    <Search />

                    <input
                        type="search"
                        className="grow"
                        placeholder="Search"
                    />
                </label>
                     * */}

                <div className="grid gap-8">
                    <ul className="list text-lg">
                        {paginated.data.map((book: any) => {
                            return (
                                <li
                                    key={book.id + "00"}
                                    className="list-row hover:bg-base-200"
                                >
                                    <Book />
                                    <a
                                        href={`${process.env.ELIRA_BACKEND}${book.path}/${book.filename}`}
                                    >
                                        {book.title}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="grid gap-8 place-items-center">
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
                </div>
            </section>
        </article>
    );
}
