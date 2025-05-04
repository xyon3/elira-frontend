import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

axios.defaults.baseURL = process.env.ELIRA_BACKEND;

export async function POST(req: NextRequest) {
    const body = await req.json();

    const cookieStore = await cookies();

    const tokenstring = cookieStore.get("token");

    const token = JSON.parse(tokenstring?.value ?? "{}");

    const data = {
        ...body,
        uploader: token.email,
    };

    const response = await axios({
        method: "POST",
        url: "/api/publications",
        data,
    });

    return NextResponse.json({ data, referenceID: response.data.id });
}

export async function PUT(req: NextRequest) {
    const params = req.nextUrl.searchParams;
    const form = await req.formData();

    const referenceID = params.get("unique");

    console.log(referenceID);

    const response = await axios({
        method: "POST",
        url: "/api/file/publications/upload?unique=" + referenceID,
        data: form,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return NextResponse.json({});
}
