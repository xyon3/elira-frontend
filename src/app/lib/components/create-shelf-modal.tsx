import { createNewShelf } from "@/app/actions/submitCreateNewShelf";
import { useRouter } from "next/navigation";

export default function CreateNewShelfModal(props: {
    modal_shelf: string | null;
}) {
    const { modal_shelf } = props;

    const router = useRouter();

    if (modal_shelf !== "") {
        return <></>;
    }

    return (
        <>
            <div className="fixed z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/15 backdrop-blur-xs h-screen w-screen"></div>
            <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-3xl">
                <form action={createNewShelf} className="space-y-4">
                    <label className="floating-label">
                        <span>New Shelf</span>

                        <input
                            type="text"
                            name="_id"
                            className="input input-lg"
                            placeholder="Shelf name"
                            required
                        />
                    </label>
                    <div className="flex flex-row-reverse gap-2">
                        <button
                            className="btn btn-error"
                            onClick={() => {
                                router.replace("/manage/library");
                            }}
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={() =>
                                (window.location.href = "/manage/library")
                            }
                        >
                            Create Shelf
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
