"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Eye } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function StudiesPage() {
    const studies = useStore((state) => state.studies);

    return (
        <div className="space-y-6 fade-in animate-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Studies</h1>
                    <p className="text-muted-foreground">Manage and monitor active clinical trials.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search studies..." className="pl-9 w-[250px]" />
                    </div>
                    <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filters</Button>
                    <Button>Add Study</Button>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium border-b">
                                <tr>
                                    <th className="px-6 py-4">Study ID</th>
                                    <th className="px-6 py-4 max-w-[300px]">Title</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Phase & Type</th>
                                    <th className="px-6 py-4">Enrollment</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {studies.map((study) => (
                                    <tr key={study.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">{study.studyId}</td>
                                        <td className="px-6 py-4 max-w-[300px] truncate" title={study.title}>{study.title}</td>
                                        <td className="px-6 py-4">
                                            <Badge variant={study.status === "Recruiting" ? "default" : study.status === "Ongoing" ? "secondary" : "outline"}
                                                className={study.status === "Recruiting" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200" : ""}>
                                                {study.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-slate-900">{study.phase}</div>
                                            <div className="text-xs text-muted-foreground">{study.type}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1.5 w-[140px]">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="font-medium">{study.enrolledParticipants} / {study.targetParticipants}</span>
                                                    <span className="text-muted-foreground">{Math.round((study.enrolledParticipants / study.targetParticipants) * 100)}%</span>
                                                </div>
                                                <Progress value={(study.enrolledParticipants / study.targetParticipants) * 100} className="h-1.5" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                                                <Eye className="w-4 h-4 mr-2" /> View
                                            </Button>
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
