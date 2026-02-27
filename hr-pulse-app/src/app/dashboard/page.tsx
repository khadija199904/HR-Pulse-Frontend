"use client";

import React, { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { api } from '@/services/api';
import {
    Users,
    Briefcase,
    TrendingUp,
    Activity,
    ArrowUpRight,
    Loader2,
    CheckCircle2
} from 'lucide-react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { cn } from '@/lib/utils';

const chartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 900 },
];

export default function DashboardPage() {
    const [activeJobsCount, setActiveJobsCount] = useState<string | number>('...');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const titles = await api.getJobTitles();
                setActiveJobsCount(titles.length);
            } catch (error) {
                console.error("Failed to fetch jobs titles", error);
                setActiveJobsCount(0);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const stats = [
        { label: 'Offres Actives', value: activeJobsCount, change: '+5%', icon: Briefcase, color: 'text-primary', bg: 'bg-secondary' },
        { label: 'Collaborateurs', value: '1,280', change: '+12%', icon: Users, color: 'text-foreground', bg: 'bg-accent/30' },
        { label: 'Engagement', value: '8.2', change: '-2%', icon: Activity, color: 'text-foreground', bg: 'bg-muted' },
    ];

    return (
        <AppLayout>
            <div className="space-y-12">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-5xl font-black text-foreground tracking-tight">Dashboard.</h1>
                        <p className="text-foreground font-bold mt-1 opacity-60">Analyse en temps réel de votre écosystème RH.</p>
                    </div>
                    {loading && <Loader2 className="w-5 h-5 animate-spin text-primary" />}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-card p-10 rounded-[2.5rem] border border-border shadow-sm group hover:border-primary/20 transition-all relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />

                            <div className="flex justify-between items-start mb-8 relative z-10">
                                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", stat.bg)}>
                                    <stat.icon className={cn("w-6 h-6", stat.color)} />
                                </div>
                                <div className={cn(
                                    "flex items-center gap-1 text-[10px] font-black px-4 py-2 rounded-full",
                                    stat.change.startsWith('+') ? "bg-accent/40 text-foreground" : "bg-red-50 text-primary"
                                )}>
                                    {stat.change}
                                    <ArrowUpRight className="w-3 h-3" />
                                </div>
                            </div>
                            <div className="relative z-10">
                                <p className="text-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-3 opacity-50">{stat.label}</p>
                                <h3 className="text-5xl font-black text-foreground tabular-nums">{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-card p-12 rounded-[3.5rem] border border-border shadow-sm flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
                    <div className="flex-1 space-y-10 w-full">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
                            <div>
                                <h2 className="text-3xl font-black text-foreground">Flux Recrutement</h2>
                                <p className="text-sm text-foreground font-bold opacity-50 mt-1">Comparaison des volumes mensuels.</p>
                            </div>
                            <div className="flex items-center gap-3 bg-muted p-1.5 rounded-2xl border border-border">
                                <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-black shadow-lg shadow-primary/20">Semestre</button>
                                <button className="px-6 py-2.5 text-foreground rounded-xl text-xs font-black hover:bg-white transition-colors">Annuel</button>
                            </div>
                        </div>

                        <div className="h-[400px] w-full" style={{ minHeight: '400px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#BCD9A2" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#FEFFD3" stopOpacity={0.2} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#000000', fontSize: 11, fontWeight: 900 }}
                                        dy={20}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#000000', fontSize: 11, fontWeight: 900 }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '24px',
                                            border: '1px solid #e2e8f0',
                                            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                                            fontSize: '12px',
                                            fontWeight: 900,
                                            color: '#000000'
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#A82323"
                                        strokeWidth={5}
                                        fillOpacity={1}
                                        fill="url(#colorPulse)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="w-full md:w-80 bg-secondary p-10 rounded-[3rem] border border-secondary shadow-sm flex flex-col justify-between h-full min-h-[400px]">
                        <div className="space-y-6">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                <CheckCircle2 className="w-8 h-8 text-accent" />
                            </div>
                            <h3 className="text-2xl font-black text-foreground leading-tight">Objectifs Atteints.</h3>
                            <p className="text-foreground font-bold opacity-60 text-sm leading-relaxed">
                                Vos performances de recrutement dépassent les prévisions du Q1 de 15%.
                            </p>
                        </div>

                        <button className="w-full bg-primary text-white py-5 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                            Détails du Rapport
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
