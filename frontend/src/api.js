// Eğer Vite ortam değişkeni (VITE_API_URL) tanımlıysa onu kullan, yoksa Render linkini kullan.
// Local testler için hala localhost:5000'i kullanabilirsiniz.
const API_URL = import.meta.env.VITE_API_URL || 'https://yuk-eslesme.onrender.com/api';

export const fetchJobs = async () => {
    const res = await fetch(`${API_URL}/jobs`);
    if (!res.ok) throw new Error('Ağ hatası');
    return res.json();
};

export const fetchDispatcherJobs = async (dispatcherId) => {
    const res = await fetch(`${API_URL}/jobs/dispatcher/${dispatcherId}`);
    if (!res.ok) throw new Error('Ağ hatası');
    return res.json();
};

export const createJob = async (jobData) => {
    const res = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
    });
    if (!res.ok) throw new Error('Ağ hatası');
    return res.json();
};

export const deleteJob = async (id) => {
    const res = await fetch(`${API_URL}/jobs/${id}`, {
        method: 'DELETE'
    });
    if (!res.ok) throw new Error('Ağ hatası');
    return res.json();
};

export const updateJob = async (id, jobData) => {
    const res = await fetch(`${API_URL}/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
    });
    if (!res.ok) throw new Error('Ağ hatası');
    return res.json();
};
