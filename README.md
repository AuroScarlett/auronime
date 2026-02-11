# 🦊 AuroNime - Platform Streaming Anime Sub Indo

**AuroNime** adalah aplikasi web modern untuk menonton anime dengan subtitle Indonesia secara gratis tanpa iklan yang mengganggu. Dibangun menggunakan teknologi web terbaru untuk performa maksimal dan pengalaman pengguna yang mulus.

Project ini dibuat sebagai portofolio pembelajaran **Next.js** dan konsumsi **REST API**.

## 🚀 Fitur Utama

- **Streaming Lancar**: Nonton anime resolusi HD dengan server yang stabil.
- **Pencarian Cepat**: Cari anime favorit (lama atau baru) secara instan.
- **Jadwal Rilis Harian**: Cek anime _ongoing_ yang rilis hari ini (Senin - Minggu).
- **Eksplorasi Genre**: Temukan tontonan baru berdasarkan kategori (Action, Romance, Isekai, dll).
- **Metadata Dinamis**: Judul tab browser berubah sesuai anime yang ditonton (SEO Friendly).
- **Responsive Design**: Tampilan optimal di HP, Tablet, dan Desktop.
- **Tanpa Login**: Privasi terjaga, cocok untuk mode _Incognito_.

## 🛠️ Teknologi yang Digunakan

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Phosphor Icons / React Icons](https://phosphoricons.com/)
- **Deployment**: [Vercel](https://vercel.com/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Data Source**: Unofficial Otakudesu API (`natee`)

## 📦 Cara Menjalankan di Local (Instalasi)

Ikuti langkah ini jika ingin menjalankan project ini di komputer kamu sendiri:

1.  **Clone Repository**

    ```bash
    git clone [https://github.com/AuroScarlett/auronime.git](https://github.com/AuroScarlett/auronime.git)
    cd auronime
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Buat file `.env.local` di folder paling luar, lalu isi dengan kode berikut:

    ```bash
    NEXT_PUBLIC_API_BASE_URL=[https://api.otakudesu.natee.my.id/api](https://api.otakudesu.natee.my.id/api)
    ```

4.  **Jalankan Server Development**

    ```bash
    npm run dev
    ```

5.  **Buka Browser**
    Buka [http://localhost:3000](http://localhost:3000) untuk melihat hasilnya.

## 📂 Struktur Folder

````bash
src/
├── app/
│   ├── anime/[id]/      # Halaman Detail Anime
│   ├── genre/[slug]/    # Halaman List per Genre
│   ├── genres/          # Halaman Semua Kategori
│   ├── schedule/        # Halaman Jadwal Tayang
│   ├── watch/[id]/      # Halaman Nonton Video
│   ├── layout.js        # Root Layout & Analytics
│   └── page.js          # Halaman Utama (Home)
├── components/          # Komponen UI (Navbar, Card, List, dll)
└── libs/                # Konfigurasi API Call
````

## ⚠️ Disclaimer
Project ini dibuat semata-mata untuk tujuan edukasi (belajar Next.js & API Handling).

Seluruh konten (video, gambar, sinopsis) diambil dari pihak ketiga (Unofficial API).

Pembuat project tidak menyimpan file video apapun di server sendiri.

Jika Anda pemilik hak cipta dan keberatan, silakan hubungi penyedia sumber data asli.

## 🤝 Kontribusi
Ingin menambahkan fitur baru? Silakan Fork repository ini dan buat Pull Request. Ide fitur yang bisa dikembangkan:

[ ] Fitur History Nonton (LocalStorage)

[ ] Fitur Bookmark / Favorit

[ ] Integrasi Komentar (Disqus/Giscus)

# Dibuat dengan ❤️ oleh AuroScarlett.
