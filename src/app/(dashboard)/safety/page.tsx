"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, PlusCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function SafetyPage() {
    const safetyEvents = useStore((state) => state.safetyEvents);
    const addSafetyEvent = useStore((state) => state.addSafetyEvent);
    const currentUser = useStore((state) => state.currentUser);
    const studies = useStore((state) => state.studies);


    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [studyId, setStudyId] = useState("");
    const [participantId, setParticipantId] = useState("");
    const [eventType, setEventType] = useState("");
    const [severity, setSeverity] = useState<"Mild" | "Moderate" | "Serious">("Mild");
    const [description, setDescription] = useState("");

    const handleReportSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            addSafetyEvent({
                studyId,
                participantId,
                eventType,
                severity,
                description,
                date: new Date().toISOString().split('T')[0]
            });

            setIsSubmitting(false);
            setOpen(false);

            toast("SAE Reported Successfully", {
                description: "The safety event has been logged and the Principal Coordinator has been notified.",
            });

            // Reset form
            setStudyId(""); setParticipantId(""); setEventType(""); setDescription("");
        }, 1000);
    };

    const getSeverityBadge = (sev: string) => {
        switch (sev) {
            case "Serious": return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">Serious</Badge>;
            case "Moderate": return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">Moderate</Badge>;
            default: return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">Mild</Badge>;
        }
    };

    return (
        <div className="space-y-6 fade-in animate-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Safety & Pharmacovigilance</h1>
                    <p className="text-muted-foreground">Monitor and report Adverse Events (AE) and Serious Adverse Events (SAE).</p>
                </div>
                <div className="flex items-center gap-2">
                    {currentUser?.role !== "Administrator" && (
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger render={<Button className="bg-amber-600 hover:bg-amber-700 text-white shadow-sm" />}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Report AE/SAE
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle>Report Safety Event</DialogTitle>
                                    <DialogDescription>
                                        Submit a new Adverse Event (AE) or Serious Adverse Event (SAE). This will immediately alert the Principal Coordinator.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleReportSubmit} className="space-y-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="study">Study ID</Label>
                                            <Select required value={studyId} onValueChange={(val) => val && setStudyId(val)}>
                                                <SelectTrigger><SelectValue placeholder="Select Study" /></SelectTrigger>
                                                <SelectContent>
                                                    {studies.map(s => <SelectItem key={s.id} value={s.studyId}>{s.studyId}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="participant">Participant ID</Label>
                                            <Input id="participant" required placeholder="e.g. PT-104" value={participantId} onChange={e => setParticipantId(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="eventType">Event Type</Label>
                                            <Input id="eventType" required placeholder="e.g. Gastrointestinal" value={eventType} onChange={e => setEventType(e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="severity">Severity</Label>
                                            <Select required value={severity} onValueChange={(val) => val && setSeverity(val as any)}>
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Mild">Mild</SelectItem>
                                                    <SelectItem value="Moderate">Moderate</SelectItem>
                                                    <SelectItem value="Serious">Serious (SAE)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Event Description</Label>
                                        <textarea
                                            id="description"
                                            required
                                            className="w-full min-h-[100px] flex rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                            placeholder="Describe the nature of the event, onset, and actions taken..."
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                        ></textarea>
                                    </div>

                                    <DialogFooter className="pt-4">
                                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                                        <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white" disabled={isSubmitting}>
                                            {isSubmitting ? "Submitting..." : "Submit Report"}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-slate-500 mb-1">Total Cases</div>
                        <div className="text-3xl font-bold">{safetyEvents.length}</div>
                    </CardContent>
                </Card>
                <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-red-700 mb-1">Serious Events (SAE)</div>
                        <div className="text-3xl font-bold text-red-800">{safetyEvents.filter(s => s.severity === 'Serious').length}</div>
                    </CardContent>
                </Card>
                <Card className="border-amber-200 bg-amber-50">
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-amber-700 mb-1">Open Cases</div>
                        <div className="text-3xl font-bold text-amber-800">{safetyEvents.filter(s => s.status === 'Open' || s.status === 'Under Review').length}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Case Logs</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium border-b">
                                <tr>
                                    <th className="px-6 py-4">Case ID</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Study & Participant</th>
                                    <th className="px-6 py-4">Event Type</th>
                                    <th className="px-6 py-4">Severity</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {safetyEvents.map((event) => (
                                    <tr key={event.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">{event.caseId}</td>
                                        <td className="px-6 py-4 text-slate-500">{event.date}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-slate-900 font-medium">{event.studyId}</div>
                                            <div className="text-xs text-muted-foreground">{event.participantId}</div>
                                        </td>
                                        <td className="px-6 py-4">{event.eventType}</td>
                                        <td className="px-6 py-4">{getSeverityBadge(event.severity)}</td>
                                        <td className="px-6 py-4">
                                            {event.status === "Open" || event.status === "Under Review" ? (
                                                <div className="flex items-center text-amber-600 font-medium text-xs">
                                                    <AlertCircle className="w-3.5 h-3.5 mr-1" /> {event.status}
                                                </div>
                                            ) : (
                                                <div className="flex items-center text-slate-500 font-medium text-xs">
                                                    <CheckCircle className="w-3.5 h-3.5 mr-1" /> {event.status}
                                                </div>
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
