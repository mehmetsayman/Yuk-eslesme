import React from 'react';
import Button from './Button';
import './JobCard.css';

const JobCard = ({ job, isDriver = false, onDelete = null }) => {

    // Şoförler için telefonu doğrudan aramaya yönlendir
    const handleCall = () => {
        window.location.href = `tel:${job.contactPhone}`;
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('tr-TR', options);
    };

    return (
        <div className="job-card">
            <div className="job-card-header">
                <div className="job-card-route">
                    <div className="job-city origin">
                        <span className="city-dot"></span>
                        {job.originCity}
                    </div>
                    <div className="route-line"></div>
                    <div className="job-city destination">
                        <span className="city-dot finish"></span>
                        {job.destinationCity}
                    </div>
                </div>
                <div className="job-card-date">{formatDate(job.createdAt)}</div>
            </div>

            <div className="job-card-body">
                {isDriver && (
                    <div className="job-company">
                        🏢 {job.dispatcherName}
                    </div>
                )}

                <div className="job-details-grid mt-4">
                    <div className="detail-item">
                        <span className="detail-label">Yük Tipi</span>
                        <span className="detail-value">{job.loadType}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Tonaj</span>
                        <span className="detail-value">{job.tonnage} Ton</span>
                    </div>
                    <div className="detail-item col-span-2">
                        <span className="detail-label">Araç/Dorse</span>
                        <span className="detail-value">{job.trailerCriteria}</span>
                    </div>
                </div>
            </div>

            <div className="job-card-footer">
                {isDriver ? (
                    <Button
                        variant="primary"
                        fullWidth
                        onClick={handleCall}
                        className="call-btn"
                    >
                        <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>📞</span>
                        İşi Al (Ara)
                    </Button>
                ) : (
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete(job.id)}
                    >
                        İlanı Kaldır
                    </Button>
                )}
            </div>
        </div>
    );
};

export default JobCard;
