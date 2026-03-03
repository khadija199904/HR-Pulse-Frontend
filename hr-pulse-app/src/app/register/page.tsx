"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/services/api';
import {
    User,
    Mail,
    Lock,
    ArrowRight,
    Loader2,
    CheckCircle2,
    Sparkles
} from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.register(formData);
            setSuccess(true);
            setTimeout(() => router.push('/login'), 2000);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || "Une erreur est survenue lors de l'inscription");
            } else {
                setError("Une erreur est survenue");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-accent rounded-full blur-[120px] opacity-20" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[30vw] h-[30vw] bg-secondary rounded-full blur-[100px] opacity-40" />
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-white p-12 rounded-[4rem] border border-border shadow-2xl shadow-black/5 space-y-10">
                    <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-accent rounded-[2rem] flex items-center justify-center mx-auto shadow-xl shadow-accent/20 -rotate-6 group hover:rotate-0 transition-transform duration-500">
                            <Sparkles className="w-10 h-10 text-primary" />
                        </div>
                        <h1 className="text-4xl font-black text-foreground tracking-tighter">Inscription.</h1>
                        <p className="text-foreground font-bold opacity-40 text-sm italic">Rejoignez l&apos;écosystème HR-Pulse Intelligence</p>
                    </div>

                    {success ? (
                        <div className="py-20 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                            <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-12 h-12 text-primary" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-2xl font-black text-foreground">Compte Créé !</p>
                                <p className="text-foreground font-bold opacity-40">Redirection vers la connexion...</p>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleRegister} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground opacity-50 ml-2">Nom complet</label>
                                <div className="relative group">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-primary group-focus-within:scale-110 transition-transform" />
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-16 pr-8 py-5 bg-muted/40 border-2 border-transparent rounded-[2rem] text-sm font-black focus:bg-white focus:border-primary/20 outline-none transition-all"
                                        placeholder="Jean Dupont"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground opacity-50 ml-2">Email Professionnel</label>
                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-primary group-focus-within:scale-110 transition-transform" />
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-16 pr-8 py-5 bg-muted/40 border-2 border-transparent rounded-[2rem] text-sm font-black focus:bg-white focus:border-primary/20 outline-none transition-all"
                                        placeholder="nom@entreprise.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground opacity-50 ml-2">Mot de Passe</label>
                                <div className="relative group">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-primary group-focus-within:scale-110 transition-transform" />
                                    <input
                                        type="password"
                                        required
                                        className="w-full pl-16 pr-8 py-5 bg-muted/40 border-2 border-transparent rounded-[2rem] text-sm font-black focus:bg-white focus:border-primary/20 outline-none transition-all"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl text-[10px] font-black uppercase text-primary text-center tracking-widest">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-white py-6 rounded-[2.5rem] font-black text-sm hover:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-primary/20 group"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                    <>
                                        Créer mon accès
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    {!success && (
                        <p className="text-center text-xs font-bold text-foreground opacity-40">
                            Déjà membre ?{' '}
                            <Link href="/login" className="text-primary font-black hover:underline underline-offset-4">
                                Se connecter
                            </Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
