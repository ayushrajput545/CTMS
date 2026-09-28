"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Circle, Clock, CheckCircle } from "lucide-react";
import { useStore } from "@/lib/store";

export default function MilestonesPage() {
  const studies = useStore((state) => state.studies);

  return (
    <div className="space-y-6 fade-in animate-in">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Project Milestones</h1>
      <p className="text-muted-foreground mb-6">Track clinical and operational endpoints across studies.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studies.map((study) => (
          <Card key={study.id} className="relative overflow-hidden hover:shadow-md transition-all border-l-4" style={{ borderLeftColor: study.progress >= 100 ? '#10b981' : '#3b82f6' }}>
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-slate-800">{study.title}</CardTitle>
              <CardDescription>{study.studyId}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-slate-600">Overall Progress</span>
                  <span className="font-bold text-slate-900">{study.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${study.progress >= 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${study.progress}%` }} />
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-4">
                  {[
                    { title: "Protocol Approval", date: "Jan 15, 2026", status: "completed" },
                    { title: "First Patient In (FPI)", date: "Mar 10, 2026", status: "completed" },
                    { title: "50% Enrollment", date: "Jul 01, 2026", status: "completed" },
                    { title: "Last Patient In (LPI)", date: "Dec 15, 2026", status: "pending" },
                  ].map((ms, idx) => (
                    <div key={idx} className="flex items-start">
                      {ms.status === "completed" ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300 mr-3 shrink-0" />
                      )}
                      <div>
                        <p className={`text-sm font-medium ${ms.status === "completed" ? "text-slate-800" : "text-slate-500"}`}>{ms.title}</p>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                          <Clock className="w-3 h-3 mr-1" /> {ms.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}