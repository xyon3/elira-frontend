"use client";

import axios from "axios";

interface ResearchRequestBody {
    title: string;
    degree: string;
    description: string;
    authors: string;
    issueDate: string;
}

interface BookRequestBody {
    title: string;
    description: string;
    // degree: string;
    // authors: string;
    // issueDate: string;
}

export function UploadingButton(props: {
    children: string;
    trigger: string;
    data: ResearchRequestBody | BookRequestBody;
}) {
    return (
        <button
            className="btn btn-primary"
            onClick={() => {
                if (props.trigger == "research") return createResearchHandler();
                if (props.trigger == "book") return createBookHandler();
            }}
        >
            {props.children}
        </button>
    );
}

async function createResearchHandler() {
    console.log(axios.defaults.baseURL);
    // axios({
    //     method: "POST",
    //     url: "",
    // });
}

async function createBookHandler() {
    // axios({
    //     method: "POST",
    //     url: "",
    // });
}
