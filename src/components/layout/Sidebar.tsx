"use client";

import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard, Users, Building2, UserSquare2, LineChart, CalendarCheck,
    ShieldAlert, Activity, FileCheck2, Database, BarChart3, History, LogOut, Leaf
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function SidebarContent({ onMobileClose }: { onMobileClose?: () => void }) {
    const currentUser = useStore((state) => state.currentUser);
    const logout = useStore((state) => state.logout);
    const pathname = usePathname();
    const router = useRouter();

    if (!currentUser) return null;

    const role = currentUser.role;

    const handleLogout = () => {
        if (onMobileClose) onMobileClose();
        logout();
        router.push("/login");
    };

    const navGroups = [
        {
            label: "OVERVIEW",
            items: [
                { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["Administrator", "Principal Coordinator", "Study Coordinator"] },
            ]
        },
        {
            label: "RESEARCH",
            items: [
                { name: "Studies", href: "/studies", icon: FileCheck2, roles: ["Administrator", "Principal Coordinator", "Study Coordinator"] },
                { name: "Sites", href: "/sites", icon: Building2, roles: ["Administrator", "Principal Coordinator"] },
                { name: "Participants", href: "/participants", icon: Users, roles: ["Administrator", "Principal Coordinator", "Study Coordinator"] },
                { name: "Recruitment", href: "/recruitment", icon: LineChart, roles: ["Administrator", "Principal Coordinator", "Study Coordinator"] },
                { name: "Milestones", href: "/milestones", icon: CalendarCheck, roles: ["Administrator", "Principal Coordinator", "Study Coordinator"] },
            ]
        },
        {
            label: "SAFETY",
            items: [
                { name: "AE / SAE", href: "/safety", icon: ShieldAlert, roles: ["Administrator", "Principal Coordinator", "Study Coordinator"] },
                { name: "Pharmacovigilance", href: "/pharmacovigilance", icon: Activity, roles: ["Administrator", "Principal Coordinator"] },
            ]
        },
        {
            label: "COMPLIANCE",
            items: [
                { name: "Ethics & Regulatory", href: "/compliance", icon: FileCheck2, roles: ["Administrator", "Principal Coordinator"] },
                { name: "Data Quality", href: "/data-quality", icon: Database, roles: ["Administrator", "Principal Coordinator", "Study Coordinator"] },
            ]
        },
        {
            label: "INSIGHTS",
            items: [
                { name: "Reports & Analytics", href: "/reports", icon: BarChart3, roles: ["Administrator", "Principal Coordinator"] },
            ]
        },
        {
            label: "GOVERNANCE",
            items: [
                { name: "Audit Trail", href: "/audit", icon: History, roles: ["Administrator", "Principal Coordinator"] },
                { name: "User Management", href: "/users", icon: UserSquare2, roles: ["Administrator"] },
            ]
        },
    ];

    return (
        <div className="flex flex-col h-full bg-slate-900 text-slate-300">
            {/* Brand */}
            <div className="h-16 flex items-center px-6 border-b border-slate-800 space-x-3 bg-slate-950/50 shrink-0">
                <Leaf className="w-6 h-6 text-emerald-500" />
                <span className="text-xl font-bold tracking-tight text-white">AYUSETU</span>
            </div>

            {/* Scrollable Nav */}
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
                {navGroups.map((group) => {
                    const visibleItems = group.items.filter(item => item.roles.includes(role));
                    if (visibleItems.length === 0) return null;

                    return (
                        <div key={group.label} className="space-y-1">
                            <h3 className="px-3 text-xs font-semibold text-slate-500 tracking-wider mb-2">
                                {group.label}
                            </h3>
                            {visibleItems.map(item => {
                                const isActive = pathname.startsWith(item.href);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => { if (onMobileClose) onMobileClose(); }}
                                        className={cn(
                                            "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                            isActive
                                                ? "bg-emerald-500/10 text-emerald-400"
                                                : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                        )}
                                    >
                                        <item.icon className={cn("w-4 h-4 mr-3", isActive ? "text-emerald-400" : "text-slate-400")} />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            {/* User Profile Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/30 space-y-4 shrink-0">
                <div className="flex items-center space-x-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                        {currentUser.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-white truncate">{currentUser.name}</p>
                        <p className="text-xs text-slate-400 truncate">{currentUser.role}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex flex-row w-full items-center justify-center space-x-2 px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Log out</span>
                </button>
            </div>
        </div>
    );
}

export function Sidebar() {
    return (
        <div className="hidden md:flex w-64 h-screen flex-col border-r border-slate-800 flex-shrink-0">
            <SidebarContent />
        </div>
    );
}
