import axios from "axios";

// axios.defaults.baseURL =
//     process.env.NEXT_PUBLIC_ELIRA_BACKEND ?? "ERR_URL_NOTFOUND";

async function allBooks() {
    const response = await axios({ method: "GET", url: "/api/books" });
    console.log(response.data);
}

export const useLibrary = () => ({ allBooks });
