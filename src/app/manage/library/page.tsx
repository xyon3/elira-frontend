"use client";
import axios from "axios";
import { Book, FileUp, Save, SquarePen, Trash2, X } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import Swal from "sweetalert2";

export default function ManageLibraryPage() {
    const [shelves, setShelves] = useState<null | any[]>(null);

    useEffect(() => {
        if (!shelves) {
            axios({
                method: "GET",
                url: "/api/shelf",
            }).then((response) => {
                console.log(response.data);
                const firstDefault = response.data.sort((a: any, b: any) =>
                    a._id === "default" ? -1 : b._id === "default" ? 1 : 0,
                );
                setShelves(firstDefault);
            });
        }

        setShelves(shelves);
    }, [shelves]);

    return (
        <>
            <Toaster richColors={true} />
            <div className="space-y-8">
                {shelves &&
                    shelves.map((shelf) => (
                        <Shelf
                            key={shelf._id}
                            identifier={shelf._id}
                            books={shelf.books}
                            shelfIDs={shelves.map((shelfs: any) => shelfs._id)}
                        />
                    ))}
            </div>
        </>
    );
}

function Shelf(props: {
    identifier: string;
    books: any[];
    shelfIDs: string[];
}) {
    return (
        <div className="overflow-x-auto p-6 rounded-4xl space-y-6 bg-base-100 shadow-lg">
            <h2 className="text-3xl font-bold">
                {props.identifier === "default"
                    ? "OFF THE SHELF"
                    : props.identifier}
            </h2>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Book Title</th>
                        <th>Description</th>
                        <th>Change Shelf</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.books &&
                        props.books.map((book) => (
                            <SystemBook
                                key={props.identifier + book._id}
                                identifier={props.identifier}
                                shelfIDs={props.shelfIDs}
                                book={book}
                            />
                        ))}
                </tbody>
                {/* foot 

                <tfoot>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                        <th></th>
                    </tr>
                </tfoot>
                */}
            </table>
        </div>
    );
}

function SystemBook(props: {
    identifier: string;
    book: any;
    shelfIDs: string[];
}) {
    const [isDisabled, setIsDisabled] = useState(true);

    const [previousBookDetails, setPreviousBookDetails] = useState({
        bookID: props.book.id,
        title: props.book.title,
        description: props.book.description,
        shelfID: props.identifier,
    });

    const [bookDetails, setBookDetails] = useState({
        bookID: props.book.id,
        title: props.book.title,
        description: props.book.description,
        shelfID: props.identifier,
    });

    const handleSave = async () => {
        setIsDisabled(true);

        await axios({
            method: "PUT",
            url: "/api/book",
            data: bookDetails,
        }).then(() => {
            if (previousBookDetails !== bookDetails) {
                toast.warning("Book successfully updated");
            }
        });

        await axios({
            method: "PUT",
            url: "/api/shelf",
            params: {
                shelfID: previousBookDetails.shelfID,
                bookID: bookDetails.bookID,
                newShelf: bookDetails.shelfID,
            },
        }).then(() => {
            if (previousBookDetails.shelfID !== bookDetails.shelfID) {
                toast.warning("Book changed shelves");
            }
        });

        if (file) {
            await fileUploadHandler(file, bookDetails.bookID, "book").then(
                () => {
                    toast.warning("Book file was updated");
                },
            );
        }

        setPreviousBookDetails(bookDetails);
    };

    const handleChangeShelfID = (e: ChangeEvent<HTMLSelectElement>) => {
        setBookDetails({
            ...bookDetails,
            shelfID: e.target.value,
        });
    };

    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <>
            <tr>
                <td className="w-[28rem]">
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <Book />
                        </div>
                        <div>
                            <textarea
                                className={`font-bold resize-none w-96 ${isDisabled ? "" : "border border-blue-300"}`}
                                spellCheck={false}
                                disabled={isDisabled}
                                value={bookDetails.title}
                                onChange={(
                                    e: ChangeEvent<HTMLTextAreaElement>,
                                ) => {
                                    setBookDetails({
                                        ...bookDetails,
                                        title: e.target.value,
                                    });
                                }}
                            />
                            <div className="text-sm opacity-50">
                                {bookDetails.bookID}
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <textarea
                        className="textarea resize-none"
                        placeholder="Description"
                        disabled={isDisabled}
                        value={bookDetails.description}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                            setBookDetails({
                                ...bookDetails,
                                description: e.target.value,
                            });
                        }}
                    ></textarea>
                </td>
                <th>
                    <div className="">
                        <select
                            className="select"
                            disabled={isDisabled}
                            value={bookDetails.shelfID}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                handleChangeShelfID(e);
                            }}
                        >
                            {props.shelfIDs.map((id) => (
                                <option key={props.identifier + id}>
                                    {id}
                                </option>
                            ))}
                        </select>
                    </div>
                </th>
                <th>
                    <div className="flex gap-2">
                        {isDisabled ? (
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setIsDisabled(false);
                                }}
                            >
                                <SquarePen />
                                Edit
                            </button>
                        ) : (
                            <button
                                className="btn btn-success"
                                onClick={() => {
                                    handleSave();
                                }}
                            >
                                <Save />
                                Save
                            </button>
                        )}
                        {isDisabled ? (
                            <button
                                className="btn btn-error"
                                onClick={() => {
                                    // setIsDisabled(false);

                                    Swal.fire({
                                        icon: "warning",
                                        title: "Delete Action",
                                        text: "You are about to remove a book and will not be recovered",
                                        showCancelButton: true,
                                        showCloseButton: true,
                                        confirmButtonText: "DELETE",
                                        confirmButtonColor: "#ff6266",
                                    }).then(
                                        ({
                                            isConfirmed,
                                            isDenied,
                                            isDismissed,
                                        }) => {
                                            if (isConfirmed) {
                                                axios({
                                                    method: "DELETE",
                                                    url: "/api/book",
                                                    data: {
                                                        bookID: bookDetails.bookID,
                                                    },
                                                }).then(() => {
                                                    toast.warning(
                                                        "Book has been deleted",
                                                        {},
                                                    );
                                                });
                                            }

                                            if (isDenied || isDismissed) {
                                            }
                                        },
                                    );
                                }}
                            >
                                <Trash2 />
                                Remove
                            </button>
                        ) : (
                            <button
                                className="btn btn-error"
                                onClick={() => {
                                    setIsDisabled(true);
                                    setBookDetails(previousBookDetails);
                                }}
                            >
                                <X />
                                Cancel
                            </button>
                        )}
                        <input
                            className="file-input file-input-warning"
                            disabled={isDisabled}
                            type="file"
                            onChange={handleFileChange}
                        />
                    </div>
                </th>
            </tr>
        </>
    );
}

async function fileUploadHandler(
    file: File | null,
    referenceID: string,
    type: string,
) {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const url =
        type === "publication"
            ? "/api/info-publication?unique="
            : "/api/info-book?unique=";

    const res = await axios.put(url + referenceID, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}
