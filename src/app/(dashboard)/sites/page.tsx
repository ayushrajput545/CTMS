"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SitesPage() {
  const sites = useStore((state) => state.sites);

  return (
    <div className="space-y-6 fade-in animate-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Clinical Sites</h1>
          <p className="text-muted-foreground">Manage and track performance across all trial locations.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search sites..." className="pl-9 w-[250px]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map((site) => (
          <Card key={site.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-emerald-600" />
                  {site.name}
                </CardTitle>
                <Badge variant={site.status === "Active" ? "default" : "secondary"} className={site.status === "Active" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" : ""}>
                  {site.status}
                </Badge>
              </div>
              <CardDescription className="mt-1 text-xs">
                Study ID: {site.studyId}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Investigator:</span>
                <span className="font-medium text-slate-900">{site.investigator}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="text-xs text-slate-500 mb-1">Target</div>
                  <div className="text-xl font-bold text-slate-700">{site.target}</div>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                  <div className="text-xs text-emerald-600 mb-1">Enrolled</div>
                  <div className="text-xl font-bold text-emerald-700">{site.enrolled}</div>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${Math.min(100, (site.enrolled / site.target) * 100 || 0)}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}