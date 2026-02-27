"use client";

import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

import { usePathname } from 'next/navigation';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname === '/login' || pathname === '/register';

    if (isAuthPage) {
        return <div className="min-h-screen bg-background">{children}</div>;
    }

    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <div className="ml-64 flex-1">
                <Navbar />
                <main className="p-8 max-w-7xl mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
