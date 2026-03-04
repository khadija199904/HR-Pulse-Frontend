"use client";

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { api } from '@/services/api';
import {
    Search as SearchIcon,
    Briefcase,
    Loader2,
    ChevronRight,
    Sparkles
} from 'lucide-react';
import { cleanJobTitle } from '@/lib/utils';

interface Job {
    id: number;
    job_title: string;
    skills_extracted: string[];
}

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query) return;
        setLoading(true);
        try {
            const data = await api.searchJobs(query);
            setResults(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout>
            <div className="space-y-16">
                <div className="text-center max-w-2xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 bg-secondary px-5 py-2.5 rounded-full text-foreground font-black text-[10px] uppercase tracking-[0.2em] border border-secondary shadow-sm">
                        <Sparkles className="w-4 h-4 text-primary" />
                        Moteur de Recherche AI
                    </div>
                    <h1 className="text-5xl font-black text-foreground tracking-tight">Analyse Métier.</h1>
                    <p className="text-foreground font-bold text-lg opacity-60">Exploitez le NER pour filtrer les opportunités par compétences.</p>
                </div>

                {/* Search Bar */}
                <div className="bg-card p-3 rounded-[3rem] border-2 border-primary/5 premium-shadow max-w-3xl mx-auto flex items-center gap-3 relative z-10">
                    <div className="relative flex-1">
                        <SearchIcon className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
                        <input
                            className="w-full pl-20 pr-4 py-7 bg-transparent border-none text-xl outline-none font-black placeholder:font-bold placeholder:text-muted-foreground"
                            placeholder="Ex: Python, Cloud, NER..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="bg-primary text-white px-12 py-6 rounded-[2.5rem] font-black text-base hover:scale-[0.98] transition-all flex items-center gap-3 shadow-2xl shadow-primary/20"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Rechercher"}
                    </button>
                </div>

                {/* Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                    {results.length > 0 ? results.map((job) => (
                        <div key={job.id} className="bg-card p-10 rounded-[3.5rem] border border-border shadow-sm group hover:border-primary/20 transition-all cursor-pointer relative overflow-hidden flex flex-col h-full">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary rounded-full blur-3xl -mr-16 -mt-16 opacity-40 group-hover:bg-accent transition-colors duration-500" />

                            <div className="flex items-center gap-5 mb-10 relative z-10">
                                <div className="w-16 h-16 bg-accent rounded-[1.5rem] flex items-center justify-center group-hover:bg-primary transition-all shadow-sm">
                                    <Briefcase className="w-7 h-7 text-foreground group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-black text-foreground leading-snug group-hover:text-primary transition-colors">{cleanJobTitle(job.job_title)}</h3>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2.5 mb-12 relative z-10">
                                {Array.isArray(job.skills_extracted) && job.skills_extracted.slice(0, 4).map((skill, i) => (
                                    <span key={i} className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-secondary border border-secondary rounded-xl text-foreground group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-end pt-10 mt-auto border-t border-border relative z-10">
                                <div className="w-10 h-10 rounded-full bg-accent/40 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    )) : !loading && query && (
                        <div className="col-span-full py-40 text-center space-y-6">
                            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto shadow-sm">
                                <SearchIcon className="w-10 h-10 text-primary opacity-30" />
                            </div>
                            <p className="text-xl font-black text-foreground tracking-tight">Aucun résultat trouvé pour &quot;{query}&quot;</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
