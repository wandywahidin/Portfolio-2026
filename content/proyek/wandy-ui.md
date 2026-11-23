---
title: "@wandy29/ui"
order: 1
featured: true
proves: "Membuktikan: saya bisa membangun fondasi, bukan cuma halaman."
summary: "Design system Vue + Tailwind dengan komponen yang bisa dikustomisasi. Komponen sederhana dibuat sendiri, komponen kompleks di atas Reka UI. Terdokumentasi di Storybook dan terbit di npm."
tags: ["Vue 3", "Tailwind", "Reka UI", "Storybook"]
status: "v0.1.0 di npm"
links:
  - label: "Storybook"
    url: "https://wandywahidin.github.io/wandy-ui/"
  - label: "GitHub"
    url: "https://github.com/wandywahidin/wandy-ui"
  - label: "npm"
    url: "https://www.npmjs.com/package/@wandy29/ui"
preview: "ui"
published: false
---

## Masalah

Setiap proyek frontend baru dimulai dengan pekerjaan yang sama: tombol, field form, dialog, tab. Kalau dibuat ulang di tiap proyek, perbaikan aksesibilitas di satu tempat tidak pernah sampai ke tempat lain, dan tampilannya pelan-pelan saling menjauh.

Bagian tersulitnya bukan tampilan, tapi perilaku: navigasi keyboard, manajemen fokus, dan atribut ARIA yang benar. Pola seperti focus trap di dialog atau posisi popover yang menghindari tepi layar penuh dengan kasus khusus di tiap browser, dan kesalahannya langsung terasa oleh pengguna screen reader.

Saya ingin satu fondasi yang bisa dipasang di semua proyek saya, mudah diubah tampilannya tanpa melawan CSS-nya, dan aksesibilitasnya dibuktikan dengan test, bukan sekadar diklaim.

## Pendekatan

Saya memisahkan komponen berdasarkan seberapa besar pola WAI-ARIA-nya:

- **Dibuat sendiri (11 komponen):** Button, IconButton, Field, Input, Textarea, Checkbox, RadioGroup, Switch, Tabs, Badge, Spinner. Polanya cukup kecil untuk saya kuasai dan uji sepenuhnya. Perilaku yang dipakai bersama ada di composable sendiri, misalnya `useFieldControl` dan `useRovingFocus`.
- **Membungkus [Reka UI](https://reka-ui.com) (4 komponen):** Dialog, Popover, Tooltip, Select. Keempatnya butuh focus trap, portal, atau typeahead, yaitu area tempat bug paling merugikan pengguna.

Dari luar, kedua jenis komponen punya API yang sama, jadi pemakai tidak perlu tahu mana yang dibuat sendiri.

Kustomisasi punya lima lapisan berurutan: token warna, `extend` varian, prop `ui` dan `class`, default global lewat `createUI`, dan slot. Semua class digabung di satu composable (`useUi`) dengan tailwind-merge, sehingga class dari pemakai selalu menang tanpa `!important`.

## Keputusan penting

- **Paket npm, bukan salin-tempel kode.** Model salin-tempel seperti shadcn-vue memberi kebebasan penuh, tapi perbaikan bug dan aksesibilitas tidak menyebar ke proyek yang sudah menyalin. Dengan paket ber-semver, satu perbaikan sampai ke semua pemakai, dengan konsekuensi API publik menjadi kontrak sejak hari pertama.
- **Tailwind CSS v4 dan tailwind-variants.** Token diekspor sebagai variabel CSS (`--wui-*`) yang dipetakan ke utility Tailwind, jadi ganti merek atau mode gelap tidak perlu build ulang. tailwind-variants dipilih karena mendukung slot untuk komponen multi-bagian seperti Dialog.
- **Vue 3.5, bukan 3.6 RC.** Library menentukan versi minimum untuk semua pemakainya. Vue 3.5 sudah punya `useId()` untuk id yang stabil di SSR, jadi tidak ada alasan memaksa pemakai ke versi pra-rilis.

Setiap keputusan ini saya tulis sebagai ADR di repo, lengkap dengan alternatif yang ditolak dan konsekuensinya.

## Hasil

- 15 komponen, terbit di npm sebagai `@wandy29/ui` beserta paket token `@wandy29/tokens`.
- Lebih dari 180 unit test, termasuk pemeriksaan axe untuk setiap state komponen. Navigasi keyboard diuji dengan play function Storybook di Chromium.
- Kontras warna token diuji otomatis terhadap standar WCAG AA, untuk mode terang dan gelap.
- Rilis memakai Changesets: setiap perubahan butuh catatan versi, lalu changelog dan publikasi ke npm berjalan dari CI.
- Dokumentasi dan playground interaktif ada di Storybook, termasuk bagian Aksesibilitas di setiap halaman komponen.

## Yang akan saya lakukan berbeda

Saya akan memasang library ini di proyek nyata lebih awal. Dua celah baru terlihat saat website ini mulai memakainya:

- `Button` hanya bisa merender `<button>`, padahal sebagian besar tombol di website sebenarnya link. Perbaikannya, prop `as` dan `as-child`, disiapkan untuk v0.2.
- Nama token `muted` di library berarti warna latar, sedangkan di website berarti warna teks. Bentrokan seperti ini lebih murah dicegah dengan dokumentasi makna token sejak awal daripada ditemukan saat integrasi.

Storybook dan test membuktikan komponennya benar. Tapi hanya pemakai sungguhan yang menunjukkan apakah API-nya cukup.
