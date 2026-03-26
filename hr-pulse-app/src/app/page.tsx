"use client";

import React from 'react';
import Link from 'next/link';
import { BrainCircuit, Search, Activity, CheckCircle2 } from 'lucide-react';
import LandingNavbar from '@/components/layout/LandingNavbar';

export default function RootPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 flex flex-col items-center text-center bg-secondary/30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50 mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl opacity-50 mix-blend-multiply pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border shadow-sm mb-8 z-10 transition-transform hover:scale-105">
          <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-bold text-foreground/80">Plateforme HR Intelligente</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter max-w-4xl leading-tight mb-6 z-10">
          L&apos;intelligence artificielle au service de vos <span className="text-primary">Ressources Humaines</span>
        </h1>

        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mb-10 z-10">
          Prédisez les salaires, recrutez avec précision via notre moteur de recherche par compétences,
          et gérez l&apos;ensemble du cycle RH sur une plateforme unique et performante.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 z-10">
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            Commencer l&apos;expérience
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 bg-white border border-border text-foreground font-bold rounded-full hover:bg-secondary/50 transition-all hover:-translate-y-1 shadow-sm"
          >
            Aller au Dashboard
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 md:px-12 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Une gestion RH <span className="text-accent underline decoration-4 underline-offset-4">augmentée</span></h2>
            <p className="text-foreground/70 max-w-2xl text-lg">
              HR Pulse orchestre l&apos;ensemble de vos données RH pour vous fournir des informations stratégiques en temps réel.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BrainCircuit className="w-8 h-8 text-primary" />}
              title="IA Predictor"
              description="Algorithme prédictif avancé pour estimer les salaires et optimiser votre politique de rémunération en toute confiance."
              delay="0ms"
            />
            <FeatureCard
              icon={<Search className="w-8 h-8 text-white" />}
              title="Moteur de Recherche"
              description="Trouvez le profil parfait grâce à une recherche sémantique ultra-performante basée sur les compétences clés."
              delay="100ms"
              featured
            />
            <FeatureCard
              icon={<Activity className="w-8 h-8 text-accent" />}
              title="Dashboard Analytique"
              description="Suivez les KPIs critiques, le statut de synchronisation, et accédez à l&apos;ensemble du répertoire des emplois en un clic."
              delay="200ms"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 px-6 md:px-12 bg-secondary/40 relative border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-3xl md:text-5xl font-black leading-tight">
              Pourquoi choisir <span className="text-primary">HR Pulse</span> ?
            </h2>
            <ul className="space-y-4">
              {[
                "Prises de décision basées sur la donnée (Data-Driven).",
                "Interface intuitive et ultra-rapide (Next.js & React 19).",
                "Correspondance intelligente entre profils et offres (Soft & Hard skills)."
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                  <span className="text-foreground/80 font-medium text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-primary/10 rounded-[2rem] transform rotate-3" />
            <div className="relative bg-white p-8 rounded-[2rem] shadow-xl premium-shadow border border-border">
              <div className="w-full h-48 bg-secondary rounded-xl mb-6 flex items-center justify-center border border-border/50">
                <Activity className="w-16 h-16 text-primary/40" />
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-6 md:px-12 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white font-black text-sm">
              P
            </div>
            <span className="font-black text-foreground uppercase tracking-wider">HR Pulse</span>
          </div>
          <p className="text-sm text-foreground/50 font-medium">
            © {new Date().getFullYear()} HR Pulse. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, featured = false, delay }: { icon: React.ReactNode, title: string, description: string, featured?: boolean, delay: string }) {
  return (
    <div
      className={`p-8 rounded-[2rem] border transition-all duration-300 hover:-translate-y-2 premium-shadow ${featured ? 'bg-primary text-white border-primary shadow-primary/20' : 'bg-white border-border text-foreground hover:border-primary/30'
        }`}
      style={{ animationDelay: delay }}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${featured ? 'bg-white/20 backdrop-blur-sm' : 'bg-secondary'
        }`}>
        {icon}
      </div>
      <h3 className="text-xl font-black mb-3">{title}</h3>
      <p className={`font-medium leading-relaxed ${featured ? 'text-white/80' : 'text-foreground/70'}`}>
        {description}
      </p>
    </div>
  );
}
