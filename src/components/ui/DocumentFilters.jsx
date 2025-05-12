'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function DocumentFilters({ categories, types, classifyings }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        type: searchParams.get('type') || '',
        classifying: searchParams.get('classifying') || '',
        q: searchParams.get('q') || '',
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = (e) => {
        e.preventDefault();

        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.set(key, value);
        });

        router.push(`/documents?${params.toString()}`);
    };

    const clearFilters = () => {
        setFilters({
            category: '',
            type: '',
            classifying: '',
            q: '',
        });
        router.push('/documents');
    };

    return (
        <div className="space-y-4">
            <form onSubmit={handleSearch} className="flex flex-col space-y-4">
                <div className="flex gap-2 flex-wrap md:flex-nowrap">
                    <input
                        type="text"
                        name="q"
                        placeholder="Search by title, author..."
                        value={filters.q}
                        onChange={handleFilterChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:w-[200px] lg:w-[300px]"
                    />
                    <Button type="submit">Search</Button>
                </div>

                <div className="flex flex-wrap gap-4">
                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full md:w-auto"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat.charAt(0) + cat.slice(1).toLowerCase().replace('_', ' ')}
                            </option>
                        ))}
                    </select>

                    <select
                        name="type"
                        value={filters.type}
                        onChange={handleFilterChange}
                        className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full md:w-auto"
                    >
                        <option value="">All Types</option>
                        {types.map((t) => (
                            <option key={t} value={t}>
                                {t.charAt(0) + t.slice(1).toLowerCase().replace('_', ' ')}
                            </option>
                        ))}
                    </select>

                    <select
                        name="classifying"
                        value={filters.classifying}
                        onChange={handleFilterChange}
                        className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full md:w-auto"
                    >
                        <option value="">All Age Ranges</option>
                        {classifyings.map((c) => (
                            <option key={c} value={c}>
                                {c.charAt(0) + c.slice(1).toLowerCase()}
                            </option>
                        ))}
                    </select>
                </div>

                {(filters.category || filters.type || filters.classifying || filters.q) && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </Button>
                )}
            </form>
        </div>
    );
} 