export default function LoadingComponent() {
    return (
        <>
            <div className="fixed w-screen h-screen top-0 left-0 bg-white/60"></div>
            <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 scale-200">
                <span className="loading loading-bars loading-xl"></span>
                UPLOADING..
            </div>
        </>
    );
}
