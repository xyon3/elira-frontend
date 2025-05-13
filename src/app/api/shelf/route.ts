import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const URL = process.env.ELIRA_BACKEND ?? "";

export async function GET() {
    const response = await axios({
        method: "GET",
        url: URL + "/api/shelves",
    });

    console.log(response.data);

    return NextResponse.json(response.data);
}

export async function PUT(request: NextRequest) {
    const params = request.nextUrl.searchParams;

    const shelfID = params.get("shelfID");
    const newShelf = params.get("newShelf");
    const bookID = params.get("bookID");

    const removeResponse = await axios({
        method: "PUT",
        url: URL + "/api/shelves/" + shelfID + "/book",
        params: {
            action: "remove",
            book_id: bookID,
        },
    });

    console.log("remove", removeResponse.data);

    const putResponse = await axios({
        method: "PUT",
        url: URL + "/api/shelves/" + newShelf + "/book",
        params: {
            action: "add",
            book_id: bookID,
        },
    });
    console.log("put", putResponse.data);

    return NextResponse.json({});
}
