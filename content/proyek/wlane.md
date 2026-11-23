---
title: "WLane"
order: 2
featured: false
proves: "Membuktikan: saya bisa mengirim produk utuh dari ujung ke ujung."
summary: "Ubah screenshot website menjadi panduan interaktif dengan hotspot, sorotan area, dan modal, lalu bagikan lewat link atau iframe. Multi-pengguna, dengan batas pemakaian yang dijaga database."
tags: ["Nuxt", "Supabase", "TypeScript"]
status: "Live"
links:
  - label: "Coba aplikasinya"
    url: "https://w-lane.vercel.app/"
  - label: "GitHub"
    url: "https://github.com/wandywahidin/WLane"
preview: "guide"
published: true
---

## Masalah

Beberapa website saya butuh petunjuk penggunaan. Petunjuk berbentuk teks panjang atau PDF jarang dibaca sampai habis, dan pengguna tetap bertanya "tombolnya di mana?". Yang mereka butuhkan adalah melihat alurnya langsung, langkah demi langkah, di layar yang sama dengan yang nanti mereka pakai.

Ada tiga syarat tambahan. Satu alat harus bisa dipakai untuk beberapa website tanpa mengubah kode website-website itu. Panduannya harus rapi di HP, karena sebagian besar pengguna membuka dari HP. Biayanya juga harus Rp0 per bulan.

## Pendekatan

Saya membandingkan dua bentuk panduan. Tur langsung di website asli (seperti Driver.js atau Shepherd.js) butuh akses kode di setiap website dan tidak bisa dibagikan sebagai link terpisah. Karena itu saya memilih **demo berbasis screenshot** yang berdiri sendiri.

Alurnya:

1. Pembuat demo mengunggah satu screenshot per langkah.
2. Di setiap screenshot, pembuat memilih salah satu dari tiga jenis langkah: **hotspot** (titik yang diklik), **sorotan area** (bagian lain diredupkan), atau **modal** (kotak berisi judul, teks, dan tombol ke langkah lain atau ke website asli).
3. Demo diterbitkan menjadi link publik `/d/<slug>` dan kode `<iframe>`. Penonton bisa membukanya tanpa login.

Walaupun dipakai pribadi, aplikasinya saya bangun untuk banyak pengguna: ada akun, setiap pengguna hanya melihat datanya sendiri, dan ada alur draft lalu terbit.

Stack-nya Nuxt 3 dengan TypeScript, plus Supabase untuk Auth, Postgres, dan Storage. Tidak ada server sendiri. Setiap halaman memakai mode render yang sesuai kebutuhannya:

- Landing page dan halaman legal di-prerender.
- Dashboard dan editor berjalan sebagai SPA, karena hanya dipakai pengguna yang sudah login.
- Player di-render di server, supaya link yang dibagikan ke WhatsApp menampilkan judul dan gambar pratinjau.

## Keputusan penting

- **Batas pemakaian dijaga di database, bukan hanya di UI.** Kuota gratis Supabase dipakai bersama semua pengguna. Kalau satu akun menghabiskannya, demo yang tertanam di website saya ikut mati. Batasnya 5 demo per akun, 20 langkah per demo, dan 20 akun, ditegakkan lewat trigger Postgres. Angkanya disimpan di tabel konfigurasi, jadi bisa diubah tanpa deploy ulang.
- **Data dipisah dengan Row Level Security.** Pemilik hanya bisa membaca dan menulis demo miliknya. Penonton anonim hanya bisa membaca versi terbit lewat RPC, dan tidak punya akses ke tabel langkah yang berisi draft.
- **Draft dan versi terbit dipisah dengan snapshot.** Saat "Terbitkan" ditekan, semua langkah disalin menjadi satu snapshot. Penonton selalu melihat snapshot itu, jadi suntingan setengah jadi tidak pernah bocor ke link publik. Dashboard juga bisa menunjukkan status "ada perubahan belum diterbitkan".
- **Gambar dikompres di browser.** Batas paket gratis yang pertama tercapai adalah egress 5 GB per bulan, karena setiap penonton mengunduh screenshot. Karena itu gambar dikonversi ke WebP dengan lebar maksimal 1920 px sebelum diunggah. Semua akses ke Storage ada di satu modul (`image-store.ts`), sehingga pindah ke Cloudflare R2 nanti cukup dengan mengganti satu file itu.
- **Jenis langkah memakai kolom bertipe, bukan JSON bebas.** Sorotan dan modal ditambahkan sebagai kolom baru di tabel langkah. Dengan begitu aturan seperti "tombol modal wajib punya label dan aksi" atau "link harus `https://`" bisa dijaga oleh constraint database. Demo lama juga tetap valid tanpa migrasi data.
- **Supabase, bukan Firebase.** Cloud Storage for Firebase mewajibkan paket pay-as-you-go dengan kartu kredit. Itu bertentangan dengan target Rp0.

## Hasil

- Aplikasinya live dan berjalan di paket gratis Vercel dan Supabase. Fiturnya lengkap: daftar, editor dengan simpan otomatis, terbit, embed, hapus demo, dan hapus akun beserta semua datanya.
- 110 unit test (Vitest) untuk utilitas, composable, editor, dan player.
- 101 assertion pgTAP di 8 file test database, mencakup skema, RLS, batas pemakaian, terbit, storage, dan hapus akun.
- Test integrasi menjalankan alur lengkap terhadap Supabase lokal.
- Landing page menampilkan demo contoh lewat `<iframe>` yang sama dengan yang diberikan ke pengguna, jadi fitur embed ikut terbukti di halaman depan.
- Workflow GitHub Actions harian menjaga project Supabase gratis agar tidak di-pause.

## Yang akan saya lakukan berbeda

- **Siapkan SMTP sendiri sejak awal.** Layanan email bawaan Supabase hanya mengirim ke anggota tim project, jadi konfirmasi email terpaksa dimatikan. Dengan SMTP sendiri, pendaftaran bisa diverifikasi dan "lupa password" bisa dibuat.
- **Ukur apakah panduannya berhasil.** Target saya adalah pengguna paham alurnya tanpa bertanya, tapi saat ini belum ada data penonton berhenti di langkah ke berapa. Analitik sederhana per langkah seharusnya masuk lebih awal, karena tanpa itu target utamanya tidak bisa dibuktikan.
- **Pakai URL bertanda tangan untuk gambar draft.** Bucket gambar saat ini publik untuk dibaca, dengan nama file acak. Risikonya kecil, tapi screenshot draft sebenarnya bisa dibuka oleh siapa pun yang tahu URL lengkapnya.
