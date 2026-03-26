"use client";

import React from 'react';
import Link from 'next/link';

export default function LandingNavbar() {
    return (
        <nav className="fixed top-0 left-0 w-full glass-nav z-50 py-4 px-6 md:px-12 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20">
                    P
                </div>
                <span className="text-xl font-black tracking-tight text-foreground uppercase">HR Pulse</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
                <Link href="#features" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors">
                    Fonctionnalités
                </Link>
                <Link href="#benefits" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors">
                    Avantages
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <Link
                    href="/login"
                    className="text-sm font-bold text-foreground hover:text-primary transition-colors px-4 py-2"
                >
                    Connexion
                </Link>
                <Link
                    href="/register"
                    className="text-sm font-bold bg-primary text-white px-5 py-2.5 rounded-full hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
                >
                    S&apos;inscrire
                </Link>
            </div>
        </nav>
    );
}
