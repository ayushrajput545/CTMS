"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ParticipantsPage() {
  const participants = useStore((state) => state.participants);

  const getStatusBadge = (status: string) => {
    const styles = {
      "Screened": "bg-blue-100 text-blue-800",
      "Enrolled": "bg-emerald-100 text-emerald-800",
      "Active": "bg-emerald-100 text-emerald-800",
      "Completed": "bg-purple-100 text-purple-800",
      "Withdrawn": "bg-red-100 text-red-800"
    };
    return <Badge className={styles[status as keyof typeof styles] || "bg-slate-100 text-slate-800"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6 fade-in animate-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Trial Participants</h1>
          <p className="text-muted-foreground">Comprehensive tracking of subject enrollment and status.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search participants..." className="pl-9 w-[200px]" />
          </div>
          <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <Card>
        <CardHeader className="bg-slate-50 border-b pb-4">
          <CardTitle className="text-sm font-medium flex items-center text-slate-600">
            <Users className="w-4 h-4 mr-2" /> Participant Roster
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-white text-slate-500 font-medium border-b">
                <tr>
                  <th className="px-6 py-4">Participant ID</th>
                  <th className="px-6 py-4">Study Route</th>
                  <th className="px-6 py-4">Site</th>
                  <th className="px-6 py-4">Enrollment Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {participants.map((pt) => (
                  <tr key={pt.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{pt.participantId}</td>
                    <td className="px-6 py-4 text-slate-600">{pt.studyId}</td>
                    <td className="px-6 py-4 text-slate-600">{pt.siteId}</td>
                    <td className="px-6 py-4 text-slate-500">{new Date(pt.enrollmentDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{getStatusBadge(pt.status)}</td>
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