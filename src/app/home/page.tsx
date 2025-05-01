export default function Home() {
    return (
        <article className="container">
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
    );
}
