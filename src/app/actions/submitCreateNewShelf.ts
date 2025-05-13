"use server";

import axios from "axios";

export async function createNewShelf(formData: FormData): Promise<void> {
    const _id = formData.get("_id");

    try {
        const res = await axios({
            method: "POST",
            url: `${process.env.ELIRA_BACKEND || ""}/api/shelves`,
            data: { _id, description: "" },
        });
    } catch (error: any) {
        console.error("Shelf creation failed:", error.message);
    }
}
