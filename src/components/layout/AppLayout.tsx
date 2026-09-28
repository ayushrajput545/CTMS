"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const currentUser = useStore((state) => state.currentUser);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (!currentUser && !pathname.includes("/login") && !pathname.includes("/signup")) {
            router.push("/login");
        }
    }, [currentUser, router, pathname]);

    if (!mounted) return null; // Avoid hydration mismatch on initial render

    if (!currentUser) return <>{children}</>;

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
                    <div className="max-w-7xl mx-auto h-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
