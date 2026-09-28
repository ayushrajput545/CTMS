"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, ShieldCheck, Search, Download, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ReportsPage() {
  const reports = [
    { id: "REP-001", name: "Consolidated Safety Profile Q1 2026", type: "Pharmacovigilance", date: "Mar 31, 2026", status: "Ready" },
    { id: "REP-002", name: "Site Enrollment Trajectory", type: "Recruitment", date: "Apr 05, 2026", status: "Ready" },
    { id: "REP-003", name: "Protocol Deviation Line Listing", type: "Compliance", date: "Apr 10, 2026", status: "Generating" },
    { id: "REP-004", name: "SAE Adjudication Summary", type: "Safety", date: "Apr 12, 2026", status: "Ready" },
  ];

  return (
    <div className="space-y-6 fade-in animate-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Reports Library</h1>
          <p className="text-muted-foreground">Access standardized trial metrics and export clinical datasets.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search reports..." className="pl-9 w-[250px]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Reports", value: "24", icon: ShieldCheck },
          { label: "Pending Generation", value: "3", icon: Clock },
          { label: "Custom Templates", value: "8", icon: ShieldCheck },
          { label: "Scheduled Runs", value: "12", icon: ShieldCheck },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="text-sm font-medium text-slate-500 mb-1">{stat.label}</div>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Generate Reports</CardTitle>
          <CardDescription>Click download to export datasets to CSV or PDF.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b">
                <tr>
                  <th className="px-6 py-4">Report ID</th>
                  <th className="px-6 py-4">Report Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Generated On</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{report.id}</td>
                    <td className="px-6 py-4 font-medium text-indigo-600">{report.name}</td>
                    <td className="px-6 py-4">{report.type}</td>
                    <td className="px-6 py-4 text-slate-500">{report.date}</td>
                    <td className="px-6 py-4">
                      {report.status === "Ready" ? (
                        <Badge className="bg-emerald-100 text-emerald-800"><CheckCircle2 className="w-3 h-3 mr-1" /> {report.status}</Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-800">{report.status}</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm" disabled={report.status !== "Ready"}>
                        <Download className="w-4 h-4 mr-2" /> Download
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