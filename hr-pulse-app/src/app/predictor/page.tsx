"use client";

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { api } from '@/services/api';
import {
    Zap,
    TrendingUp,
    Loader2,
    Sparkles,
    ChevronRight,
    Calculator,
    ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PredictorPage() {
    const [formData, setFormData] = useState({
        job_title: "Développeur Fullstack",
        job_description: "Expert React et Node.js",
        rating: 4.5,
        job_state: "Paris",
        sector: "Tech",
        location: "Paris, France",
        skills: ["React", "Node.js", "TypeScript"]
    });

    const [prediction, setPrediction] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const handlePredict = async () => {
        setLoading(true);
        try {
            const res = await api.predictSalary(formData);
            setPrediction(res.salary_estimate);
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la prédiction. Vérifiez que le backend est en ligne.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout>
            <div className="max-w-[1400px] mx-auto space-y-16">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 bg-secondary px-6 py-3 rounded-full text-foreground font-black text-[10px] uppercase tracking-[0.3em] border border-secondary shadow-sm">
                        <Sparkles className="w-4 h-4 text-primary" />
                        Analyse Prédictive ML
                    </div>
                    <h1 className="text-6xl font-black text-foreground tracking-tight">IA Salary Predictor.</h1>
                    <p className="text-foreground font-bold text-lg max-w-2xl mx-auto opacity-60">
                        Calculez instantanément la valeur marché d'un poste grâce à notre algorithme optimisé.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                    {/* Form */}
                    <div className="lg:col-span-7 bg-card p-12 rounded-[4rem] border-2 border-primary/5 shadow-sm flex flex-col space-y-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-[0.05]">
                            <Calculator className="w-72 h-72 rotate-12 text-primary" />
                        </div>

                        <div className="space-y-10 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="md:col-span-2 group">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground block mb-4 ml-2 opacity-50">Intitulé du Poste</label>
                                    <input
                                        className="w-full px-10 py-6 bg-muted/40 border-2 border-transparent rounded-[2.5rem] text-base font-black focus:bg-white focus:border-primary/20 outline-none transition-all placeholder:text-muted-foreground"
                                        value={formData.job_title}
                                        onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                                    />
                                </div>

                                <div className="group">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground block mb-4 ml-2 opacity-50">Secteur</label>
                                    <input
                                        className="w-full px-10 py-6 bg-muted/40 border-2 border-transparent rounded-[2.5rem] text-base font-black focus:bg-white focus:border-primary/20 outline-none transition-all"
                                        value={formData.sector}
                                        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                                    />
                                </div>
                                <div className="group">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground block mb-4 ml-2 opacity-50">Localisation</label>
                                    <input
                                        className="w-full px-10 py-6 bg-muted/40 border-2 border-transparent rounded-[2.5rem] text-base font-black focus:bg-white focus:border-primary/20 outline-none transition-all"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>

                                <div className="md:col-span-2 group">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground block mb-4 ml-2 opacity-50">Description du poste</label>
                                    <textarea
                                        className="w-full px-10 py-8 bg-muted/40 border-2 border-transparent rounded-[3.5rem] text-base font-black focus:bg-white focus:border-primary/20 outline-none transition-all h-52 resize-none"
                                        value={formData.job_description}
                                        onChange={(e) => setFormData({ ...formData, job_description: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handlePredict}
                            disabled={loading}
                            className="w-full bg-primary text-white py-8 rounded-[3rem] font-black text-lg hover:scale-[0.99] transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-4 group mt-auto relative z-10"
                        >
                            {loading ? (
                                <Loader2 className="w-7 h-7 animate-spin" />
                            ) : (
                                <>
                                    <Zap className="w-6 h-6 fill-secondary text-secondary" />
                                    Calculer l'Estimation
                                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>

                    {/* Results Sidebar */}
                    <div className="lg:col-span-5 flex flex-col gap-10">
                        <div className={cn(
                            "flex-1 p-12 rounded-[5rem] text-center flex flex-col justify-center items-center transition-all duration-1000 relative overflow-hidden",
                            prediction
                                ? "bg-primary text-white scale-100 shadow-3xl shadow-primary/30"
                                : "bg-secondary text-foreground scale-95 border-2 border-secondary"
                        )}>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50" />

                            {prediction ? (
                                <>
                                    <div className="w-28 h-28 bg-white/10 rounded-full flex items-center justify-center mb-12 backdrop-blur-xl ring-2 ring-white/10 shadow-inner">
                                        <TrendingUp className="w-12 h-12 text-secondary" />
                                    </div>
                                    <p className="text-[11px] font-black uppercase tracking-[0.4em] opacity-60 mb-5">Salaire Annuel Estimé</p>
                                    <h2 className="text-7xl font-black mb-10 tracking-tighter tabular-nums text-white">
                                        {prediction.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                                    </h2>
                                    <div className="px-10 py-4 bg-accent text-foreground rounded-full text-[11px] font-black uppercase tracking-widest flex items-center gap-3 shadow-lg shadow-black/10">
                                        <ShieldCheck className="w-5 h-5" />
                                        Valeur Marché Certifiée
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-10 relative z-10">
                                    <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-sm ring-1 ring-border">
                                        <Zap className="w-12 h-12 text-primary opacity-20" />
                                    </div>
                                    <div className="space-y-3">
                                        <p className="font-black text-foreground uppercase tracking-[0.3em] text-sm">Prêt pour Analyse</p>
                                        <p className="text-foreground font-bold text-base opacity-40">Complétez le profil pour voir l'estimation</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-card p-12 rounded-[4rem] border border-border shadow-sm flex flex-col justify-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -mr-16 -mt-16" />

                            <h3 className="font-black text-foreground text-xs uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                                <div className="w-2 h-12 bg-primary rounded-full" />
                                Détails du Modèle
                            </h3>
                            <div className="space-y-5">
                                {[
                                    { label: "Algorithme", value: "Random Forest Regressor", bg: "bg-muted/40" },
                                    { label: "Dataset", value: "6,482 Profils", bg: "bg-secondary/40" },
                                    { label: "Précision", value: "94.2%", bg: "bg-accent/40" }
                                ].map((item, idx) => (
                                    <div key={idx} className={cn("flex justify-between items-center px-8 py-5 rounded-3xl border border-border/50", item.bg)}>
                                        <span className="text-foreground font-bold text-xs opacity-60 uppercase tracking-widest">{item.label}</span>
                                        <span className="font-black text-foreground text-sm tracking-tight">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
