import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

axios.defaults.baseURL = process.env.ELIRA_BACKEND;

export async function DELETE(req: NextRequest) {
    const params = req.nextUrl.searchParams;

    const pubID = params.get("pub_id");

    const response = await axios({
        method: "DELETE",
        url: "/api/publications/" + pubID,
    });

    return NextResponse.json({});
}

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams;

    const pubID = params.get("pub_id");

    const response = await axios({
        method: "GET",
        url: "/api/publications/" + pubID,
    });

    return NextResponse.json(response.data);
}

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

export async function PATCH(req: NextRequest) {
    const params = req.nextUrl.searchParams;
    const body = await req.json();

    const referenceID = params.get("unique");

    const response = await axios({
        method: "PATCH",
        url: "/api/publications/" + referenceID,
        data: body,
        headers: {
            "Content-Type": "application/json",
        },
    });

    return NextResponse.json({ responses: response.data });
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
