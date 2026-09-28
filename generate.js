const fs = require('fs');
const content = `"use client";
import { Construction } from "lucide-react";
export default function Placeholder() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center h-[60vh] animate-in fade-in">
      <Construction className="w-16 h-16 text-emerald-500 mb-6" />
      <h1 className="text-3xl font-bold text-slate-800">Working On It</h1>
      <p className="text-slate-500 mt-2 max-w-md">This module is part of the AYUSETU vision but has not been fully implemented</p>
    </div>
  );
}`;
const routes = ["sites", "participants", "recruitment", "milestones", "pharmacovigilance", "compliance", "data-quality", "reports", "users"];

routes.forEach(r => {
    const dir = `src/app/(dashboard)/${r}`;
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(`${dir}/page.tsx`, content);
});
console.log("Done");
