"use server";
import axios from "axios";

export default async function Library() {
    const response = await axios({ method: "GET", url: "/api/books" });

    return <></>;
}
