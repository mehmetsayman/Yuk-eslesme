import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import DispatcherDashboard from './pages/DispatcherDashboard';
import DriverDashboard from './pages/DriverDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return <div className="loading-spinner"></div>;
    if (!user) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }
    return children;
};

const DashboardRouter = () => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" replace />;

    if (user.role === 'DISPATCHER') return <Navigate to="/dispatcher" replace />;
    if (user.role === 'DRIVER') return <Navigate to="/driver" replace />;

    return <Navigate to="/login" replace />;
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="app-container">
                    <Navbar />
                    <main className="mt-4">
                        <Routes>
                            <Route path="/" element={<DashboardRouter />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />

                            <Route
                                path="/dispatcher/*"
                                element={
                                    <ProtectedRoute allowedRoles={['DISPATCHER']}>
                                        <DispatcherDashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/driver/*"
                                element={
                                    <ProtectedRoute allowedRoles={['DRIVER']}>
                                        <DriverDashboard />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
