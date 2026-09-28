"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Search, Calendar, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CompliancePage() {
  const complianceItems = useStore((state) => state.complianceItems);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Compliant": return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">Compliant</Badge>;
      case "Due Soon": return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Due Soon</Badge>;
      case "Overdue": return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Overdue</Badge>;
      case "Action Required": return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Action Required</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 fade-in animate-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Ethics & Regulatory</h1>
          <p className="text-muted-foreground">Monitor compliance, IRB approvals, and essential regulatory documents.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search documents..." className="pl-9 w-[250px]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {complianceItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 border-b border-slate-100">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="bg-slate-50">{item.studyId}</Badge>
                {getStatusBadge(item.status)}
              </div>
              <CardTitle className="text-lg font-semibold flex items-start gap-2">
                <FileText className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                <span>{item.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Category:</span>
                <span className="font-medium text-slate-900">{item.category}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center"><Calendar className="w-4 h-4 mr-1" /> Due Date</span>
                <span className={`font-medium ${item.status === 'Overdue' ? 'text-red-600' : 'text-slate-900'}`}>{new Date(item.dueDate).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}