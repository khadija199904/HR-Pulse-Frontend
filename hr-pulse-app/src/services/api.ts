const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';


const getAuthToken = () => {
    if (typeof document === 'undefined') return null;
    return document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
};

const request = async (endpoint: string, options: RequestInit = {}) => {
    const token = getAuthToken();

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
        throw new Error(error.detail || 'Une erreur est survenue');
    }
    return res.json();
};

export const api = {
    getJobTitles: () => request('/jobs/titles'),
    searchJobs: (skills: string) => request(`/jobs/search?skills=${encodeURIComponent(skills)}`),

    predictSalary: (data: Record<string, unknown>) => request('/predict/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }),

    register: (data: Record<string, unknown>) => request('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }),


    login: async (data: Record<string, unknown>) => {
        const formData = new URLSearchParams();
        formData.append('username', data.email as string);
        formData.append('password', data.password as string);

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