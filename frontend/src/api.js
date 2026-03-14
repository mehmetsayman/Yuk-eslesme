const API_URL = 'http://localhost:5000/api';

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
