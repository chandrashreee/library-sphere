'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function UserForm({
    user = null,
    roles = ['MEMBER'],
    isEdit = false
}) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        code: user?.code || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        role: user?.role || 'MEMBER',
        password: '',
        confirmPassword: '',
        city: user?.address?.city || '',
        street: user?.address?.street || '',
        number: user?.address?.number || '',
        province: user?.address?.province || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate passwords match for new users
        if (!isEdit && formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare data for API
            const userData = {
                code: formData.code,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                role: formData.role,
                address: {
                    city: formData.city,
                    street: formData.street,
                    number: formData.number,
                    province: formData.province,
                }
            };

            // Only include password for new users
            if (!isEdit && formData.password) {
                userData.password = formData.password;
            }

            const url = isEdit
                ? `/api/users/${user.id}`
                : '/api/users';

            const method = isEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Something went wrong');
            }

            toast.success(
                isEdit ? 'User updated successfully' : 'User created successfully'
            );

            // Redirect to appropriate admin page based on role
            if (formData.role === 'MEMBER') {
                router.push('/admin/members');
            } else {
                router.push('/admin/employees');
            }
            router.refresh();
        } catch (error) {
            toast.error(error.message || 'Failed to save user');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="code">Member/Employee Code</Label>
                    <Input
                        id="code"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        placeholder="Enter unique code"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                    >
                        {roles.map((role) => (
                            <option key={role} value={role}>
                                {role.charAt(0) + role.slice(1).toLowerCase()}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        required
                    />
                </div>

                {!isEdit && (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                required={!isEdit}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm password"
                                required={!isEdit}
                            />
                        </div>
                    </>
                )}
            </div>

            <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-4">Address Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Enter city"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="street">Street</Label>
                        <Input
                            id="street"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            placeholder="Enter street"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="number">Number</Label>
                        <Input
                            id="number"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            placeholder="Enter building/apartment number"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="province">Province</Label>
                        <Input
                            id="province"
                            name="province"
                            value={formData.province}
                            onChange={handleChange}
                            placeholder="Enter province"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-3 justify-end">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : isEdit ? 'Update User' : 'Create User'}
                </Button>
            </div>
        </form>
    );
} 