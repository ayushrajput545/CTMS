"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, UserPlus, Target } from "lucide-react";

const recruitmentData = [
  { month: "Jan", target: 20, actual: 15 },
  { month: "Feb", target: 40, actual: 35 },
  { month: "Mar", target: 60, actual: 65 },
  { month: "Apr", target: 80, actual: 95 },
  { month: "May", target: 100, actual: 110 },
  { month: "Jun", target: 120, actual: 130 },
];

export default function RecruitmentPage() {
  return (
    <div className="space-y-6 fade-in animate-in">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Recruitment Analytics</h1>
      <p className="text-muted-foreground mb-6">Track actual enrollment against target milestones over time.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-emerald-100 bg-emerald-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-800 flex items-center">
              <Users className="w-4 h-4 mr-2" /> Total Enrolled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-900">130</div>
            <p className="text-xs text-emerald-600 mt-1">+20 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center">
              <Target className="w-4 h-4 mr-2" /> Target Enrollment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">250</div>
            <p className="text-xs text-muted-foreground mt-1">By Dec 2026</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center">
              <UserPlus className="w-4 h-4 mr-2" /> Retention Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">92%</div>
            <p className="text-xs text-muted-foreground mt-1">Excellent standing</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enrollment Trajectory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={recruitmentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e2e8f0" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#e2e8f0" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="target" stroke="#94a3b8" fillOpacity={1} fill="url(#colorTarget)" name="Target" />
                <Area type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" name="Actual Enrollment" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}