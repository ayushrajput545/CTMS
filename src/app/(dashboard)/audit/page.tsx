"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AuditPage() {
    const auditLogs = useStore((state) => state.auditLogs);
    const currentUser = useStore((state) => state.currentUser);

    if (currentUser?.role !== "Administrator" && currentUser?.role !== "Principal Coordinator") {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center h-[60vh]">
                <History className="w-12 h-12 text-slate-300 mb-4" />
                <h2 className="text-xl font-bold text-slate-700">Access Denied</h2>
                <p className="text-muted-foreground mt-2">You do not have permission to view the audit trail.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 fade-in animate-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Audit Trail</h1>
                    <p className="text-muted-foreground">Immutable record of all critical system actions.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search logs..." className="pl-9 w-[250px]" />
                    </div>
                    <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filters</Button>
                    <Button variant="outline">Export CSV</Button>
                </div>
            </div>

            <Card className="border-slate-200">
                <CardHeader className="bg-slate-50 border-b pb-4">
                    <CardTitle className="text-sm font-medium flex items-center text-slate-600">
                        <History className="w-4 h-4 mr-2" /> System Logs (Showing recent actions)
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-white text-slate-500 font-medium border-b">
                                <tr>
                                    <th className="px-6 py-4">Timestamp (UTC)</th>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Action</th>
                                    <th className="px-6 py-4">Module / Record</th>
                                    <th className="px-6 py-4">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {auditLogs.map((log) => (
                                    <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-mono text-xs">
                                            {new Date(log.timestamp).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900">{log.user}</div>
                                            <div className="text-xs text-muted-foreground">{log.role}</div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-700">
                                            {log.action}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="outline" className="mr-2 mb-1">{log.module}</Badge>
                                            <br className="sm:hidden" />
                                            <span className="text-xs text-muted-foreground">ID: {log.record}</span>
                                        </td>
                                        <td className="px-6 py-4 text-xs">
                                            {log.previousValue || log.newValue ? (
                                                <div className="flex flex-col gap-1 text-slate-500 font-mono">
                                                    {log.previousValue && <div><span className="text-red-500">-</span> {log.previousValue}</div>}
                                                    {log.newValue && <div><span className="text-emerald-500">+</span> {log.newValue}</div>}
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground italic">No value changes</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
