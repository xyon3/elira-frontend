"use server";
import axios from "axios";
import { headers } from "next/headers";

export async function createNewDepartmentAction(formData: FormData) {
    const fullname = formData.get("fullname")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const role = 2;

    const header = await headers();
    const host = header.get("host");

    const data = {
        fullname,
        email,
        password,
        role,
    };

    axios({
        method: "POST",
        url: process.env.ELIRA_BACKEND + "/api/users",
        data,
    });
}
