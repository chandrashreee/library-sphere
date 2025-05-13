"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "member",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
                role: formData.role,
            });

            if (result.error) {
                toast.error("Invalid email or password");
            } else {
                toast.success("Login successful!");
                router.push("/catalog");
                router.refresh();
            }
        } catch (error) {
            toast.error("An error occurred during login");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (value) => {
        setFormData((prev) => ({ ...prev, role: value }));
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-2">
                        <BookOpen className="h-10 w-10 text-[#0E2A47]" />
                    </div>
                    <CardTitle className="text-3xl font-serif text-[#0E2A47]">Montreal Library</CardTitle>
                    <CardDescription>Knowledge for everyone</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="your.email@example.com"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>I am a:</Label>
                            <RadioGroup
                                defaultValue="member"
                                value={formData.role}
                                onValueChange={handleRoleChange}
                                className="flex space-x-4"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="member" id="member" />
                                    <Label htmlFor="member">Member</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="staff" id="staff" />
                                    <Label htmlFor="staff">Staff</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="submit"
                            className="w-full bg-[#133b5c] hover:bg-[#0E2A47]"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                    </CardFooter>
                </form>
                <div className="p-6 pt-0">
                    <div className="rounded-lg border p-3">
                        <h3 className="mb-2 font-medium">Demo Accounts</h3>
                        <div className="text-sm text-muted-foreground">
                            <div className="grid grid-cols-[80px_1fr] gap-1">
                                <span className="font-medium">Member:</span>
                                <span>john.doe@example.com / password123</span>
                                <span className="font-medium">Employee:</span>
                                <span>robert.taylor@library.com / employee123</span>
                                <span className="font-medium">Admin:</span>
                                <span>sarah.davis@library.com / admin123</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
} 