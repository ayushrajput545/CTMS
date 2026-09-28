"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Bell, HelpCircle, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarContent } from "./Sidebar";

export function Header() {
    const currentUser = useStore((state) => state.currentUser);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    if (!currentUser) return null;

    return (
        <header className="h-16 border-b bg-white flex items-center justify-between px-4 md:px-6 flex-shrink-0 overflow-hidden">
            <div className="flex items-center flex-1 gap-2 md:gap-4 md:max-w-md">
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetTrigger render={
                        <Button variant="ghost" size="icon" className="md:hidden text-slate-500 hover:text-slate-700 -ml-2 shrink-0" />
                    }>
                        <Menu className="h-6 w-6" />
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64 bg-slate-900 border-r-slate-800 overflow-hidden">
                        <SidebarContent onMobileClose={() => setMobileMenuOpen(false)} />
                    </SheetContent>
                </Sheet>

                <div className="relative group flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search studies, participants..."
                        className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-primary/20 text-sm md:text-base h-9 md:h-10 w-full"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4 pl-2">
                <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-700 shrink-0">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-destructive border-2 border-white"></span>
                </Button>
                <Button variant="ghost" size="icon" className="hidden sm:inline-flex text-slate-500 hover:text-slate-700 shrink-0">
                    <HelpCircle className="h-5 w-5" />
                </Button>
                <div className="hidden sm:block h-8 w-px bg-slate-200 mx-2 shrink-0"></div>
                <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-sm font-medium leading-none">{currentUser.name}</span>
                        <span className="text-xs text-muted-foreground mt-1">{currentUser.role}</span>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center shrink-0">
                        {currentUser.name.charAt(0)}
                    </div>
                </div>
            </div>
        </header>
    );
}
