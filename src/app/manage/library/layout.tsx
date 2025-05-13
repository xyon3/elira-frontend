import React, { Suspense } from "react";

export default function ManageLibraryLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <Suspense>{children}</Suspense>;
}
