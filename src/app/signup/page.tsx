"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf, Info } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SignupPage() {
    const router = useRouter();
    const [success, setSuccess] = useState(false);

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(true);
        setTimeout(() => {
            router.push("/login");
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                <div className="flex items-center justify-center space-x-2 text-primary mb-8">
                    <Leaf className="w-8 h-8" />
                    <h1 className="text-3xl font-bold">AYUSETU</h1>
                </div>

                <Card className="border-0 shadow-lg">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center">Create an account</CardTitle>
                        <CardDescription className="text-center">Join the platform to manage clinical research</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {success ? (
                            <Alert className="bg-primary/10 border-primary text-primary mb-4 text-center py-6">
                                <AlertDescription className="font-medium text-lg">
                                    Registration successful! Redirecting to login...
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <form onSubmit={handleSignup} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="organization">Organization</Label>
                                    <Input id="organization" placeholder="e.g. AIIA, NIA, etc." required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="role">Role Request</Label>
                                    <Select defaultValue="Coordinator">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Principal">Principal Coordinator</SelectItem>
                                            <SelectItem value="Coordinator">Study Coordinator</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div className="flex items-start gap-2 mt-2 text-xs text-muted-foreground">
                                        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                        <p>Administrator accounts are provisioned exclusively by the system administrator.</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input id="confirmPassword" type="password" required />
                                </div>

                                <Button type="submit" className="w-full text-md h-11 mt-4">Create Account</Button>
                            </form>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-center border-t py-6 bg-muted/50 rounded-b-xl">
                        <div className="text-sm">
                            Already have an account? <Link href="/login" className="text-primary hover:underline font-medium">Log in</Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
