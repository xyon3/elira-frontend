"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

// const departments = [
//     {
//         email: "cba@gma.uphsl.edu.ph",
//         book_v: 0,
//         book_u: 0,
//         publication_v: 0.2351648351648352,
//         publication_u: 0.16000000000000003,
//         popularity: 0.39516483516483525,
//     },
//     {
//         email: "ccs@gma.uphsl.edu.ph",
//         book_v: 0,
//         book_u: 0.2,
//         publication_v: 0.221978021978022,
//         publication_u: 0.16000000000000003,
//         popularity: 0.5819780219780221,
//     },
//     {
//         email: "eng@gma.uphsl.edu.ph",
//         book_v: 0,
//         book_u: 0,
//         publication_v: 0.0043956043956043965,
//         publication_u: 0.08000000000000002,
//         popularity: 0.08439560439560441,
//     },
// ];

export default function Home() {
    const [departments, setDepartments] = useState<any[] | null>(null);

    useEffect(() => {
        axios({
            method: "POST",
            url: "/api/auth",
            data: {
                username: "",
                password: "",
            },
        });
        axios({
            method: "GET",
            url: "/api/stats",
        }).then((res) => setDepartments(res.data.stats));
    }, []);

    if (!departments) {
        return <> </>;
    }

    const book_popularity = departments
        .map((dept) => ({
            email: dept.email,
            bookScore: dept.book_u + dept.book_v,
            totalBooks: dept.totals.totalSubjectBookLength,
            totalViews: dept.totals.totalSubjectBookViews,
        }))
        .sort((a, b) => b.bookScore - a.bookScore);

    const publication_popularity = departments
        .map((dept) => ({
            email: dept.email,
            publicationScore: dept.publication_u + dept.publication_v,
            totalPublictions: dept.totals.totalSubjectPublicationLength,
            totalViews: dept.totals.totalSubjectPublicationViews,
        }))
        .sort((a, b) => b.publicationScore - a.publicationScore);

    return (
        <>
            <article className="container">
                <Toaster />
                <div
                    className="hero h-96 rounded-2xl"
                    style={{
                        backgroundImage: "url(/assets/uphsg-1.jpg)",
                    }}
                >
                    <div className="hero-overlay rounded-2xl"></div>
                    <div className="hero-content text-neutral-content text-center">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">
                                Welcome, Guest!
                            </h1>
                            <p className="mb-5">
                                your on-campus digital hub for textbooks, study
                                tools, research papers, theses, and capstone
                                projects, all accessible anytime within the
                                university.
                            </p>
                        </div>
                    </div>
                </div>
            </article>

            <div className="grid gap-12">
                <div className="stats shadow">
                    {departments.map((dept) => {
                        return (
                            <div
                                key={dept.email}
                                className="stat place-items-center space-y-4"
                            >
                                <div className="stat-title font-bold text-md">
                                    {dept.email}
                                </div>

                                <div
                                    className="radial-progress"
                                    style={
                                        {
                                            "--value": dept.popularity * 100,
                                        } as React.CSSProperties
                                    }
                                    aria-valuenow={dept.popularity * 100}
                                    role="progressbar"
                                >
                                    {Math.round(dept.popularity * 100)}
                                </div>

                                <div className="stat-desc">
                                    Total Popularity
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="flex gap-4">
                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <h2 className="font-bold my-2 text-center text-black/75">
                            Publication Popularity
                        </h2>
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Department</th>
                                    <th>Views</th>
                                    <th>Uploads</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {publication_popularity.map((dept, index) => (
                                    <tr
                                        key={
                                            dept.email + "PUBLICATIONPOPULARITY"
                                        }
                                    >
                                        <th>{index + 1}</th>
                                        <td>{dept.email}</td>
                                        <td>{dept.totalViews}</td>
                                        <td>{dept.totalPublictions}</td>
                                        <td>
                                            {Math.round(
                                                dept.publicationScore * 100,
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <h2 className="font-bold my-2 text-center text-black/75">
                            Book Popularity
                        </h2>
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Department</th>
                                    <th>Views</th>
                                    <th>Uploads</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {book_popularity.map((dept, index) => (
                                    <tr key={dept.email + "BOOKPOPULARITY"}>
                                        <th>{index + 1}</th>
                                        <td>{dept.email}</td>
                                        <td>{dept.totalViews}</td>
                                        <td>{dept.totalBooks}</td>
                                        <td>
                                            {Math.round(dept.bookScore * 100)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
