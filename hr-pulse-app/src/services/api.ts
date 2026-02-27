export const api = {
    // We use 127.0.0.1 instead of localhost to avoid IPv6 resolution issues in some environments
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000',

    async get(endpoint: string) {
        try {
            const res = await fetch(`${this.baseUrl}${endpoint}`, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
            return res.json();
        } catch (error) {
            console.error(`Fetch error at ${endpoint}:`, error);
            throw error;
        }
    },

    async post(endpoint: string, data: any) {
        try {
            const res = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
            return res.json();
        } catch (error) {
            console.error(`Fetch error at ${endpoint}:`, error);
            throw error;
        }
    },

    // Jobs
    getJobTitles: () => api.get('/jobs/titles'),
    searchJobs: (skills: string) => api.get(`/jobs/search?skills=${encodeURIComponent(skills)}`),

    // Predict
    predictSalary: (data: any) => api.post('/predict/predict', data),
};
