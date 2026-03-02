import { Bell, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();

    const handleLogout = () => {
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        router.push('/login');
    };

    return (
        <header className="h-24 glass-nav sticky top-0 z-40 px-12 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-primary rounded-full" />
                <div className="text-[11px] font-black text-foreground uppercase tracking-[0.3em] opacity-40">
                    Système d'Analyse RH Propriétaire
                </div>
            </div>

            <div className="flex items-center gap-8">
                <button
                    onClick={handleLogout}
                    className="p-3 text-primary hover:bg-primary/5 rounded-2xl border border-transparent hover:border-primary/10 transition-all flex items-center gap-2 group"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block">Quitter</span>
                </button>

                <button className="relative p-3 text-foreground hover:text-primary transition-all hover:bg-secondary rounded-2xl border border-transparent hover:border-secondary shadow-sm group">
                    <Bell className="w-6 h-6 opacity-60 group-hover:opacity-100" />
                    <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-primary rounded-full ring-2 ring-white" />
                </button>

                <div className="flex items-center gap-5 pl-8 border-l border-border/50 h-10">
                    <div className="text-right">
                        <p className="text-sm font-black text-foreground leading-none">K. Elabbioui</p>
                        <p className="text-[10px] font-bold text-primary tracking-widest uppercase mt-1">Responsable RH</p>
                    </div>
                    <div className="w-12 h-12 rounded-[1.25rem] bg-secondary flex items-center justify-center text-primary font-black text-sm shadow-sm ring-1 ring-white border border-secondary hover:scale-105 transition-transform cursor-pointer overflow-hidden relative group">
                        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity" />
                        <User className="w-5 h-5 relative z-10" />
                    </div>
                </div>
            </div>
        </header>
    );
}
