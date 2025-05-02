import axios from "axios";
import { NextResponse, type NextRequest } from "next/server";

axios.defaults.baseURL = process.env.ELIRA_BACKEND;

export async function POST(req: NextRequest) {
    const body = await req.json();

    const data = {
        ...body,
        uploader: "erick.goneda@ushg.phs",
    };

    const response = await axios({
        method: "POST",
        url: "/api/publications",
        data,
    });

    return NextResponse.json({ data, referenceID: response.data.id });
}
