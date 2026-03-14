const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// In-memory Database Simulation
const db = {
    users: [
        {
            id: "u1",
            role: "DISPATCHER",
            name: "Örnek Lojistik A.Ş.",
            phone: "+905551234567",
            email: "info@orneklojistik.com",
            password: "123" // In standard implementation, use bcrypt
        },
        {
            id: "u2",
            role: "DRIVER",
            name: "Ahmet Yılmaz",
            phone: "+905559876543",
            email: "ahmet@gmail.com",
            password: "123"
        }
    ],
    jobs: [
        {
            id: uuidv4(),
            dispatcherId: "u1",
            dispatcherName: "Örnek Lojistik A.Ş.",
            originCity: "İstanbul",
            destinationCity: "Ankara",
            loadType: "Kuru Yük",
            tonnage: 20,
            trailerCriteria: "Tenteli Dorse",
            contactPhone: "+905551234567",
            status: "ACTIVE",
            createdAt: new Date().toISOString()
        },
        {
            id: uuidv4(),
            dispatcherId: "u1",
            dispatcherName: "Örnek Lojistik A.Ş.",
            originCity: "İzmir",
            destinationCity: "Antalya",
            loadType: "Soğuk Hava",
            tonnage: 15,
            trailerCriteria: "Frigo",
            contactPhone: "+905551234567",
            status: "ACTIVE",
            createdAt: new Date().toISOString()
        }
    ]
};

// --- ROUTES ---

// Auth Routes (Simplified)
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = db.users.find(u => u.email === email && u.password === password);

    if (user) {
        // In a real app, send back a JWT
        res.json({ success: true, user: { id: user.id, role: user.role, name: user.name } });
    } else {
        res.status(401).json({ success: false, message: "Geçersiz e-posta veya şifre" });
    }
});

// Jobs Routes
app.get('/api/jobs', (req, res) => {
    // Return only active jobs
    const activeJobs = db.jobs.filter(j => j.status === "ACTIVE");
    // Sort by newest first
    activeJobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(activeJobs);
});

app.post('/api/jobs', (req, res) => {
    const newJob = {
        id: uuidv4(),
        ...req.body,
        status: "ACTIVE",
        createdAt: new Date().toISOString()
    };
    db.jobs.push(newJob);
    res.status(201).json(newJob);
});

app.get('/api/jobs/dispatcher/:dispatcherId', (req, res) => {
    const { dispatcherId } = req.params;
    const dispatcherJobs = db.jobs.filter(j => j.dispatcherId === dispatcherId);
    dispatcherJobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(dispatcherJobs);
});

app.delete('/api/jobs/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = db.jobs.length;
    db.jobs = db.jobs.filter(j => j.id !== id);

    if (db.jobs.length < initialLength) {
        res.json({ success: true, message: "İlan başarıyla silindi." });
    } else {
        res.status(404).json({ success: false, message: "İlan bulunamadı." });
    }
});


app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
