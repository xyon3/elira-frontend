import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
    const popularityURL = `${process.env.ELIRA_BACKEND}/api/status/v2/popularity/department`;

    const departmentsURL = `${process.env.ELIRA_BACKEND}/api/users?filter=depts`;

    const departmentsResponse = await axios({
        method: "GET",
        url: departmentsURL,
    });

    const departments: any[] = departmentsResponse.data.users.map(
        (d: any) => d.email,
    );

    const stats = await Promise.all(
        departments.map((email) =>
            axios({
                method: "POST",
                url: popularityURL,
                data: {
                    email,
                },
            }).then((res) => res.data),
        ),
    );

    return NextResponse.json({
        departments,
        stats: stats,
    });
}
