import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchDispatcherJobs, createJob, deleteJob, updateJob } from '../api';
import JobCard from '../components/JobCard';
import Button from '../components/Button';
import Input from '../components/Input';
import './Dashboard.css';

const DispatcherDashboard = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingJobId, setEditingJobId] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        originCity: '',
        destinationCity: '',
        loadType: '',
        tonnage: '',
        trailerCriteria: '',
        contactPhone: user?.phone || ''
    });

    useEffect(() => {
        loadJobs();
    }, [user.id]);

    const loadJobs = async () => {
        try {
            setLoading(true);
            const data = await fetchDispatcherJobs(user.id);
            setJobs(data);
        } catch (error) {
            console.error("İlanlar yüklenemedi", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newJob = {
                ...formData,
                tonnage: Number(formData.tonnage),
                dispatcherId: user.id,
                dispatcherName: user.name
            };

            if (editingJobId) {
                await updateJob(editingJobId, newJob);
            } else {
                await createJob(newJob);
            }

            setShowForm(false);
            setEditingJobId(null);
            setFormData({
                originCity: '', destinationCity: '', loadType: '',
                tonnage: '', trailerCriteria: '', price: '', contactPhone: user?.phone || ''
            });
            loadJobs(); // Refresh list
        } catch (error) {
            alert("Hata eklendi", error);
        }
    };

    const handleEditClick = (job) => {
        setFormData({
            originCity: job.originCity,
            destinationCity: job.destinationCity,
            loadType: job.loadType,
            tonnage: job.tonnage.toString(),
            trailerCriteria: job.trailerCriteria,
            price: job.price || '',
            contactPhone: job.contactPhone
        });
        setEditingJobId(job.id);
        setShowForm(true);
    };

    const handleDelete = async (jobId) => {
        if (window.confirm('Bu ilanı sistemden kaldırmak istediğinize emin misiniz? (İş bağlandıysa onaylayın)')) {
            try {
                await deleteJob(jobId);
                setJobs(jobs.filter(j => j.id !== jobId));
            } catch (error) {
                alert("Hata silindi", error);
            }
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div>
                    <h2>Yazıhane Paneli</h2>
                    <p className="text-muted">Hoş geldin, {user.name}</p>
                </div>
                <Button
                    variant={showForm ? "outline" : "primary"}
                    onClick={() => {
                        setShowForm(!showForm);
                        if (showForm) setEditingJobId(null);
                        if (!showForm && !editingJobId) {
                            setFormData({
                                originCity: '', destinationCity: '', loadType: '',
                                tonnage: '', trailerCriteria: '', price: '', contactPhone: user?.phone || ''
                            });
                        }
                    }}
                >
                    {showForm ? 'İptal' : '+ Yeni İlan Ekle'}
                </Button>
            </div>

            {showForm && (
                <div className="dashboard-card mb-6 mb-form animate-fade-in">
                    <h3 className="mb-4">{editingJobId ? 'İlanı Düzenle' : 'Yeni Yük Bildirimi'}</h3>
                    <form onSubmit={handleSubmit} className="job-form">
                        <div className="form-row">
                            <Input label="Alınacak Şehir" id="originCity" name="originCity" value={formData.originCity} onChange={handleInputChange} required placeholder="Örn: İstanbul" />
                            <Input label="Teslim Edilecek Şehir" id="destinationCity" name="destinationCity" value={formData.destinationCity} onChange={handleInputChange} required placeholder="Örn: Ankara" />
                        </div>

                        <div className="form-row">
                            <Input label="Yük Cinsi" id="loadType" name="loadType" value={formData.loadType} onChange={handleInputChange} required placeholder="Kuru Yük, Paletli vb." />
                            <Input label="Tonaj (Ton)" id="tonnage" name="tonnage" type="number" min="1" value={formData.tonnage} onChange={handleInputChange} required placeholder="20" />
                        </div>

                        <div className="form-row">
                            <Input label="Araç/Dorse Kriteri" id="trailerCriteria" name="trailerCriteria" value={formData.trailerCriteria} onChange={handleInputChange} required placeholder="Tenteli, Frigo vb." />
                            <Input label="İletişim Numarası" id="contactPhone" name="contactPhone" type="tel" value={formData.contactPhone} onChange={handleInputChange} required />
                        </div>

                        <div className="form-actions mt-4 flex justify-end">
                            <Button type="button" variant="outline" className="mr-2" onClick={() => { setShowForm(false); setEditingJobId(null); }}>İptal</Button>
                            <Button type="submit">{editingJobId ? 'Değişiklikleri Kaydet' : 'İlanı Yayınla'}</Button>
                        </div>
                    </form>
                </div>
            )}

            <div className="dashboard-content">
                <h3 className="mb-4">Aktif İlanlarım ({jobs.length})</h3>

                {loading ? (
                    <div className="flex justify-center p-4">
                        <div className="loading-spinner"></div>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="empty-state">
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
                        <h4>Henüz aktif ilanınız bulunmuyor</h4>
                        <p className="text-muted mt-2">Yeni ilan eklemek için sağ üstteki butonu kullanın.</p>
                    </div>
                ) : (
                    <div className="job-list">
                        {jobs.map(job => (
                            <JobCard
                                key={job.id}
                                job={job}
                                onDelete={handleDelete}
                                onEdit={handleEditClick}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DispatcherDashboard;
