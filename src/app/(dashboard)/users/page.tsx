"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Mail, Building, UserPlus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UsersPage() {
  const users = useStore((state) => state.users);
  const currentUser = useStore((state) => state.currentUser);

  if (currentUser?.role !== "Administrator") {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-[60vh]">
        <Shield className="w-12 h-12 text-slate-300 mb-4" />
        <h2 className="text-xl font-bold text-slate-700">Access Denied</h2>
        <p className="text-muted-foreground mt-2">Only system administrators can manage users.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in animate-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">User Management</h1>
          <p className="text-muted-foreground">Provision and govern role-based access to the platform.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search users by name or email..." className="pl-9 w-[250px] sm:w-[300px]" />
          </div>
          <Button className="bg-primary text-primary-foreground"><UserPlus className="w-4 h-4 mr-2" /> Add User</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user.id} className="hover:border-primary/30 transition-colors">
            <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0 relative">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-600">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <CardTitle className="text-lg">{user.name}</CardTitle>
                  <CardDescription className="flex items-center text-xs mt-1">
                    <Mail className="w-3 h-3 mr-1" /> {user.email}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Role</span>
                  <Badge variant={user.role === 'Administrator' ? 'destructive' : 'default'} className={user.role === 'Administrator' ? 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}>
                    {user.role}
                  </Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Organization</span>
                  <span className="font-medium flex items-center">
                    <Building className="w-3.5 h-3.5 mr-1 text-slate-400" /> {user.organization}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="w-full text-xs h-8">Edit Role</Button>
                <Button variant="outline" className="w-full text-xs h-8 text-destructive hover:bg-red-50">Revoke Access</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}