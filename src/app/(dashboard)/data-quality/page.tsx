"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Database, SearchCheck, CheckSquare, Layers } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const queryData = [
  { site: "Site A", open: 12, resolved: 45 },
  { site: "Site B", open: 8, resolved: 30 },
  { site: "Site C", open: 24, resolved: 18 },
  { site: "Site D", open: 5, resolved: 60 },
];

export default function DataQualityPage() {
  return (
    <div className="space-y-6 fade-in animate-in">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Data Quality & Monitoring</h1>
      <p className="text-muted-foreground mb-6">Monitor eCRF completeness, SDV coverage, and query resolution metrics.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Layers className="w-5 h-5" /></div>
            </div>
            <div className="text-sm font-medium text-slate-500 mb-1">eCRF Completion Rate</div>
            <div className="text-3xl font-bold text-slate-900">94.2%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><CheckSquare className="w-5 h-5" /></div>
            </div>
            <div className="text-sm font-medium text-slate-500 mb-1">SDV Coverage</div>
            <div className="text-3xl font-bold text-slate-900">88.5%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-lg"><SearchCheck className="w-5 h-5" /></div>
            </div>
            <div className="text-sm font-medium text-slate-500 mb-1">Total Open Queries</div>
            <div className="text-3xl font-bold text-slate-900">49</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Database className="w-5 h-5" /></div>
            </div>
            <div className="text-sm font-medium text-slate-500 mb-1">Avg. Resolution Time</div>
            <div className="text-3xl font-bold text-slate-900">7.2 days</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Data Queries by Site</CardTitle>
          <CardDescription>Open vs Resolved queries across active clinical sites.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={queryData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="site" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{ fill: 'transparent' }} />
                <Bar dataKey="open" name="Open Queries" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="resolved" name="Resolved Queries" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}