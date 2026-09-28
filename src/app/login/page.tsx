"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { MOCK_USERS } from "@/lib/mock-data";

export default function LoginPage() {
    const router = useRouter();
    const login = useStore((state) => state.login);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError("Please select a prototype credential or enter an email.");
            return;
        }
        login(email);
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen grid md:grid-cols-2 bg-slate-50">
            {/* Left side branding */}
            <div className="hidden md:flex flex-col justify-center items-center p-12 bg-primary text-primary-foreground">
                <div className="max-w-md space-y-6">
                    <div className="flex items-center space-x-3 mb-12">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
                            <Leaf className="w-10 h-10" />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight">AYUSETU</h1>
                    </div>
                    <h2 className="text-2xl font-semibold opacity-90">Unified Clinical Research & Safety Management for Ayurveda</h2>
                    <p className="text-primary-foreground/80 leading-relaxed text-lg pt-4">
                        A single connected platform for managing clinical trials, site monitoring, milestones, pharmacovigilance, and ethics tracking.
                    </p>
                </div>
            </div>

            {/* Right side login form */}
            <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="md:hidden flex items-center space-x-2 text-primary mb-8">
                        <Leaf className="w-8 h-8" />
                        <h1 className="text-3xl font-bold">AYUSETU</h1>
                    </div>

                    <Card className="border-0 shadow-lg">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl">Welcome back</CardTitle>
                            <CardDescription>Sign in to access your dashboard</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="name@example.com"
                                            className="pl-9"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                        <Link href="#" className="text-sm font-medium text-primary hover:underline">Forgot password?</Link>
                                    </div>
                                    <div className="relative">
                                        <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input id="password" type="password" defaultValue="password123" className="pl-9" />
                                    </div>
                                </div>
                                {error && <p className="text-sm text-destructive">{error}</p>}
                                <Button type="submit" className="w-full text-md h-11 mt-2">Sign in</Button>
                            </form>
                        </CardContent>
                        <CardFooter className="flex flex-col border-t bg-muted/50 px-6 py-4 mt-4 rounded-b-xl border-x-0 border-b-0 space-y-4">
                            <div className="text-sm text-muted-foreground w-full">
                                <p className="font-semibold text-foreground mb-2">Prototype Credentials:</p>
                                <div className="space-y-2">
                                    {MOCK_USERS.map(u => (
                                        <button
                                            key={u.id}
                                            onClick={() => setEmail(u.email)}
                                            className="w-full text-left text-xs bg-white p-2 rounded border border-border hover:border-primary transition-colors flex justify-between"
                                        >
                                            <span className="font-medium">{u.role}</span>
                                            <span className="text-muted-foreground">{u.email}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="text-center text-sm w-full pt-2">
                                Don't have an account? <Link href="/signup" className="text-primary hover:underline font-medium">Sign up</Link>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
