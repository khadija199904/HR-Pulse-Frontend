"use client";

import AppLayout from '@/components/layout/AppLayout';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingDashboard() {
    return (
        <AppLayout>
            <div className="space-y-8">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-4 w-96" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-32 w-full rounded-2xl" />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Skeleton className="lg:col-span-2 h-[450px] rounded-3xl" />
                    <Skeleton className="h-[450px] rounded-3xl" />
                </div>
            </div>
        </AppLayout>
    );
}
