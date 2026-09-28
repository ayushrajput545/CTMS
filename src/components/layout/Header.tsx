"use client";

import { useStore } from "@/lib/store";
import { Bell, HelpCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
    const currentUser = useStore((state) => state.currentUser);

    if (!currentUser) return null;

    return (
        <header className="h-16 border-b bg-white flex items-center justify-between px-6 flex-shrink-0">
            <div className="flex-1 max-w-md">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search studies, participants, or cases..."
                        className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-primary/20"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-700">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-destructive border-2 border-white"></span>
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-700">
                    <HelpCircle className="h-5 w-5" />
                </Button>
                <div className="h-8 w-px bg-slate-200 mx-2"></div>
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-sm font-medium leading-none">{currentUser.name}</span>
                        <span className="text-xs text-muted-foreground mt-1">{currentUser.role}</span>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center">
                        {currentUser.name.charAt(0)}
                    </div>
                </div>
            </div>
        </header>
    );
}
