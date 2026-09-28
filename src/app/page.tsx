"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export default function Home() {
  const router = useRouter();
  const currentUser = useStore((state) => state.currentUser);

  useEffect(() => {
    if (currentUser) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [currentUser, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-primary/20 mb-4 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-primary"></div>
        </div>
        <p className="text-muted-foreground font-medium">Loading AYUSETU...</p>
      </div>
    </div>
  );
}
