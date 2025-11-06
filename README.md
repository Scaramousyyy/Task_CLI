📝 Aplikasi CLI Task Manager Sederhana
Aplikasi ini adalah tugas minggu ke-10 yang berupa Task Manager berbasis Command-Line Interface (CLI).
Aplikasi menggunakan Node.js dan menyimpan data tugas di dalam file JSON, tanpa database eksternal.

Fitur Utama
1. Tambah Tugas
   Menambahkan tugas baru ke daftar tugas.
2. Lihat Daftar Tugas
   Menampilkan semua tugas beserta statusnya (✅ selesai / ❌ belum).
3. Tandai Selesai
   Mengubah status tugas menjadi selesai berdasarkan ID tugas.
4. Hapus Tugas
   Menghapus tugas dari daftar berdasarkan ID.

Fitur Utama
- Node.js (ES Modules)
- fs/promises → untuk operasi file secara asinkron
- path → untuk mengelola path file
- process.argv → untuk membaca argumen dari command line
- async/await + try...catch → untuk menangani operasi asynchronous dan error handling dengan clean code
