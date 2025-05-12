'use client';

import { Toaster } from 'sonner';

export default function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                className: 'sonner-toast',
                duration: 3000,
                style: {
                    background: 'hsl(var(--background))',
                    color: 'hsl(var(--foreground))',
                    border: '1px solid hsl(var(--border))',
                },
            }}
        />
    );
} 