# Yük Eşleşme Platformu

Yük Eşleşme Platformu, lojistik firmaları (sevkıyatçılar/göndericiler) ile tır/kamyon şoförlerini (sürücüler) bir araya getiren web tabanlı bir uygulamadır. Bu platform sayesinde yük verenler kolayca ilan açabilir, sürücüler de kendilerine uygun yükleri anında filtreleyip işlemleri gerçekleştirebilirler.

## 🚀 Özellikler

*   **Çift Rol Desteği**: Sistemde `DISPATCHER` (Yük Veren/Lojistik Firması) ve `DRIVER` (Sürücü) olmak üzere iki farklı kullanıcı tipi bulunmaktadır.
*   **Yetkilendirme ve Kimlik Doğrulama**: Güvenli giriş sistemi ile her rol sadece kendi yetkisi dahilindeki sayfalara erişebilir.
*   **İlan Yönetimi**: Yük verenler yeni yük ilanları oluşturabilir, mevcut aktif ilanlarını görüntüleyebilir ve silebilmektedir.
*   **Canlı İlan Panosu**: Sürücüler sisteme giriş yaptıklarında aktif olan tüm yük ilanlarını listeleyebilirler.
*   **Modern Arayüz**: React ile geliştirilmiş, kullanıcı dostu ve duyarlı (responsive) tasarım sunulmaktadır. (Lucide React ikonları kullanılmaktadır.)

## 🛠️ Kullanılan Teknolojiler

### Frontend
*   **React (v18)** - Kullanıcı arayüzü
*   **Vite** - Hızlı derleme ve geliştirme ortamı
*   **React Router Dom** - Sayfa yönlendirmeleri ve korumalı rotalar (Protected Routes)
*   **Lucide React** - Modern SVG ikon seti
*   **Context API** - Global durum yönetimi (Auth yönetimi için)

### Backend
*   **Node.js & Express.js** - RESTful API
*   **CORS** - Farklı alan adlarından gelen HTTP isteklerinin yönetimi
*   **uuid** - Benzersiz ID oluşturma
*   **In-Memory DB** - (Veritabanı bağlantısı yerine başlangıç MVP aşaması için RAM üzerinde veri tutma)

## 📁 Proje Yapısı

Proje temel olarak iki ana klasörden oluşur:

*   `frontend/`: Kullanıcı arayüzünü (React) barındırır.
*   `backend/`: Sunucu, API ve iş mantığını (Express.js) barındırır.

## ⚙️ Kurulum ve Çalıştırma

Projeyi yerel bilgisayarınızda (local) çalıştırmak için aşağıdaki adımları takip edin:

### 1. Backend Kurulumu

```bash
cd backend
npm install
npm run dev
```

Backend sunucusu varsayılan olarak `http://localhost:5000` adresinde çalışacaktır.

### 2. Frontend Kurulumu

Yeni bir terminal açın ve aşağıdaki adımları uygulayın:

```bash
cd frontend
npm install
npm run dev
```

Frontend tarafı varsayılan olarak `http://localhost:5173` adresinde çalışacaktır.

## 🌐 Canlıya Alma (Deployment)

Projenin canlı versiyonları aşağıdaki gibi ayarlanmıştır:
*   **Frontend**: Vercel üzerinden deploy edilmiştir. Vercel üzerinde `Root Directory` ayarı `frontend` olarak yapılandırılmalıdır.
*   **Backend**: Render üzerinden yayınlanmaktadır. CORS ayarlarında frontend URL'sinin yetkilendirilmiş (allowedOrigins) olması gereklidir.

## 🔐 Test Kullanıcıları

Uygulamayı denerken backend içerisinde tanımlı olan aşağıdaki test hesaplarını kullanabilirsiniz:

**Yük Veren (Dispatcher):**
*   **Email:** `info@orneklojistik.com`
*   **Şifre:** `123`

**Sürücü (Driver):**
*   **Email:** `ahmet@gmail.com`
*   **Şifre:** `123`

---

*Bu proje bir MVP (Minimum Viable Product) olarak tasarlanmıştır. Gerçek hayat kullanımında şifrelerin hash'lenmesi, JWT kullanımı ve ilişkisel/NoSQL dış veritabanı (MongoDB, PostgreSQL vb.) entegrasyonu önerilir.*
