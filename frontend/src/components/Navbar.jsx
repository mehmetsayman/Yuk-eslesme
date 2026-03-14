import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand-wrapper">
                    <Link to="/" className="navbar-brand">
                        <span className="navbar-logo-icon">🚚</span>
                        <span className="navbar-logo-text">YükBul</span>
                    </Link>
                </div>

                <nav className="navbar-menu">
                    {user ? (
                        <div className="navbar-user">
                            <span className="navbar-user-name" title={user.name}>
                                {user.name.length > 15 ? user.name.substring(0, 15) + '...' : user.name}
                            </span>
                            <span className="navbar-role-badge">
                                {user.role === 'DISPATCHER' ? 'Yazıhane' : 'Şoför'}
                            </span>
                            <Button variant="outline" size="sm" onClick={handleLogout}>
                                Çıkış
                            </Button>
                        </div>
                    ) : (
                        <div className="navbar-actions">
                            <Link to="/login" className="navbar-link">Giriş Yap</Link>
                            <Link to="/register">
                                <Button size="sm">Kayıt Ol</Button>
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
