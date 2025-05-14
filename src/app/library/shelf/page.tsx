"use server";
import axios from "axios";
import { Book, Maximize } from "lucide-react";
import { Toaster } from "sonner";

axios.defaults.baseURL = process.env.ELIRA_BACKEND;

export default async function ShelfPage(props: {
    searchParams: Promise<{
        sub: string;
    }>;
}) {
    const { sub } = await props.searchParams;

    const response = await axios({
        method: "GET",
        url: "/api/shelves/" + sub,
    });

    console.log("SHELFRESPONSE: ", response.data);

    if (response.data.length < 1) {
        return <> </>;
    }

    const shelf = response.data[0];

    return (
        <article className="space-y-6">
            <h4 className="font-bold text-4xl">
                {sub === "default" ? "Off the shelf" : `SHELF: ${sub}`}
            </h4>

            <ul className="list">
                {shelf.books.map((book: any) => (
                    <li key={book.id} className="list-row">
                        <Book />
                        <a
                            className="link"
                            href={`/library/book?id=${book.id}`}
                        >
                            {book.title}
                        </a>
                    </li>
                ))}
            </ul>
        </article>
    );
}
