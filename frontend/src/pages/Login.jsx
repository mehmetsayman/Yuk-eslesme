import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">🚚 YükBul</div>
                    <h2>Tekrar Hoş Geldiniz</h2>
                    <p className="text-muted">İşinize kaldığınız yerden devam edin</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
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
                        placeholder="••••••••"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        disabled={loading}
                        className="mt-4"
                    >
                        {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                    </Button>
                </form>

                <div className="auth-footer text-center mt-6">
                    <p className="text-muted">
                        Hesabınız yok mu? <Link to="/register">Kayıt Olun</Link>
                    </p>
                    <div className="mt-4 p-4" style={{ backgroundColor: '#f8fafc', borderRadius: '8px', fontSize: '0.8rem', textAlign: 'left' }}>
                        <strong>Test Hesapları:</strong><br />
                        Yazıhane: info@orneklojistik.com / 123<br />
                        Şoför: ahmet@gmail.com / 123
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
