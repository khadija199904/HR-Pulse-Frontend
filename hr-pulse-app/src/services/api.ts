const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

/**
 * Récupère le token depuis les cookies du navigateur
 */
const getAuthToken = () => {
    if (typeof document === 'undefined') return null;
    return document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
};

/**
 * Fonction de base pour toutes les requêtes (GET/POST/etc.)
 * Injecte automatiquement le Token si disponible
 */
const request = async (endpoint: string, options: RequestInit = {}) => {
    const token = getAuthToken();
    
    // Fusion des headers existants avec le token
    const headers = new Headers(options.headers || {});
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        // On renvoie l'erreur propre du backend (detail)
        throw new Error(error.detail || 'Une erreur est survenue');
    }
    return res.json();
};

export const api = {
    // --- Requêtes GET ---
    getJobTitles: () => request('/jobs/titles'),
    searchJobs: (skills: string) => request(`/jobs/search?skills=${encodeURIComponent(skills)}`),

    // --- Requêtes POST JSON (Predict & Register) ---
    predictSalary: (data: any) => request('/predict/predict', { // Vérifie l'URL exacte (/predict/ ou /predict/predict)
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }),

    register: (data: any) => request('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }),

   
    login: async (data: any) => {
        const formData = new URLSearchParams();
        formData.append('username', data.email); 
        formData.append('password', data.password);

        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'accept': 'application/json'
            },
            body: formData.toString(),
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.detail || 'Identifiants incorrects');
        }
        return res.json();
    },
};