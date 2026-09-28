"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, FileText, AlertTriangle, ShieldCheck, Activity, CheckCircle2, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export default function DashboardPage() {
    const currentUser = useStore((state) => state.currentUser);
    const studies = useStore((state) => state.studies);
    const participants = useStore((state) => state.participants);
    const safetyEvents = useStore((state) => state.safetyEvents);
    const compliance = useStore((state) => state.complianceItems);

    if (!currentUser) return null;

    const role = currentUser.role;

    // Dashboard Data Aggregation
    const activeStudies = studies.filter(s => s.status === "Recruiting" || s.status === "Ongoing");
    const enrolledParticipantsCount = participants.filter(p => p.status === "Enrolled").length;
    const openSafetyCases = safetyEvents.filter(se => se.status === "Open" || se.status === "Under Review");
    const attentionCompliance = compliance.filter(c => c.status === "Overdue" || c.status === "Action Required");

    // Chart Data
    const recruitmentData = studies.map(s => ({
        name: s.studyId,
        target: s.targetParticipants,
        enrolled: s.enrolledParticipants
    }));

    const safetyData = [
        { name: "Jan", events: 0 },
        { name: "Feb", events: 1 },
        { name: "Mar", events: 0 },
        { name: "Apr", events: 2 },
        { name: "May", events: 1 },
        { name: "Jun", events: 3 },
        { name: "Jul", events: 2 },
        { name: "Aug", events: 4 },
        { name: "Sep", events: safetyEvents.length },
    ];

    const adminDashboard = (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Total Active Studies</CardTitle>
                        <FileText className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeStudies.length}</div>
                        <p className="text-xs text-slate-500 mt-1">Across 7 sites</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Active Participants</CardTitle>
                        <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{enrolledParticipantsCount}</div>
                        <p className="text-xs text-slate-500 mt-1">+12 this month</p>
                    </CardContent>
                </Card>
                <Card className={openSafetyCases.length > 0 ? "border-amber-200 bg-amber-50" : ""}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-amber-700">Open Safety Cases</CardTitle>
                        <AlertTriangle className={`h-4 w-4 ${openSafetyCases.length > 0 ? "text-amber-600" : "text-slate-400"}`} />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${openSafetyCases.length > 0 ? "text-amber-700" : ""}`}>{openSafetyCases.length}</div>
                        <p className="text-xs text-amber-600 mt-1">Requiring immediate review</p>
                    </CardContent>
                </Card>
                <Card className={attentionCompliance.length > 0 ? "border-red-200 bg-red-50" : ""}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-red-700">Pending Compliance</CardTitle>
                        <ShieldCheck className={`h-4 w-4 ${attentionCompliance.length > 0 ? "text-red-600" : "text-slate-400"}`} />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${attentionCompliance.length > 0 ? "text-red-700" : ""}`}>{attentionCompliance.length}</div>
                        <p className="text-xs text-red-600 mt-1">Overdue items detected</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recruitment Progress</CardTitle>
                        <CardDescription>Target vs Enrolled by Study</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={recruitmentData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                <RechartsTooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="target" name="Target" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="enrolled" name="Enrolled" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Safety Event Trend</CardTitle>
                        <CardDescription>AE/SAE occurrences over time</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={safetyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                <RechartsTooltip />
                                <Line type="monotone" dataKey="events" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center space-x-2">
                            <Activity className="h-5 w-5 text-amber-500" />
                            <CardTitle>High Priority Attention</CardTitle>
                        </div>
                        <CardDescription>Items that require immediate action</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {openSafetyCases.map(se => (
                            <div key={se.id} className="flex flex-col md:flex-row md:items-center justify-between p-3 border rounded-lg bg-white border-amber-200">
                                <div className="flex flex-col">
                                    <span className="font-medium text-sm">{se.caseId} - {se.severity} {se.eventType}</span>
                                    <span className="text-xs text-muted-foreground">{se.studyId} | Participant: {se.participantId}</span>
                                </div>
                                <div className="mt-2 md:mt-0 flex items-center gap-2">
                                    <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full font-medium">{se.status}</span>
                                </div>
                            </div>
                        ))}
                        {attentionCompliance.map(c => (
                            <div key={c.id} className="flex flex-col md:flex-row md:items-center justify-between p-3 border rounded-lg bg-white border-red-200">
                                <div className="flex flex-col">
                                    <span className="font-medium text-sm">{c.category}: {c.title}</span>
                                    <span className="text-xs text-muted-foreground">{c.studyId} | Due: {c.dueDate}</span>
                                </div>
                                <div className="mt-2 md:mt-0 flex items-center gap-2">
                                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">{c.status}</span>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );

    const pcDashboard = (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-800">Overview</h2>
                    <p className="text-muted-foreground">Monitor your active research protocols.</p>
                </div>
            </div>

            {/* Similar to admin but more focused */}
            {adminDashboard}
        </div>
    );

    const scDashboard = (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-emerald-50 border-emerald-100">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-emerald-800">My Active Studies</p>
                                <p className="text-4xl font-bold text-emerald-900">{studies.filter(s => s.status !== "Completed").length}</p>
                            </div>
                            <div className="p-3 bg-emerald-200/50 rounded-lg">
                                <FileText className="w-6 h-6 text-emerald-700" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-100">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-blue-800">Participants Enrolled</p>
                                <p className="text-4xl font-bold text-blue-900">{enrolledParticipantsCount}</p>
                            </div>
                            <div className="p-3 bg-blue-200/50 rounded-lg">
                                <Users className="w-6 h-6 text-blue-700" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-50 border-slate-200">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-slate-800">Pending Tasks</p>
                                <p className="text-4xl font-bold text-slate-900">4</p>
                            </div>
                            <div className="p-3 bg-slate-200/50 rounded-lg">
                                <CheckCircle2 className="w-6 h-6 text-slate-700" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Today's Schedule</CardTitle>
                        <CardDescription>Upcoming visits and tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {["09:00 AM - PT-001 Follow-up Visit", "11:30 AM - PT-023 SAE Check", "02:00 PM - Data Entry Verification"].map((task, i) => (
                                <div key={i} className="flex items-center space-x-4 p-3 border rounded-lg bg-white hover:bg-slate-50">
                                    <div className="w-2 h-10 bg-primary/20 rounded-full"></div>
                                    <Clock className="h-5 w-5 text-muted-foreground" />
                                    <span className="font-medium text-sm">{task}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 text-sm">
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                <p><span className="font-medium">PT-029</span> was enrolled in AYU-2026-001</p>
                                <span className="text-muted-foreground text-xs ml-auto">2h ago</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                <p>Submitted AE-2026-089 for review</p>
                                <span className="text-muted-foreground text-xs ml-auto">1d ago</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                <p>Completed visit documentation for PT-002</p>
                                <span className="text-muted-foreground text-xs ml-auto">1d ago</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );

    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Welcome back, {currentUser.name.split(' ')[0]}
                </h1>
                <p className="text-muted-foreground">
                    Here's what's happening in your AYUSETU dashboard today.
                </p>
            </div>

            {role === "Administrator" && adminDashboard}
            {role === "Principal Coordinator" && pcDashboard}
            {role === "Study Coordinator" && scDashboard}
        </div>
    );
}
