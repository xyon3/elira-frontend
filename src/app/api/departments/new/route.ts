// /app/api/departments/new/route.ts
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { fullname, email, password } = body;

    // Perform your creation logic here
    console.log("Creating department:", body);

    // You might store in DB, send email, etc.

    const data = {
        fullname,
        email,
        password,
        role: 2,
    };

    const response = await axios({
        method: "POST",
        url: process.env.ELIRA_BACKEND + "/api/users",
        data,
    });

    return NextResponse.json(
        { message: "Department created", res: response.data },
        { status: 200 },
    );
}
