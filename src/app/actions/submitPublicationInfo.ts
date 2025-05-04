// app/actions.ts
// "use server";
//
// export async function submitPublicationInfo(formData: FormData) {
//     const title = formData.get("title");
//     const authors = formData.get("authors");
//     const level = formData.get("level");
//     const browser = formData.get("browser");
//     const description = formData.get("description");
//
//     const payload = {
//         title,
//         authors,
//         level,
//         browser,
//         description,
//     };
//
//     const response = await axios({
//         method: "POST",
//         url: "/api/publications",
//         data,
//     });
//
//     // Send to your API route
//     await fetch("http://localhost:3000/api/info-publication", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//     });
// }
