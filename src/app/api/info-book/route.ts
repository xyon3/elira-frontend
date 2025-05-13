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
        url: "/api/books",
        data,
    });

    return NextResponse.json({ data, referenceID: response.data.id });
}

export async function PUT(req: NextRequest) {
    const params = req.nextUrl.searchParams;
    const form = await req.formData();

    const referenceID = params.get("unique");

    // Get file from the form
    const file = form.get("file") as File | null;

    if (!file) {
        return NextResponse.json(
            { error: "No file uploaded" },
            { status: 400 },
        );
    }

    // Check if file is a PDF
    if (file.type !== "application/pdf") {
        return NextResponse.json(
            { error: "Only PDF files are allowed" },
            { status: 415 },
        ); // 415 Unsupported Media Type
    }

    const maxSizeMB = 20;
    const fileSizeMB = file.size / (1024 * 1024); // Convert from bytes to MB

    if (fileSizeMB >= maxSizeMB) {
        return NextResponse.json(
            { error: "File size exceeds 20MB" },
            { status: 413 },
        );
    }

    // Forward the request to your internal API
    const response = await axios({
        method: "POST",
        url: `/api/file/books/upload?unique=${referenceID}`,
        data: form,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return NextResponse.json({ success: true });
}
