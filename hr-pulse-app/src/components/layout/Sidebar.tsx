"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Search,
    LayoutDashboard,
    Zap,
    Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Répertoire Jobs', icon: Briefcase, href: '/jobs' },
    { name: 'Moteur Recherche', icon: Search, href: '/search' },
    { name: 'IA Predictor', icon: Zap, href: '/predictor' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border p-8 flex flex-col z-50">
            <div className="flex items-center gap-3 mb-12 px-2">
                <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20">
                    P
                </div>
                <span className="text-xl font-black tracking-tight text-foreground uppercase">HR Pulse</span>
            </div>

            <nav className="flex-1 space-y-1.5">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-300 group text-sm font-bold",
                                isActive
                                    ? "bg-primary text-white shadow-xl shadow-primary/10"
                                    : "text-foreground hover:bg-secondary hover:text-primary"
                            )}
                        >
                            <item.icon className={cn("w-4 h-4", isActive ? "text-white" : "group-hover:text-primary")} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto px-5 py-6 bg-accent/20 rounded-[2rem] border border-accent/30">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Sync Status</p>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        <div className="absolute inset-0 w-2 h-2 rounded-full bg-accent animate-ping" />
                    </div>
                    <span className="text-xs font-black text-foreground">Backend Actif</span>
                </div>
            </div>
        </aside>
    );
}
