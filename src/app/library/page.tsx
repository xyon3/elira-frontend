"use server";
import axios from "axios";
import {
    Book,
    BookMarked,
    FileText,
    Search,
    SquareLibrary,
} from "lucide-react";
import { Toaster } from "sonner";

axios.defaults.baseURL = process.env.ELIRA_BACKEND;

export default async function LibraryPage(props: {
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

    const shelfedResponse = await axios({
        method: "GET",
        url: "/api/shelves",
    });

    console.log(shelfedResponse.data);

    const paginated = paginatedResponse.data;

    console.log(paginated);

    return (
        <article className="space-y-6">
            <Toaster />
            <section className="grid space-y-8 mt-16 w-full">
                <h2
                    id="search"
                    className="font-black text-4xl flex items-center"
                >
                    <SquareLibrary size={64} />
                    &nbsp; E-Library
                </h2>

                <div className="grid gap-16">
                    {shelfedResponse.data.length > 0 &&
                        shelfedResponse.data
                            .sort((a: any, b: any) =>
                                a._id === "default"
                                    ? -1
                                    : b._id === "default"
                                      ? 1
                                      : 0,
                            )
                            .map((shelf: any) => {
                                return (
                                    shelf.books.length > 0 && (
                                        <div key={shelf._id}>
                                            <div className="flex gap-4 items-center">
                                                <a
                                                    href={`/library/shelf?sub=${shelf._id}`}
                                                    className="btn btn-info btn-xs"
                                                >
                                                    See more
                                                </a>
                                                <h4 className="font-bold text-xl">
                                                    {shelf._id === "default"
                                                        ? "Off the shelf"
                                                        : `SHELF: ${shelf._id}`}
                                                </h4>
                                            </div>
                                            <ul className="list">
                                                {shelf.books.map(
                                                    (book: any) => (
                                                        <li
                                                            key={book.id}
                                                            className="list-row"
                                                        >
                                                            <Book />
                                                            <a
                                                                className="link"
                                                                href={`/library/book?id=${book.id}`}
                                                            >
                                                                {book.title}
                                                            </a>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    )
                                );
                            })}
                </div>

                {/*
                <label className="input input-lg max-w-96 w-full">
                    <Search />

                    <input
                        type="search"
                        className="grow"
                        placeholder="Search"
                    />
                </label>


                <div className="grid gap-8">
                    <ul className="list text-lg">
                        {paginated.data.length > 0 ? (
                            paginated.data.map((book: any) => {
                                return (
                                    <li
                                        key={book.id + "00"}
                                        className="list-row hover:bg-base-200"
                                    >
                                        <Book />
                                        <a
                                            href={`/library/book/?id=${book.id}`}
                                        >
                                            {book.title}
                                        </a>
                                    </li>
                                );
                            })
                        ) : (
                            <div className="text-center flex flex-col gap-12 mt-32">
                                <span className="text-9xl">🤷🏻</span>
                                <div>
                                    <h3 className="font-bold text-4xl">
                                        There are no books here..
                                    </h3>
                                    <p>Ask the a custodian to upload some!</p>
                                </div>
                            </div>
                        )}
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

                     * */}
            </section>
        </article>
    );
}
