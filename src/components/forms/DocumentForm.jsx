'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function DocumentForm({
    document = null,
    categories = [],
    types = [],
    classifyings = [],
    isEdit = false
}) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        code: document?.code || '',
        title: document?.title || '',
        author: document?.author || '',
        year: document?.year || new Date().getFullYear(),
        description: document?.description || '',
        category: document?.category || 'NOVEL',
        type: document?.type || 'OTHER',
        classifying: document?.classifying || 'ADULTS',
        imagePath: document?.imagePath || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const url = isEdit
                ? `/api/documents/${document.id}`
                : '/api/documents';

            const method = isEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Something went wrong');
            }

            toast.success(
                isEdit ? 'Document updated successfully' : 'Document created successfully'
            );

            router.push('/admin/documents');
            router.refresh();
        } catch (error) {
            toast.error(error.message || 'Failed to save document');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="code">Document Code</Label>
                    <Input
                        id="code"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        placeholder="Enter document code"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter document title"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Enter author name"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                        id="year"
                        name="year"
                        type="number"
                        value={formData.year}
                        onChange={handleChange}
                        placeholder="Enter publication year"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category.charAt(0) + category.slice(1).toLowerCase()}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                    >
                        {types.map((type) => (
                            <option key={type} value={type}>
                                {type.charAt(0) + type.slice(1).toLowerCase()}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="classifying">Age Rating</Label>
                    <select
                        id="classifying"
                        name="classifying"
                        value={formData.classifying}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                    >
                        {classifyings.map((classifying) => (
                            <option key={classifying} value={classifying}>
                                {classifying.charAt(0) + classifying.slice(1).toLowerCase()}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="imagePath">Image URL (Optional)</Label>
                    <Input
                        id="imagePath"
                        name="imagePath"
                        value={formData.imagePath}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter document description"
                    rows={5}
                    required
                />
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
                    {isSubmitting ? 'Saving...' : isEdit ? 'Update Document' : 'Create Document'}
                </Button>
            </div>
        </form>
    );
} 