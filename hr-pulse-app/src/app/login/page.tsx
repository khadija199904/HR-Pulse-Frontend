"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/services/api';
import {
    Lock,
    Mail,
    ArrowRight,
    Loader2,
    ShieldCheck,
    Zap
} from 'lucide-react';


export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await api.login({ email, password });
            document.cookie = `token=${res.access_token}; path=/; max-age=86400`;
            router.push('/dashboard');
        } catch (err: unknown) {
            // Check if err is an object with a message property
            if (err instanceof Error) {
                setError(err.message || 'Identifiants incorrects');
            } else {
                setError('Identifiants incorrects');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-secondary rounded-full blur-[120px] opacity-40" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] bg-accent rounded-full blur-[100px] opacity-30" />
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-white p-12 rounded-[4rem] border border-border shadow-2xl shadow-black/5 space-y-10">
                    <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-primary rounded-[2rem] flex items-center justify-center mx-auto shadow-xl shadow-primary/20 rotate-6 group hover:rotate-0 transition-transform duration-500">
                            <Zap className="w-10 h-10 text-white fill-white" />
                        </div>
                        <h1 className="text-4xl font-black text-foreground tracking-tighter">Connexion.</h1>
                        <p className="text-foreground font-bold opacity-40 text-sm italic">Accédez à votre plateforme HR Intelligence</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground opacity-50 ml-2">Email Professionnel</label>
                            <div className="relative group">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-primary group-focus-within:scale-110 transition-transform" />
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-16 pr-8 py-5 bg-muted/40 border-2 border-transparent rounded-[2rem] text-sm font-black focus:bg-white focus:border-primary/20 outline-none transition-all"
                                    placeholder="nom@entreprise.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl text-[10px] font-black uppercase text-primary text-center tracking-widest animate-shake">
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
                                    Connecter
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-xs font-bold text-foreground opacity-40">
                        Nouveau sur la plateforme ?{' '}
                        <Link href="/register" className="text-primary font-black hover:underline underline-offset-4">
                            Créer un compte
                        </Link>
                    </p>
                </div>

                <div className="mt-8 flex items-center justify-center gap-6 opacity-30 grayscale">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                        <ShieldCheck className="w-4 h-4" />
                        SSL Secure
                    </div>
                    <div className="w-1 h-1 bg-foreground rounded-full" />
                    <div className="text-[10px] font-black uppercase tracking-widest">
                        Azure Cloud v2
                    </div>
                </div>
            </div>
        </div>
    );
}
