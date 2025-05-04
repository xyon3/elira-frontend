import axios, { AxiosError } from "axios";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

axios.defaults.baseURL = process.env.ELIRA_BACKEND;

export async function POST(req: NextRequest) {
    const credentials = await req.json();

    const cookieStore = await cookies();

    const defaultToken = cookieStore.get("token");

    // already have token and no intention to signin
    if (
        defaultToken &&
        credentials.username === "" &&
        credentials.password === ""
    ) {
        console.log("// already have token and no intention to signin");
        return NextResponse.json({ msg: "no-op" });
    }

    // no default token then give default token
    if (!defaultToken) {
        cookieStore.set(
            "token",
            JSON.stringify({
                role: "guest",
                session: randomUUID().toString(),
            }),
            {
                path: "/",
                maxAge: 9999999, // 1 day
            },
        );

        console.log("// no default token then give default token");

        return NextResponse.json({ msg: "as guest" });
    }

    // has default token and has intention to login
    try {
        const response = await axios({
            method: "POST",
            url: "/api/auth/signin",
            data: credentials,
        });

        const cookie = response.data.cookieParams;

        cookieStore.set("token", cookie.value, {
            path: "/",
            maxAge: 1000 * 60 * 60 * 2, // 1 day
        });

        return NextResponse.json({ results: JSON.parse(cookie.value) });
    } catch (e) {
        const err = e as AxiosError;

        const response: any = await err.response?.data;

        return NextResponse.json({ results: response });
    }
}
