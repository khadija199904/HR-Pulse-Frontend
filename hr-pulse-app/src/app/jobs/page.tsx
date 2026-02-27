"use client";

import React, { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { api } from '@/services/api';
import {
    Briefcase,
    Loader2,
    ChevronRight,
    TrendingUp,
    Search,
    Database,
    ArrowRight
} from 'lucide-react';
import { cn, cleanJobTitle } from '@/lib/utils';

export default function JobsDirectoryPage() {
    const [titles, setTitles] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTitles = async () => {
            try {
                const data = await api.getJobTitles();
                setTitles(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Connection failed:", error);
                setTitles([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTitles();
    }, []);

    return (
        <AppLayout>
            <div className="space-y-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                    <div className="space-y-4">
                        <h1 className="text-6xl font-black text-foreground tracking-tighter">Répertoire.</h1>
                        <p className="text-foreground font-bold text-xl max-w-xl opacity-60 leading-relaxed">
                            Explorez l'intégralité des intitulés de postes indexés par notre moteur d'IA Azure SQL.
                        </p>
                    </div>
                    <div className="bg-secondary px-10 py-6 rounded-[3rem] flex items-center gap-6 border-2 border-white shadow-xl shadow-secondary/20 group hover:scale-[1.05] transition-transform duration-500">
                        <div className="p-4 bg-primary rounded-2xl shadow-lg shadow-primary/20">
                            <Database className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-1">Index SQL Actif</p>
                            <p className="text-3xl font-black text-foreground tabular-nums">{titles.length}</p>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-48 space-y-8">
                        <div className="relative">
                            <Loader2 className="w-24 h-24 animate-spin text-primary opacity-10" />
                            <div className="absolute inset-0 m-auto w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center shadow-sm">
                                <Briefcase className="w-6 h-6 text-primary animate-pulse" />
                            </div>
                        </div>
                        <div className="text-center space-y-2">
                            <p className="font-black text-foreground text-xl uppercase tracking-widest">Initialisation</p>
                            <p className="text-foreground font-bold text-base opacity-40">Synchronisation avec le Cloud Pulse...</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {titles.map((title, i) => (
                            <div key={i} className="bg-card p-10 rounded-[3.5rem] border border-border shadow-sm group hover:border-primary/20 hover:scale-[1.03] transition-all cursor-pointer relative overflow-hidden flex flex-col h-full">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary rounded-full blur-3xl -mr-16 -mt-16 opacity-30 group-hover:bg-accent transition-colors duration-700" />

                                <div className="flex items-start justify-between mb-10 relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center group-hover:bg-primary transition-all duration-500 shadow-sm border border-white/50">
                                        <Briefcase className="w-6 h-6 text-foreground group-hover:text-white" />
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-muted/40 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>

                                <h3 className="font-black text-foreground text-sm group-hover:text-primary transition-colors line-clamp-2 leading-relaxed h-10 mb-8">
                                    {cleanJobTitle(title)}
                                </h3>


                            </div>
                        ))}
                    </div>
                )}

                {/* Action Card */}
                <div className="bg-primary p-20 rounded-[5rem] text-secondary flex flex-col xl:flex-row items-center justify-between gap-16 relative overflow-hidden group shadow-3xl shadow-primary/30 border-t-2 border-white/5">
                    <div className="absolute -bottom-24 -right-24 opacity-10 transition-transform group-hover:rotate-12 group-hover:scale-125 duration-1000">
                        <Search className="w-[30rem] h-[30rem] text-white" />
                    </div>

                    <div className="relative z-10 space-y-6 text-center xl:text-left max-w-3xl">
                        <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] text-white backdrop-blur-sm ring-1 ring-white/20">
                            <TrendingUp className="w-5 h-5" />
                            Analyse NER en temps réel
                        </div>
                        <h2 className="text-6xl font-black tracking-tight leading-[0.9] text-white">Prêt pour une analyse ?</h2>
                        <p className="text-white/50 font-bold text-xl">Extrayez instantanément les compétences critiques des meilleures offres du marché mondial.</p>
                    </div>

                    <a href="/search" className="relative z-10 bg-secondary text-primary px-16 py-8 rounded-[3rem] font-black text-lg hover:scale-[1.05] transition-all shadow-3xl shadow-black/20 flex items-center gap-4 group">
                        Exploiter les données
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </a>
                </div>
            </div>
        </AppLayout>
    );
}
