import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import './Auth.css';

const Register = () => {
    const [role, setRole] = useState('DRIVER'); // 'DRIVER' or 'DISPATCHER'
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulated Registration - just navigating to login for MVP
        setTimeout(() => {
            alert("Kayıt simülasyonu başarılı. Giriş yapabilirsiniz.");
            navigate('/login');
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">🚚 YükBul</div>
                    <h2>Yeni Hesap Oluştur</h2>
                    <p className="text-muted">Aramıza katılmak için bilgilerinizi girin</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="role-selector">
                        <button
                            type="button"
                            className={`role-btn ${role === 'DRIVER' ? 'active' : ''}`}
                            onClick={() => setRole('DRIVER')}
                        >
                            <span className="role-icon">🚛</span>
                            <span className="role-label">Şoförüm</span>
                            <span className="text-muted" style={{ fontSize: '0.7rem' }}>İş Arıyorum</span>
                        </button>
                        <button
                            type="button"
                            className={`role-btn ${role === 'DISPATCHER' ? 'active' : ''}`}
                            onClick={() => setRole('DISPATCHER')}
                        >
                            <span className="role-icon">🏢</span>
                            <span className="role-label">Yazıhaneyim</span>
                            <span className="text-muted" style={{ fontSize: '0.7rem' }}>İş Veriyorum</span>
                        </button>
                    </div>

                    <Input
                        label={role === 'DRIVER' ? "Ad Soyad" : "Firma Ünvanı"}
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder={role === 'DRIVER' ? "Ahmet Yılmaz" : "Örnek Lojistik A.Ş."}
                    />
                    <Input
                        label="Telefon Numarası"
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder="0555 123 45 67"
                    />
                    <Input
                        label="E-posta Adresi"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="ornek@mail.com"
                    />
                    <Input
                        label="Şifre"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="En az 6 karakter"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        disabled={loading}
                        className="mt-4"
                    >
                        {loading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
                    </Button>
                </form>

                <div className="auth-footer text-center mt-6">
                    <p className="text-muted">
                        Zaten hesabınız var mı? <Link to="/login">Giriş Yapın</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
