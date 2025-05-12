'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function AuthForm({ type = 'login' }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const isLogin = type === 'login';

    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phone: '',
            'address.number': '',
            'address.street': '',
            'address.city': '',
            'address.province': '',
        },
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError('');

        try {
            if (isLogin) {
                const result = await signIn('credentials', {
                    redirect: false,
                    email: data.email,
                    password: data.password,
                });

                if (result?.error) {
                    setError('Invalid email or password');
                    return;
                }

                router.push('/dashboard');
                router.refresh();
            } else {
                // Registration
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...data,
                        role: 'MEMBER',
                    }),
                });

                const responseData = await response.json();

                if (!response.ok) {
                    setError(responseData.message || 'Registration failed');
                    return;
                }

                // Auto login after registration
                const result = await signIn('credentials', {
                    redirect: false,
                    email: data.email,
                    password: data.password,
                });

                router.push('/dashboard');
                router.refresh();
            }
        } catch (error) {
            console.error('Auth error:', error);
            setError('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>{isLogin ? 'Login' : 'Register'}</CardTitle>
                <CardDescription>
                    {isLogin
                        ? 'Enter your credentials to access your account'
                        : 'Create a new account to get started'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {!isLogin && (
                            <>
                                <div className="flex gap-4">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        rules={{ required: 'First name is required' }}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        rules={{ required: 'Last name is required' }}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Doe" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    rules={{ required: 'Phone number is required' }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="123-456-7890" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="space-y-2 border rounded-md p-4">
                                    <h3 className="text-sm font-medium">Address</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="address.number"
                                            rules={{ required: 'Required' }}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Number</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="123" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="address.street"
                                            rules={{ required: 'Required' }}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Street</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Main St" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="address.city"
                                            rules={{ required: 'Required' }}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>City</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Anytown" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="address.province"
                                            rules={{ required: 'Required' }}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Province/State</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="State" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <FormField
                            control={form.control}
                            name="email"
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="john.doe@example.com" type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            rules={{
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="********" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {error && (
                            <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
                <div className="text-sm text-center">
                    {isLogin ? (
                        <>
                            Don't have an account?{' '}
                            <Link href="/register" className="text-primary font-medium">
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary font-medium">
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
} 