import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchJobs } from '../api';
import JobCard from '../components/JobCard';
import Input from '../components/Input';
import './Dashboard.css';

const DriverDashboard = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [filterOrigin, setFilterOrigin] = useState('');
    const [filterDestination, setFilterDestination] = useState('');

    useEffect(() => {
        loadJobs();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [jobs, filterOrigin, filterDestination]);

    const loadJobs = async () => {
        try {
            setLoading(true);
            const data = await fetchJobs();
            setJobs(data);
        } catch (error) {
            console.error("Yükler alınamadı", error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let result = jobs;

        if (filterOrigin) {
            result = result.filter(j =>
                j.originCity.toLocaleLowerCase('tr-TR').includes(filterOrigin.toLocaleLowerCase('tr-TR'))
            );
        }

        if (filterDestination) {
            result = result.filter(j =>
                j.destinationCity.toLocaleLowerCase('tr-TR').includes(filterDestination.toLocaleLowerCase('tr-TR'))
            );
        }

        setFilteredJobs(result);
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header mb-4">
                <div>
                    <h2>İş Panosu</h2>
                    <p className="text-muted">Hoş geldin, {user.name} - Yolun açık olsun!</p>
                </div>
            </div>

            <div className="dashboard-card filter-card mb-6 container-full-bleed">
                <h4 className="mb-2 text-muted uppercase text-xs font-bold tracking-wider">Hızlı Arama</h4>
                <div className="filter-row flex gap-4">
                    <Input
                        id="filterOrigin"
                        placeholder="Kalkış Yeri..."
                        value={filterOrigin}
                        onChange={e => setFilterOrigin(e.target.value)}
                        className="mb-0 flex-1"
                    />
                    <Input
                        id="filterDestination"
                        placeholder="Varış Yeri..."
                        value={filterDestination}
                        onChange={e => setFilterDestination(e.target.value)}
                        className="mb-0 flex-1"
                    />
                </div>
            </div>

            <div className="dashboard-content">
                <div className="flex justify-between items-center mb-4">
                    <h3>Uygun Yükler</h3>
                    <span className="text-muted text-sm">{filteredJobs.length} İlan bulundu</span>
                </div>

                {loading ? (
                    <div className="flex justify-center p-4">
                        <div className="loading-spinner"></div>
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <div className="empty-state">
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                        <h4>Kriterlerinize uygun yük bulunamadı</h4>
                        <p className="text-muted mt-2">Daha farklı şehirler deneyebilir veya daha sonra tekrar kontrol edebilirsiniz.</p>
                        {(filterOrigin || filterDestination) && (
                            <button
                                className="btn btn-outline btn-sm mt-4"
                                onClick={() => { setFilterOrigin(''); setFilterDestination('') }}
                            >
                                Filtreleri Temizle
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="job-list driver-job-list">
                        {filteredJobs.map(job => (
                            <JobCard
                                key={job.id}
                                job={job}
                                isDriver={true}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DriverDashboard;
