import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger"; // Asumsi ini plugin yang Anda gunakan

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Tentukan base path berdasarkan mode (development atau production)
  // Jika diakses di http://your-domain.com/simpadu/
  const base_path = mode === 'production' ? '/simpadu/' : '/';

  return {
    server: {
      host: "::", // Mengizinkan akses dari semua antarmuka
      port: 8080, // Port untuk server development
    },
    // Konfigurasi base path untuk aplikasi Anda
    base: base_path,

    plugins: [
      react(),
      // Aktifkan componentTagger hanya di mode development
      mode === 'development' && componentTagger(),
    ].filter(Boolean), // Filter untuk menghapus nilai 'false' atau 'undefined'

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // Alias untuk impor modul di src
      },
    },

    build: {
      outDir: 'dist', // Direktori output untuk hasil build (default Vite)
      emptyOutDir: true, // Bersihkan direktori output sebelum build
      // sourcemap: false, // Opsional: Matikan sourcemap di production untuk keamanan
      // target: 'es2015', // Opsional: Target JS versi lama untuk kompatibilitas browser
    },
  };
});