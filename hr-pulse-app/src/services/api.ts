const BASE_URL = 'http://127.0.0.1:8000';

const getRequest = async (endpoint: string) => {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.detail || 'API Error');
    }
    return res.json();
};

const postRequest = async (endpoint: string, data: any) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.detail || 'API Error');
    }
    return res.json();
};

export const api = {
    getJobTitles: () => getRequest('/jobs/titles'),
    searchJobs: (skills: string) => getRequest(`/jobs/search?skills=${encodeURIComponent(skills)}`),
    predictSalary: (data: any) => postRequest('/predict/predict', data),
    login: (data: any) => postRequest('/auth/login', data),
    register: (data: any) => postRequest('/auth/register', data),
};
