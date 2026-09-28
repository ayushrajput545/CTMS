"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { AlertOctagon, PulseCon } from "lucide-react";

export default function PharmacovigilancePage() {
  const safetyEvents = useStore((state) => state.safetyEvents);

  const mild = safetyEvents.filter(e => e.severity === 'Mild').length;
  const moderate = safetyEvents.filter(e => e.severity === 'Moderate').length;
  const serious = safetyEvents.filter(e => e.severity === 'Serious').length;

  const data = [
    { name: 'Mild', value: mild, color: '#3b82f6' },
    { name: 'Moderate', value: moderate, color: '#f59e0b' },
    { name: 'Serious (SAE)', value: serious, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6 fade-in animate-in">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Pharmacovigilance Analytics</h1>
      <p className="text-muted-foreground mb-6">Cross-study aggregate safety data and signaling insights.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Severity Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value} Events`, 'Count']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-red-100 bg-red-50/30 flex flex-col justify-center text-center p-12">
          <AlertOctagon className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-red-900 mb-2">Signal Detection</h2>
          <p className="text-red-700/80 mb-6">
            The automated signal detection engine has identified an elevated cluster of Gastrointestinal events in study AYU-001. A formal review is required.
          </p>
          <button className="mx-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition-colors shadow-sm">
            Review Signal
          </button>
        </Card>
      </div>
    </div>
  );
}