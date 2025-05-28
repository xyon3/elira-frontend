import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const url =
        "/files/books/7decc908906342dab45fc026a813c84e-ReactJSNotesForProfessionals.pdf";

    const params = request.nextUrl.searchParams;

    const paramsFile = params.get("file");

    const file = await axios({
        method: "GET",
        url: "http://localhost:3443" + paramsFile,
        responseType: "arraybuffer",
    });

    return new NextResponse(file.data, {
        status: 200,
        headers: {
            "Content-Type": "application/pdf",
        },
    });
}
