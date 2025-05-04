import { Suspense } from "react";

export default function RepositoryLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <Suspense>{children}</Suspense>;
}
