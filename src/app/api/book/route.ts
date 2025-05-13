import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const URL = process.env.ELIRA_BACKEND ?? "";

export async function PUT(request: NextRequest) {
    const bookDetails = await request.json();

    console.log(URL + "/api/books/" + bookDetails.bookID);

    const response = await axios({
        method: "PATCH",
        url: URL + "/api/books/" + bookDetails.bookID,
        data: {
            title: bookDetails.title,
            description: bookDetails.description,
        },
    });

    return NextResponse.json({});
}

export async function DELETE(request: NextRequest) {
    const bookDetails = await request.json();
    const response = await axios({
        method: "DELETE",
        url: URL + "/api/books/" + bookDetails.bookID,
    });
    return NextResponse.json({});
}
