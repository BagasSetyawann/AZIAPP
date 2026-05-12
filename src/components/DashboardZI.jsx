import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  ChevronDown,
  ChevronRight,
  Upload,
  Download,
  XCircle,
  Trash2,
  RefreshCw,
  FolderOpen,
  Cloud,
  CloudOff,
  Loader2,
  LogIn,
  LogOut,
  FolderSync,
  Shield,
  CheckCircle2,
} from "lucide-react";

const GOOGLE_CLIENT_ID =
  "261773148186-1co5gre3f7sqq8q3s04uddlfj3nqakv3.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/drive.file";
const FOLDER_ROOT_NAME = "BUKTI DUKUNG ZI 2026";
const META_FILE_NAME = "zi_doc_meta.json"; // File database kita
const FOLDER_PENGUNGKIT = "A. PENGUNGKIT";
const TAB_FOLDER = { A: "I. PEMENUHAN", B: "II. REFORM" };
const PILLAR_FOLDER = {
  "A-I": "I. MANAJEMEN PERUBAHAN",
  "A-II": "II. PENATAAN TATALAKSANA",
  "A-III": "III. PENATAAN SISTEM MANAJEMEN SDM APARATUR",
  "A-IV": "IV. PENGUATAN AKUNTABILITAS",
  "A-V": "V. PENGUATAN PENGAWASAN",
  "A-VI": "VI. PENINGKATAN KUALITAS PELAYANAN PUBLIK",
  "B-I": "I. MANAJEMEN PERUBAHAN",
  "B-II": "II. PENATAAN TATALAKSANA",
  "B-III": "III. PENATAAN SISTEM MANAJEMEN SDM APARATUR",
  "B-IV": "IV. PENGUATAN AKUNTABILITAS",
  "B-V": "V. PENGUATAN PENGAWASAN",
  "B-VI": "VI. PENINGKATAN KUALITAS PELAYANAN PUBLIK",
};
const PILLAR_ACCENTS = [
  {
    color: "#0f766e",
    light: "#f0fdfa",
    border: "#99f6e4",
    text: "#134e4a",
    bar: "#14b8a6",
  },
  {
    color: "#1d4ed8",
    light: "#eff6ff",
    border: "#bfdbfe",
    text: "#1e3a8a",
    bar: "#3b82f6",
  },
  {
    color: "#6d28d9",
    light: "#f5f3ff",
    border: "#ddd6fe",
    text: "#4c1d95",
    bar: "#8b5cf6",
  },
  {
    color: "#b45309",
    light: "#fffbeb",
    border: "#fde68a",
    text: "#78350f",
    bar: "#d97706",
  },
  {
    color: "#be123c",
    light: "#fff1f2",
    border: "#fecdd3",
    text: "#881337",
    bar: "#e11d48",
  },
  {
    color: "#0369a1",
    light: "#f0f9ff",
    border: "#bae6fd",
    text: "#0c4a6e",
    bar: "#0284c7",
  },
];

const ZI_DATA = {
  A: {
    title: "Pemenuhan",
    pillars: [
      {
        id: "A-I",
        title: "I. Manajemen Perubahan",
        indicators: [
          {
            id: "A-I-1",
            title: "Penyusunan Tim Kerja",
            subs: [
              {
                id: "A-I-1-a",
                text: "a. Unit kerja telah membentuk tim untuk melakukan pembangunan Zona Integritas",
              },
              {
                id: "A-I-1-b",
                text: "b. Penentuan anggota Tim dipilih melalui prosedur/mekanisme yang jelas",
              },
            ],
          },
          {
            id: "A-I-2",
            title: "Rencana Pembangunan Zona Integritas",
            subs: [
              {
                id: "A-I-2-a",
                text: "a. Terdapat dokumen rencana kerja pembangunan Zona Integritas menuju WBK/WBBM",
              },
              {
                id: "A-I-2-b",
                text: "b. Dalam dokumen pembangunan terdapat target-target prioritas yang relevan",
              },
              {
                id: "A-I-2-c",
                text: "c. Terdapat mekanisme atau media untuk mensosialisasikan pembangunan WBK/WBBM",
              },
            ],
          },
          {
            id: "A-I-3",
            title: "Pemantauan dan Evaluasi Pembangunan WBK/WBBM",
            subs: [
              {
                id: "A-I-3-a",
                text: "a. Seluruh kegiatan pembangunan sudah dilaksanakan sesuai dengan rencana",
              },
              {
                id: "A-I-3-b",
                text: "b. Terdapat monitoring dan evaluasi terhadap pembangunan Zona Integritas",
              },
              {
                id: "A-I-3-c",
                text: "c. Hasil Monitoring dan Evaluasi telah ditindaklanjuti",
              },
            ],
          },
          {
            id: "A-I-4",
            title: "Perubahan Pola Pikir dan Budaya Kerja",
            subs: [
              {
                id: "A-I-4-a",
                text: "a. Pimpinan berperan sebagai role model dalam pelaksanaan Pembangunan WBK/WBBM",
              },
              { id: "A-I-4-b", text: "b. Sudah ditetapkan agen perubahan" },
              {
                id: "A-I-4-c",
                text: "c. Telah dibangun budaya kerja dan pola pikir di lingkungan organisasi",
              },
              {
                id: "A-I-4-d",
                text: "d. Anggota organisasi terlibat dalam pembangunan Zona Integritas menuju WBK/WBBM",
              },
            ],
          },
        ],
      },
      {
        id: "A-II",
        title: "II. Penataan Tatalaksana",
        indicators: [
          {
            id: "A-II-1",
            title: "Prosedur Operasional Tetap (SOP) Kegiatan Utama",
            subs: [
              {
                id: "A-II-1-a",
                text: "a. SOP mengacu pada peta proses bisnis instansi",
              },
              {
                id: "A-II-1-b",
                text: "b. Prosedur operasional tetap (SOP) telah diterapkan",
              },
              {
                id: "A-II-1-c",
                text: "c. Prosedur operasional tetap (SOP) telah dievaluasi",
              },
            ],
          },
          {
            id: "A-II-2",
            title: "Sistem Pemerintahan Berbasis Elektronik (SPBE)",
            subs: [
              {
                id: "A-II-2-a",
                text: "a. Sistem pengukuran kinerja unit sudah menggunakan teknologi informasi",
              },
              {
                id: "A-II-2-b",
                text: "b. Operasionalisasi manajemen SDM sudah menggunakan teknologi informasi",
              },
              {
                id: "A-II-2-c",
                text: "c. Pemberian pelayanan kepada publik sudah menggunakan teknologi informasi",
              },
              {
                id: "A-II-2-d",
                text: "d. Telah dilakukan monitoring dan evaluasi terhadap pemanfaatan TI",
              },
            ],
          },
          {
            id: "A-II-3",
            title: "Keterbukaan Informasi Publik",
            subs: [
              {
                id: "A-II-3-a",
                text: "a. Kebijakan tentang keterbukaan informasi publik telah diterapkan",
              },
              {
                id: "A-II-3-b",
                text: "b. Telah dilakukan monitoring dan evaluasi pelaksanaan kebijakan keterbukaan informasi publik",
              },
            ],
          },
        ],
      },
      {
        id: "A-III",
        title: "III. Penataan Sistem Manajemen SDM Aparatur",
        indicators: [
          {
            id: "A-III-1",
            title: "Perencanaan Kebutuhan Pegawai",
            subs: [
              {
                id: "A-III-1-a",
                text: "a. Kebutuhan pegawai mengacu kepada peta jabatan dan ABK",
              },
              {
                id: "A-III-1-b",
                text: "b. Penempatan pegawai mengacu kepada kebutuhan jabatan",
              },
              {
                id: "A-III-1-c",
                text: "c. Telah dilakukan monitoring dan evaluasi terhadap penempatan pegawai",
              },
            ],
          },
          {
            id: "A-III-2",
            title: "Pola Mutasi Internal",
            subs: [
              {
                id: "A-III-2-a",
                text: "a. Telah dilakukan mutasi pegawai antar jabatan",
              },
              {
                id: "A-III-2-b",
                text: "b. Mutasi memperhatikan kompetensi dan pola mutasi",
              },
              {
                id: "A-III-2-c",
                text: "c. Telah dilakukan monitoring dan evaluasi terhadap kegiatan mutasi",
              },
            ],
          },
          {
            id: "A-III-3",
            title: "Pengembangan Pegawai Berbasis Kompetensi",
            subs: [
              {
                id: "A-III-3-a",
                text: "a. Unit Kerja melakukan Training Need Analysis",
              },
              {
                id: "A-III-3-b",
                text: "b. Mempertimbangkan hasil pengelolaan kinerja pegawai",
              },
              {
                id: "A-III-3-c",
                text: "c. Tingkat kesenjangan kompetensi diukur",
              },
              {
                id: "A-III-3-d",
                text: "d. Pegawai memperoleh kesempatan diklat",
              },
              {
                id: "A-III-3-e",
                text: "e. Unit kerja melakukan upaya pengembangan kompetensi mandiri",
              },
              {
                id: "A-III-3-f",
                text: "f. Telah dilakukan monitoring dan evaluasi hasil pengembangan",
              },
            ],
          },
          {
            id: "A-III-4",
            title: "Penetapan Kinerja Individu",
            subs: [
              {
                id: "A-III-4-a",
                text: "a. Terdapat penetapan kinerja individu",
              },
              {
                id: "A-III-4-b",
                text: "b. Kesesuaian dengan indikator kinerja level di atasnya",
              },
              {
                id: "A-III-4-c",
                text: "c. Pengukuran kinerja secara periodik",
              },
              {
                id: "A-III-4-d",
                text: "d. Hasil penilaian sebagai dasar reward",
              },
            ],
          },
          {
            id: "A-III-5",
            title: "Penegakan Aturan Disiplin/Kode Etik",
            subs: [
              {
                id: "A-III-5-a",
                text: "a. Aturan disiplin/kode etik telah diimplementasikan",
              },
            ],
          },
          {
            id: "A-III-6",
            title: "Sistem Informasi Kepegawaian",
            subs: [
              {
                id: "A-III-6-a",
                text: "a. Data informasi kepegawaian dimutakhirkan berkala",
              },
            ],
          },
        ],
      },
      {
        id: "A-IV",
        title: "IV. Penguatan Akuntabilitas",
        indicators: [
          {
            id: "A-IV-1",
            title: "Keterlibatan Pimpinan",
            subs: [
              {
                id: "A-IV-1-a",
                text: "a. Melibatkan pimpinan saat penyusunan perencanaan",
              },
              {
                id: "A-IV-1-b",
                text: "b. Melibatkan pimpinan saat penyusunan penetapan kinerja",
              },
              {
                id: "A-IV-1-c",
                text: "c. Pimpinan memantau pencapaian kinerja berkala",
              },
            ],
          },
          {
            id: "A-IV-2",
            title: "Pengelolaan Akuntabilitas Kinerja",
            subs: [
              {
                id: "A-IV-2-a",
                text: "a. Dokumen perencanaan kinerja sudah ada",
              },
              {
                id: "A-IV-2-b",
                text: "b. Perencanaan kinerja telah berorientasi hasil",
              },
              {
                id: "A-IV-2-c",
                text: "c. Terdapat penetapan Indikator Kinerja Utama (IKU)",
              },
              {
                id: "A-IV-2-d",
                text: "d. Indikator kinerja memenuhi kriteria SMART",
              },
              {
                id: "A-IV-2-e",
                text: "e. Laporan kinerja disusun tepat waktu",
              },
              {
                id: "A-IV-2-f",
                text: "f. Laporan kinerja memberikan informasi kinerja",
              },
              {
                id: "A-IV-2-g",
                text: "g. Terdapat sistem/mekanisme informasi kinerja",
              },
              {
                id: "A-IV-2-h",
                text: "h. Upaya meningkatkan kapasitas SDM akuntabilitas kinerja",
              },
            ],
          },
        ],
      },
      {
        id: "A-V",
        title: "V. Penguatan Pengawasan",
        indicators: [
          {
            id: "A-V-1",
            title: "Pengendalian Gratifikasi",
            subs: [
              { id: "A-V-1-a", text: "a. Telah dilakukan public campaign" },
              {
                id: "A-V-1-b",
                text: "b. Pengendalian gratifikasi diimplementasikan",
              },
            ],
          },
          {
            id: "A-V-2",
            title: "Penerapan Sistem Pengendalian Intern Pemerintah (SPIP)",
            subs: [
              {
                id: "A-V-2-a",
                text: "a. Telah dibangun lingkungan pengendalian",
              },
              { id: "A-V-2-b", text: "b. Telah dilakukan penilaian risiko" },
              {
                id: "A-V-2-c",
                text: "c. Telah dilakukan kegiatan pengendalian risiko",
              },
              {
                id: "A-V-2-d",
                text: "d. SPI dikomunikasikan kepada pihak terkait",
              },
            ],
          },
          {
            id: "A-V-3",
            title: "Pengaduan Masyarakat",
            subs: [
              {
                id: "A-V-3-a",
                text: "a. Kebijakan pengaduan diimplementasikan",
              },
              {
                id: "A-V-3-b",
                text: "b. Pengaduan masyarakat ditindaklanjuti",
              },
              {
                id: "A-V-3-c",
                text: "c. Monitoring dan evaluasi penanganan pengaduan",
              },
              { id: "A-V-3-d", text: "d. Hasil evaluasi ditindaklanjuti" },
            ],
          },
          {
            id: "A-V-4",
            title: "Whistle-Blowing System",
            subs: [
              { id: "A-V-4-a", text: "a. WBS telah diterapkan" },
              { id: "A-V-4-b", text: "b. Evaluasi atas penerapan WBS" },
              { id: "A-V-4-c", text: "c. Hasil evaluasi WBS ditindaklanjuti" },
            ],
          },
          {
            id: "A-V-5",
            title: "Penanganan Benturan Kepentingan",
            subs: [
              {
                id: "A-V-5-a",
                text: "a. Terdapat identifikasi/pemetaan benturan kepentingan",
              },
              { id: "A-V-5-b", text: "b. Disosialisasikan/diinternalisasi" },
              { id: "A-V-5-c", text: "c. Diimplementasikan" },
              { id: "A-V-5-d", text: "d. Evaluasi atas penanganan" },
              { id: "A-V-5-e", text: "e. Hasil evaluasi ditindaklanjuti" },
            ],
          },
        ],
      },
      {
        id: "A-VI",
        title: "VI. Peningkatan Kualitas Pelayanan Publik",
        indicators: [
          {
            id: "A-VI-1",
            title: "Standar Pelayanan",
            subs: [
              {
                id: "A-VI-1-a",
                text: "a. Terdapat kebijakan standar pelayanan",
              },
              { id: "A-VI-1-b", text: "b. Standar pelayanan dimaklumatkan" },
              {
                id: "A-VI-1-c",
                text: "c. Reviu dan perbaikan standar pelayanan",
              },
              { id: "A-VI-1-d", text: "d. Publikasi standar pelayanan" },
            ],
          },
          {
            id: "A-VI-2",
            title: "Budaya Pelayanan Prima",
            subs: [
              {
                id: "A-VI-2-a",
                text: "a. Upaya peningkatan kompetensi budaya pelayanan",
              },
              { id: "A-VI-2-b", text: "b. Informasi pelayanan mudah diakses" },
              {
                id: "A-VI-2-c",
                text: "c. Sistem reward & punishment bagi petugas",
              },
              {
                id: "A-VI-2-d",
                text: "d. Sistem kompensasi bila tidak sesuai standar",
              },
              {
                id: "A-VI-2-e",
                text: "e. Terdapat sarana terpadu/terintegrasi",
              },
              { id: "A-VI-2-f", text: "f. Terdapat inovasi pelayanan" },
            ],
          },
          {
            id: "A-VI-3",
            title: "Pengelolaan Pengaduan",
            subs: [
              { id: "A-VI-3-a", text: "a. Terintegrasi dengan SP4N-Lapor!" },
              { id: "A-VI-3-b", text: "b. Terdapat unit pengelola pengaduan" },
              { id: "A-VI-3-c", text: "c. Evaluasi penanganan keluhan" },
            ],
          },
          {
            id: "A-VI-4",
            title: "Penilaian Kepuasan terhadap Pelayanan",
            subs: [
              {
                id: "A-VI-4-a",
                text: "a. Survey kepuasan masyarakat dilakukan",
              },
              { id: "A-VI-4-b", text: "b. Hasil survei dapat diakses terbuka" },
              { id: "A-VI-4-c", text: "c. Tindak lanjut hasil survei" },
            ],
          },
          {
            id: "A-VI-5",
            title: "Pemanfaatan Teknologi Informasi",
            subs: [
              { id: "A-VI-5-a", text: "a. Menerapkan TI dalam pelayanan" },
              { id: "A-VI-5-b", text: "b. Database pelayanan terintegrasi" },
              { id: "A-VI-5-c", text: "c. Perbaikan secara terus menerus" },
            ],
          },
        ],
      },
    ],
  },
  B: {
    title: "Reform",
    pillars: [
      {
        id: "B-I",
        title: "I. Manajemen Perubahan",
        indicators: [
          {
            id: "B-I-1",
            title: "Komitmen dalam Perubahan",
            subs: [
              {
                id: "B-I-1-a",
                text: "a. Agen perubahan membuat perubahan konkret (dalam 1 tahun)",
              },
              {
                id: "B-I-1-b",
                text: "b. Perubahan terintegrasi dalam sistem manajemen",
              },
            ],
          },
          {
            id: "B-I-2",
            title: "Komitmen Pimpinan",
            subs: [
              {
                id: "B-I-2-a",
                text: "a. Pimpinan memiliki komitmen terhadap pelaksanaan RB (target jelas)",
              },
            ],
          },
          {
            id: "B-I-3",
            title: "Membangun Budaya Kerja",
            subs: [
              {
                id: "B-I-3-a",
                text: "a. Instansi membangun budaya kerja positif dan menerapkan nilai organisasi",
              },
            ],
          },
        ],
      },
      {
        id: "B-II",
        title: "II. Penataan Tatalaksana",
        indicators: [
          {
            id: "B-II-1",
            title: "Peta Proses Bisnis",
            subs: [
              {
                id: "B-II-1-a",
                text: "a. Telah disusun peta proses bisnis dengan penyederhanaan jabatan",
              },
            ],
          },
          {
            id: "B-II-2",
            title: "SPBE yang Terintegrasi",
            subs: [
              {
                id: "B-II-2-a",
                text: "a. Implementasi SPBE terintegrasi (pelayanan publik cepat & efisien)",
              },
              {
                id: "B-II-2-b",
                text: "b. Implementasi SPBE terintegrasi (pelayanan internal cepat & efisien)",
              },
            ],
          },
          {
            id: "B-II-3",
            title: "Transformasi Digital",
            subs: [
              {
                id: "B-II-3-a",
                text: "a. Transformasi digital proses bisnis utama memberi nilai manfaat",
              },
              {
                id: "B-II-3-b",
                text: "b. Transformasi digital administrasi pemerintahan memberi nilai manfaat",
              },
              {
                id: "B-II-3-c",
                text: "c. Transformasi digital pelayanan publik memberi nilai manfaat",
              },
            ],
          },
        ],
      },
      {
        id: "B-III",
        title: "III. Penataan Sistem Manajemen SDM Aparatur",
        indicators: [
          {
            id: "B-III-1",
            title: "Kinerja Individu",
            subs: [
              {
                id: "B-III-1-a",
                text: "a. Ukuran kinerja individu berorientasi hasil (outcome)",
              },
            ],
          },
          {
            id: "B-III-2",
            title: "Assessment Pegawai",
            subs: [
              {
                id: "B-III-2-a",
                text: "a. Hasil assessment sebagai pertimbangan mutasi & karir",
              },
            ],
          },
          {
            id: "B-III-3",
            title: "Pelanggaran Disiplin Pegawai",
            subs: [
              {
                id: "B-III-3-a",
                text: "a. Penurunan pelanggaran disiplin pegawai yang dievaluasi",
              },
            ],
          },
        ],
      },
      {
        id: "B-IV",
        title: "IV. Penguatan Akuntabilitas",
        indicators: [
          {
            id: "B-IV-1",
            title: "Meningkatnya Capaian Kinerja Unit Kerja",
            subs: [
              {
                id: "B-IV-1-a",
                text: "a. Persentase Sasaran dengan capaian 100% atau lebih",
              },
            ],
          },
          {
            id: "B-IV-2",
            title: "Pemberian Reward and Punishment",
            subs: [
              {
                id: "B-IV-2-a",
                text: "a. Hasil Capaian Kinerja dasar reward & punishment",
              },
            ],
          },
          {
            id: "B-IV-3",
            title: "Kerangka Logis Kinerja",
            subs: [
              {
                id: "B-IV-3-a",
                text: "a. Terdapat penjenjangan kinerja (Kerangka Logis Kinerja)",
              },
            ],
          },
        ],
      },
      {
        id: "B-V",
        title: "V. Penguatan Pengawasan",
        indicators: [
          {
            id: "B-V-1",
            title: "Mekanisme Pengendalian",
            subs: [
              {
                id: "B-V-1-a",
                text: "a. Telah dilakukan mekanisme pengendalian aktivitas berjenjang",
              },
            ],
          },
          {
            id: "B-V-2",
            title: "Penanganan Pengaduan Masyarakat",
            subs: [
              {
                id: "B-V-2-a",
                text: "a. Persentase penanganan pengaduan masyarakat yang diukur",
              },
            ],
          },
          {
            id: "B-V-3",
            title: "Penyampaian Laporan Harta Kekayaan",
            subs: [
              { id: "B-V-3-a", text: "a. Penyampaian LHKPN dipantau" },
              { id: "B-V-3-b", text: "b. Penyampaian Non-LHKPN dipantau" },
            ],
          },
        ],
      },
      {
        id: "B-VI",
        title: "VI. Peningkatan Kualitas Pelayanan Publik",
        indicators: [
          {
            id: "B-VI-1",
            title: "Upaya dan/atau Inovasi Pelayanan Publik",
            subs: [
              {
                id: "B-VI-1-a",
                text: "a. Upaya/inovasi mendorong perbaikan pelayanan publik menyeluruh",
              },
              {
                id: "B-VI-1-b",
                text: "b. Upaya/inovasi pada perijinan/pelayanan dipermudah",
              },
            ],
          },
          {
            id: "B-VI-2",
            title: "Penanganan Pengaduan Pelayanan dan Konsultasi",
            subs: [
              {
                id: "B-VI-2-a",
                text: "a. Penanganan pengaduan dilakukan secara responsif & bertanggung jawab",
              },
            ],
          },
        ],
      },
    ],
  },
};

// ── Google Drive Helpers ──
function loadGoogleScripts() {
  return new Promise((resolve) => {
    if (window._gapiLoaded && window._gisLoaded) {
      resolve();
      return;
    }
    const a = new Promise((r) => {
      if (window._gapiLoaded) {
        r();
        return;
      }
      const s = document.createElement("script");
      s.src = "https://apis.google.com/js/api.js";
      s.onload = () =>
        window.gapi.load("client", () => {
          window._gapiLoaded = true;
          r();
        });
      document.body.appendChild(s);
    });
    const b = new Promise((r) => {
      if (window._gisLoaded) {
        r();
        return;
      }
      const s = document.createElement("script");
      s.src = "https://accounts.google.com/gsi/client";
      s.onload = () => {
        window._gisLoaded = true;
        r();
      };
      document.body.appendChild(s);
    });
    Promise.all([a, b]).then(resolve);
  });
}
async function loadDriveDiscovery() {
  if (window._driveDiscoveryLoaded) return;
  await window.gapi.client.load("drive", "v3");
  window._driveDiscoveryLoaded = true;
}

async function getOrCreateFolder(name, parentId = null) {
  const q = parentId
    ? `name='${name}' and mimeType='application/vnd.google-apps.folder' and '${parentId}' in parents and trashed=false`
    : `name='${name}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;
  const res = await window.gapi.client.drive.files.list({
    q,
    fields: "files(id,name)",
    spaces: "drive",
  });
  if (res.result.files.length > 0) return res.result.files[0].id;
  const created = await window.gapi.client.drive.files.create({
    resource: {
      name,
      mimeType: "application/vnd.google-apps.folder",
      ...(parentId ? { parents: [parentId] } : {}),
    },
    fields: "id",
  });
  return created.result.id;
}

// FUNGSI BARU: Simpan Database (JSON) ke Drive
async function saveDocDataToDrive(dataObj) {
  try {
    const rootId = await getOrCreateFolder(FOLDER_ROOT_NAME);
    const q = `name='${META_FILE_NAME}' and '${rootId}' in parents and trashed=false`;
    const listRes = await window.gapi.client.drive.files.list({
      q,
      fields: "files(id)",
    });

    const token = window.gapi.client.getToken().access_token;
    const fileContent = JSON.stringify(dataObj);
    const blob = new Blob([fileContent], { type: "application/json" });

    if (listRes.result.files.length > 0) {
      // Update file jika sudah ada
      const fileId = listRes.result.files[0].id;
      await fetch(
        `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: blob,
        },
      );
    } else {
      // Buat file baru jika belum ada
      const metadata = {
        name: META_FILE_NAME,
        parents: [rootId],
        mimeType: "application/json",
      };
      const form = new FormData();
      form.append(
        "metadata",
        new Blob([JSON.stringify(metadata)], { type: "application/json" }),
      );
      form.append("file", blob);

      await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        },
      );
    }
  } catch (error) {
    console.error("Gagal sinkronisasi data ke Drive:", error);
  }
}

// FUNGSI BARU: Ambil Database (JSON) dari Drive
async function fetchDocDataFromDrive() {
  try {
    const rootId = await getOrCreateFolder(FOLDER_ROOT_NAME);
    const q = `name='${META_FILE_NAME}' and '${rootId}' in parents and trashed=false`;
    const listRes = await window.gapi.client.drive.files.list({
      q,
      fields: "files(id)",
    });

    if (listRes.result.files.length > 0) {
      const fileId = listRes.result.files[0].id;
      const token = window.gapi.client.getToken().access_token;
      const res = await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.ok) {
        return await res.json();
      }
    }
  } catch (error) {
    console.error("Gagal menarik data dari Drive:", error);
  }
  return null;
}

async function uploadFileToDrive(file, subId, tabKey, indicatorTitle, subText) {
  const idParts = subId.split("-");
  const pillarId = idParts.slice(0, 2).join("-");
  const indNum = idParts[2];
  const indFolderName = `${indNum}. ${indicatorTitle}`;
  const subFolderName =
    subText.length > 60 ? subText.substring(0, 60).trimEnd() + "…" : subText;
  const rootId = await getOrCreateFolder(FOLDER_ROOT_NAME);
  const pengungkitId = await getOrCreateFolder(FOLDER_PENGUNGKIT, rootId);
  const tabId = await getOrCreateFolder(TAB_FOLDER[tabKey], pengungkitId);
  const pillarFId = await getOrCreateFolder(
    PILLAR_FOLDER[pillarId] || pillarId,
    tabId,
  );
  const indFId = await getOrCreateFolder(indFolderName, pillarFId);
  const subFolderId = await getOrCreateFolder(subFolderName, indFId);
  const buffer = await file.arrayBuffer();
  const boundary = "aziapp_" + Date.now();
  const enc = new TextEncoder();
  const meta = JSON.stringify({ name: file.name, parents: [subFolderId] });
  const parts = [
    enc.encode(
      `\r\n--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${meta}\r\n--${boundary}\r\nContent-Type: ${file.type || "application/octet-stream"}\r\n\r\n`,
    ),
    new Uint8Array(buffer),
    enc.encode(`\r\n--${boundary}--`),
  ];
  let len = 0;
  parts.forEach((p) => (len += p.byteLength));
  const body = new Uint8Array(len);
  let off = 0;
  parts.forEach((p) => {
    body.set(p, off);
    off += p.byteLength;
  });
  const token = window.gapi.client.getToken().access_token;
  const res = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink,webContentLink",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body,
    },
  );
  if (!res.ok) throw new Error(`Upload gagal: ${res.statusText}`);
  return res.json();
}

async function deleteFileFromDrive(id) {
  await window.gapi.client.drive.files.delete({ fileId: id });
}

function useGoogleAuth() {
  const [authStatus, setAuthStatus] = useState("idle");
  const [userInfo, setUserInfo] = useState(null);
  const tcRef = useRef(null);
  const initAuth = useCallback(async () => {
    setAuthStatus("loading");
    try {
      await loadGoogleScripts();
      tcRef.current = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: SCOPES,
        callback: async (resp) => {
          if (resp.error) {
            setAuthStatus("error");
            return;
          }
          try {
            await loadDriveDiscovery();
          } catch {}
          fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${resp.access_token}` },
          })
            .then((r) => r.json())
            .then((info) => {
              setUserInfo(info);
              setAuthStatus("connected");
            });
        },
      });
      setAuthStatus("idle");
    } catch {
      setAuthStatus("error");
    }
  }, []);
  useEffect(() => {
    initAuth();
  }, [initAuth]);
  const signIn = useCallback(
    () => tcRef.current?.requestAccessToken({ prompt: "consent" }),
    [],
  );
  const signOut = useCallback(() => {
    const t = window.gapi?.client?.getToken();
    if (t) {
      window.google.accounts.oauth2.revoke(t.access_token);
      window.gapi.client.setToken(null);
    }
    setUserInfo(null);
    setAuthStatus("idle");
  }, []);
  return { authStatus, userInfo, signIn, signOut };
}

// ── Gauge ──
function Gauge({ value }) {
  const [v, setV] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    const start = v,
      end = value,
      t0 = performance.now();
    const run = (now) => {
      const p = Math.min((now - t0) / 900, 1),
        e = 1 - (1 - p) ** 3;
      setV(Math.round(start + (end - start) * e));
      if (p < 1) raf.current = requestAnimationFrame(run);
    };
    raf.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf.current);
  }, [value]);
  const cx = 100,
    cy = 100,
    r = 75,
    sa = -215,
    ta = 250;
  const polar = (a, rad) => ({
    x: cx + rad * Math.cos((a * Math.PI) / 180),
    y: cy + rad * Math.sin((a * Math.PI) / 180),
  });
  const arc = (sa, sw, rad) => {
    const s = polar(sa, rad),
      e = polar(sa + sw, rad);
    return `M${s.x} ${s.y} A${rad} ${rad} 0 ${sw > 180 ? 1 : 0} 1 ${e.x} ${e.y}`;
  };
  const nAngle = sa + (v / 100) * ta;
  const nTip = polar(nAngle, r - 12),
    nb1 = polar(nAngle + 90, 7),
    nb2 = polar(nAngle - 90, 7);
  const gc = v < 40 ? "#e11d48" : v < 70 ? "#d97706" : "#059669";
  return (
    <svg viewBox="0 0 200 160" style={{ width: "100%", maxWidth: 220 }}>
      <path
        d={arc(sa, ta, r)}
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d={arc(sa, ta * 0.4, r)}
        fill="none"
        stroke="rgba(225,29,72,0.15)"
        strokeWidth="13"
        strokeLinecap="butt"
      />
      <path
        d={arc(sa + ta * 0.4, ta * 0.3, r)}
        fill="none"
        stroke="rgba(217,119,6,0.15)"
        strokeWidth="13"
        strokeLinecap="butt"
      />
      <path
        d={arc(sa + ta * 0.7, ta * 0.3, r)}
        fill="none"
        stroke="rgba(5,150,105,0.15)"
        strokeWidth="13"
        strokeLinecap="round"
      />
      {v > 0 && (
        <path
          d={arc(sa, (v / 100) * ta, r)}
          fill="none"
          stroke={gc}
          strokeWidth="13"
          strokeLinecap="round"
        />
      )}
      {[0, 25, 50, 75, 100].map((t) => {
        const ang = sa + (t / 100) * ta;
        const inn = polar(ang, r - 9),
          out = polar(ang, r + 4),
          lbl = polar(ang, r + 16);
        return (
          <g key={t}>
            <line
              x1={inn.x}
              y1={inn.y}
              x2={out.x}
              y2={out.y}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1.5"
            />
            <text
              x={lbl.x}
              y={lbl.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="8"
              fill="rgba(255,255,255,0.3)"
              fontFamily="sans-serif"
            >
              {t}
            </text>
          </g>
        );
      })}
      <polygon
        points={`${nTip.x},${nTip.y} ${nb1.x},${nb1.y} ${nb2.x},${nb2.y}`}
        fill="#94a3b8"
      />
      <circle cx={cx} cy={cy} r="7" fill="#1e293b" />
      <circle cx={cx} cy={cy} r="3.5" fill="#475569" />
      <text
        x={cx}
        y={cy + 30}
        textAnchor="middle"
        fontSize="30"
        fontWeight="700"
        fill={gc}
        fontFamily="'DM Sans',sans-serif"
      >
        {v}%
      </text>
      <text
        x={cx}
        y={cy + 48}
        textAnchor="middle"
        fontSize="9"
        fill="#475569"
        fontFamily="sans-serif"
      >
        {v < 40
          ? "Perlu Perhatian"
          : v < 70
            ? "Sedang Berjalan"
            : v < 90
              ? "Hampir Selesai"
              : "Sangat Baik"}
      </text>
    </svg>
  );
}

// ── Main ──
export default function DashboardZI() {
  const [activeTab, setActiveTab] = useState("A");
  const [expandedPillar, setExpandedPillar] = useState(null);
  const [expandedIndicator, setExpandedIndicator] = useState(null);
  const [uploadingIds, setUploadingIds] = useState({});
  const [isSyncing, setIsSyncing] = useState(false);
  const [docData, setDocData] = useState(() => {
    try {
      const s = localStorage.getItem("zi_drive_meta_v2");
      if (s) return JSON.parse(s);
    } catch {}
    return {};
  });

  const { authStatus, userInfo, signIn, signOut } = useGoogleAuth();
  const isConnected = authStatus === "connected";

  // Simpan ke localStorage sebagai backup
  useEffect(() => {
    try {
      localStorage.setItem("zi_drive_meta_v2", JSON.stringify(docData));
    } catch {}
  }, [docData]);

  // Tarik data dari Google Drive setelah berhasil login
  useEffect(() => {
    if (isConnected) {
      setIsSyncing(true);
      fetchDocDataFromDrive().then((data) => {
        if (data) setDocData(data);
        setIsSyncing(false);
      });
    }
  }, [isConnected]);

  const calcProgress = (indicators) => {
    let t = 0,
      d = 0;
    indicators.forEach((i) =>
      i.subs.forEach((s) => {
        t++;
        if (docData[s.id]?.length > 0) d++;
      }),
    );
    return t === 0 ? 0 : Math.round((d / t) * 100);
  };

  const handleFileUpload = async (subId, e, indicator, sub) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    e.target.value = null;
    if (!isConnected) {
      alert("Silakan login ke Google terlebih dahulu.");
      return;
    }
    setUploadingIds((p) => ({ ...p, [subId]: true }));
    const newFiles = [];
    for (const file of files) {
      try {
        const r = await uploadFileToDrive(
          file,
          subId,
          activeTab,
          indicator?.title || subId,
          sub?.text || subId,
        );
        newFiles.push({
          id: r.id,
          fileName: r.name,
          fileType: file.type,
          uploadDate: new Date().toLocaleString("id-ID"),
          driveFileId: r.id,
          webViewLink: r.webViewLink,
          webContentLink: r.webContentLink,
        });
      } catch (err) {
        alert(`Gagal upload "${file.name}": ${err.message}`);
      }
    }

    if (newFiles.length) {
      let finalData;
      setDocData((p) => {
        const ex = Array.isArray(p[subId]) ? p[subId] : [];
        finalData = { ...p, [subId]: [...ex, ...newFiles] };
        return finalData;
      });
      // Sinkronkan ke Drive secara background
      setIsSyncing(true);
      saveDocDataToDrive(finalData).then(() => setIsSyncing(false));
    }

    setUploadingIds((p) => ({ ...p, [subId]: false }));
  };

  const handleDelete = async (subId, file) => {
    if (!confirm(`Hapus "${file.fileName}" dari Drive?`)) return;
    try {
      await deleteFileFromDrive(file.driveFileId);
    } catch {}

    let finalData;
    setDocData((p) => {
      const u = (p[subId] || []).filter((f) => f.id !== file.id);
      if (!u.length) {
        const n = { ...p };
        delete n[subId];
        finalData = n;
        return n;
      }
      finalData = { ...p, [subId]: u };
      return finalData;
    });

    // Sinkronkan ke Drive secara background
    setIsSyncing(true);
    saveDocDataToDrive(finalData).then(() => setIsSyncing(false));
  };

  const resetData = () => {
    if (
      !confirm(
        "Reset semua data tracking? Tindakan ini akan mengosongkan metadata (File di Drive tidak ikut terhapus)",
      )
    )
      return;
    setDocData({});
    localStorage.removeItem("zi_drive_meta_v2");
    if (isConnected) {
      setIsSyncing(true);
      saveDocDataToDrive({}).then(() => setIsSyncing(false));
    }
  };

  const now = new Date();
  const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const BULAN_FULL = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const twNum = Math.ceil((now.getMonth() + 1) / 3);
  const twMap = { 1: "Jan–Mar", 2: "Apr–Jun", 3: "Jul–Sep", 4: "Okt–Des" };

  const totalSubs = ZI_DATA[activeTab].pillars.reduce(
    (a, p) => a + p.indicators.reduce((b, i) => b + i.subs.length, 0),
    0,
  );
  const doneSubs = ZI_DATA[activeTab].pillars.reduce(
    (a, p) =>
      a +
      p.indicators.reduce(
        (b, i) => b + i.subs.filter((s) => docData[s.id]?.length > 0).length,
        0,
      ),
    0,
  );
  const totalPct =
    totalSubs === 0 ? 0 : Math.round((doneSubs / totalSubs) * 100);
  const pillarData = ZI_DATA[activeTab].pillars.map((p) => ({
    title: p.title,
    progress: calcProgress(p.indicators),
  }));

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "#f1f5f9",
        fontFamily: "'DM Sans','Segoe UI',sans-serif",
        color: "#0f172a",
      }}
    >
      {/* ── KALENDER & TRIWULAN ── */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#1e3a8a 0%,#1d4ed8 60%,#2563eb 100%)",
          flexShrink: 0,
          padding: "10px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 12,
              padding: "8px 20px",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                {HARI[now.getDay()]}
              </div>
              <div
                style={{
                  color: "#fff",
                  fontSize: 34,
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: -1,
                }}
              >
                {now.getDate()}
              </div>
            </div>
            <div
              style={{
                width: 1,
                height: 42,
                background: "rgba(255,255,255,0.2)",
              }}
            />
            <div>
              <div style={{ color: "#fff", fontSize: 15, fontWeight: 700 }}>
                {BULAN_FULL[now.getMonth()]}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                {now.getFullYear()}
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              marginRight: 4,
            }}
          >
            Triwulan
          </span>
          {[1, 2, 3, 4].map((tw) => (
            <div
              key={tw}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "7px 15px",
                borderRadius: 10,
                border:
                  tw === twNum
                    ? "1.5px solid #fff"
                    : "1px solid rgba(255,255,255,0.18)",
                background: tw === twNum ? "#fff" : "rgba(255,255,255,0.08)",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: tw === twNum ? "#1d4ed8" : "rgba(255,255,255,0.5)",
                  letterSpacing: 0.3,
                }}
              >
                TW {tw}
              </span>
              <span
                style={{
                  fontSize: 9,
                  color: tw === twNum ? "#3b82f6" : "rgba(255,255,255,0.35)",
                  fontWeight: 500,
                }}
              >
                {twMap[tw]}
              </span>
            </div>
          ))}
          <div
            style={{
              marginLeft: 4,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 10,
              padding: "7px 15px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: 1,
              }}
            >
              TAHUN
            </div>
            <div style={{ color: "#fff", fontSize: 15, fontWeight: 800 }}>
              {now.getFullYear()}
            </div>
          </div>
        </div>
      </div>

      {/* ── TOPBAR ── */}
      <header
        style={{
          background: "#0f172a",
          height: 50,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          paddingInline: 24,
          zIndex: 50,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            paddingRight: 18,
            borderRight: "1px solid rgba(255,255,255,0.08)",
            marginRight: 18,
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 7,
              background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Shield size={14} color="#60a5fa" />
          </div>
          <div>
            <div
              style={{
                color: "#f1f5f9",
                fontSize: 13,
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              AZIAPP
            </div>
            <div style={{ color: "#475569", fontSize: 9, letterSpacing: 1.2 }}>
              ZONA INTEGRITAS 2026
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 2, flex: 1 }}>
          {["A", "B"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setExpandedPillar(null);
                setExpandedIndicator(null);
              }}
              style={{
                padding: "0 18px",
                height: 36,
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                transition: "all 0.15s",
                background:
                  activeTab === tab ? "rgba(255,255,255,0.08)" : "transparent",
                color: activeTab === tab ? "#f1f5f9" : "#64748b",
                borderBottom:
                  activeTab === tab
                    ? "2px solid #3b82f6"
                    : "2px solid transparent",
                fontFamily: "inherit",
              }}
            >
              {tab === "A" ? "A · Pemenuhan" : "B · Reform"}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {isConnected ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(5,150,105,0.1)",
                  border: "1px solid rgba(5,150,105,0.2)",
                  borderRadius: 6,
                  padding: "4px 10px",
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#10b981",
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    color: "#34d399",
                    fontWeight: 600,
                    maxWidth: 120,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {userInfo?.name || "Terhubung"}
                </span>
              </div>
              <button
                onClick={signOut}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "4px 10px",
                  borderRadius: 6,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "transparent",
                  color: "#94a3b8",
                  fontSize: 11,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <LogOut size={11} /> Keluar
              </button>
            </>
          ) : (
            <button
              onClick={signIn}
              disabled={authStatus === "loading"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 14px",
                borderRadius: 6,
                border: "1px solid rgba(59,130,246,0.35)",
                background: "rgba(59,130,246,0.1)",
                color: "#60a5fa",
                fontWeight: 600,
                fontSize: 11,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {authStatus === "loading" ? (
                <Loader2
                  size={11}
                  style={{ animation: "spin 1s linear infinite" }}
                />
              ) : (
                <LogIn size={11} />
              )}{" "}
              Masuk Google
            </button>
          )}
          <button
            onClick={resetData}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 9px",
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "transparent",
              color: "#475569",
              fontSize: 11,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            <RefreshCw size={11} /> Reset
          </button>
        </div>
      </header>

      {/* ── BODY ── */}
      <div
        style={{ display: "flex", flex: 1, overflow: "hidden", minHeight: 0 }}
      >
        {/* ── SIDEBAR ── */}
        <aside
          style={{
            width: 260,
            flexShrink: 0,
            background: "#1e293b",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRight: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {!isConnected && (
            <div
              style={{
                padding: "8px 14px",
                background: "rgba(217,119,6,0.07)",
                borderBottom: "1px solid rgba(217,119,6,0.15)",
                display: "flex",
                gap: 6,
                alignItems: "center",
              }}
            >
              <CloudOff size={11} color="#d97706" />
              <span
                style={{
                  fontSize: 10,
                  color: "#92400e",
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                Login untuk sinkronisasi ke Drive
              </span>
            </div>
          )}
          <div
            style={{
              padding: "14px 14px 6px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div
              style={{
                fontSize: 9,
                color: "#475569",
                fontWeight: 600,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Progres Keseluruhan
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Gauge value={totalPct} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 22,
                paddingBottom: 10,
              }}
            >
              {[
                ["Selesai", doneSubs, "#10b981"],
                ["Pending", totalSubs - doneSubs, "#475569"],
                ["Total", totalSubs, "#64748b"],
              ].map(([label, val, col]) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: col,
                      lineHeight: 1.1,
                    }}
                  >
                    {val}
                  </div>
                  <div
                    style={{
                      fontSize: 8.5,
                      color: "#334155",
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px" }}>
            <div
              style={{
                fontSize: 9,
                color: "#334155",
                fontWeight: 600,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Progres Per Pilar
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {pillarData.map((p, i) => {
                const ac = PILLAR_ACCENTS[i % PILLAR_ACCENTS.length];
                return (
                  <div key={i}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          color: "#94a3b8",
                          fontWeight: 500,
                          flex: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          paddingRight: 8,
                        }}
                      >
                        {p.title.replace(/^[IVX]+\. /, "")}
                      </span>
                      <span
                        style={{ fontSize: 10, fontWeight: 700, color: ac.bar }}
                      >
                        {p.progress}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: 3,
                        background: "rgba(255,255,255,0.06)",
                        borderRadius: 99,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${p.progress}%`,
                          background: ac.bar,
                          borderRadius: 99,
                          transition: "width 0.8s ease",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            style={{
              padding: "10px 14px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 10,
                color: isSyncing
                  ? "#60a5fa"
                  : isConnected
                    ? "#34d399"
                    : "#334155",
                fontWeight: 500,
              }}
            >
              {isSyncing ? (
                <Loader2
                  size={11}
                  style={{ animation: "spin 1s linear infinite" }}
                />
              ) : isConnected ? (
                <FolderSync size={11} />
              ) : (
                <CloudOff size={11} />
              )}
              {isSyncing
                ? "Sinkronisasi data..."
                : isConnected
                  ? "Tersinkron dengan Drive"
                  : "Belum terhubung"}
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "18px 22px",
            minWidth: 0,
          }}
        >
          <div
            style={{
              marginBottom: 14,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                {activeTab === "A" ? "A. Pemenuhan" : "B. Reform"} — Bukti
                Dukung Zona Integritas
              </h2>
              <p style={{ margin: "3px 0 0", fontSize: 11, color: "#64748b" }}>
                Unggah dokumen untuk setiap sub-indikator penilaian WBK/WBBM
              </p>
            </div>
            <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>
              {doneSubs}/{totalSubs} sub-indikator
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {ZI_DATA[activeTab].pillars.map((pillar, index) => {
              const ac = PILLAR_ACCENTS[index % PILLAR_ACCENTS.length];
              const isPillarOpen = expandedPillar === pillar.id;
              const pillarPct = calcProgress(pillar.indicators);
              const pillarDone = pillar.indicators.reduce(
                (a, i) =>
                  a + i.subs.filter((s) => docData[s.id]?.length > 0).length,
                0,
              );
              const pillarTotal = pillar.indicators.reduce(
                (a, i) => a + i.subs.length,
                0,
              );
              return (
                <div
                  key={pillar.id}
                  style={{
                    background: "#fff",
                    borderRadius: 10,
                    border: `1px solid ${isPillarOpen ? ac.color + "55" : "#e2e8f0"}`,
                    overflow: "hidden",
                    boxShadow: isPillarOpen
                      ? `0 4px 20px ${ac.color}10`
                      : "0 1px 3px rgba(0,0,0,0.05)",
                    transition: "all 0.2s",
                  }}
                >
                  <div
                    onClick={() =>
                      setExpandedPillar(isPillarOpen ? null : pillar.id)
                    }
                    style={{
                      padding: "12px 18px",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      background: isPillarOpen ? ac.light : "#fff",
                      borderLeft: `3px solid ${isPillarOpen ? ac.color : "transparent"}`,
                      transition: "all 0.2s",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 11,
                      }}
                    >
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 8,
                          flexShrink: 0,
                          background: isPillarOpen ? ac.color : "#f8fafc",
                          border: `1px solid ${isPillarOpen ? "transparent" : "#e2e8f0"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.2s",
                        }}
                      >
                        {isPillarOpen ? (
                          <ChevronDown size={14} color="#fff" />
                        ) : (
                          <ChevronRight size={14} color="#94a3b8" />
                        )}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: isPillarOpen ? ac.text : "#0f172a",
                          }}
                        >
                          {pillar.title}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color: "#94a3b8",
                            marginTop: 1,
                          }}
                        >
                          {pillar.indicators.length} indikator · {pillarDone}/
                          {pillarTotal} sub-indikator
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        flexShrink: 0,
                      }}
                    >
                      {pillarPct === 100 && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: 10,
                            color: "#059669",
                            fontWeight: 600,
                            background: "#ecfdf5",
                            border: "1px solid #a7f3d0",
                            borderRadius: 5,
                            padding: "2px 8px",
                          }}
                        >
                          <CheckCircle2 size={11} /> Lengkap
                        </div>
                      )}
                      <div
                        style={{
                          width: 72,
                          height: 4,
                          background: "#f1f5f9",
                          borderRadius: 99,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${pillarPct}%`,
                            height: "100%",
                            background: ac.bar,
                            borderRadius: 99,
                            transition: "width 0.6s",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: ac.color,
                          minWidth: 30,
                          textAlign: "right",
                        }}
                      >
                        {pillarPct}%
                      </span>
                    </div>
                  </div>
                  {isPillarOpen && (
                    <div
                      style={{
                        padding: "6px 14px 14px",
                        background: "#fafafa",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 5,
                        }}
                      >
                        {pillar.indicators.map((indicator) => {
                          const isIndOpen = expandedIndicator === indicator.id;
                          const indDone = indicator.subs.filter(
                            (s) => docData[s.id]?.length > 0,
                          ).length;
                          const indTotal = indicator.subs.length;
                          const allDone = indDone === indTotal;
                          return (
                            <div
                              key={indicator.id}
                              style={{
                                background: "#fff",
                                border: `1px solid ${isIndOpen ? ac.color + "45" : "#e9edf2"}`,
                                borderRadius: 8,
                                overflow: "hidden",
                              }}
                            >
                              <div
                                onClick={() =>
                                  setExpandedIndicator(
                                    isIndOpen ? null : indicator.id,
                                  )
                                }
                                style={{
                                  padding: "9px 14px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  cursor: "pointer",
                                  background: isIndOpen
                                    ? ac.light + "70"
                                    : "#fff",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 7,
                                  }}
                                >
                                  {isIndOpen ? (
                                    <ChevronDown size={13} color={ac.color} />
                                  ) : (
                                    <ChevronRight size={13} color="#cbd5e1" />
                                  )}
                                  <span
                                    style={{
                                      fontSize: 12,
                                      fontWeight: 600,
                                      color: isIndOpen ? ac.text : "#1e293b",
                                    }}
                                  >
                                    {indicator.title}
                                  </span>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    flexShrink: 0,
                                  }}
                                >
                                  {allDone && (
                                    <CheckCircle2 size={13} color="#059669" />
                                  )}
                                  <span
                                    style={{
                                      fontSize: 10,
                                      color: allDone ? "#059669" : "#94a3b8",
                                      fontWeight: allDone ? 600 : 400,
                                    }}
                                  >
                                    {indDone}/{indTotal}
                                  </span>
                                </div>
                              </div>
                              {isIndOpen && (
                                <div
                                  style={{
                                    borderTop: `1px solid ${ac.border}`,
                                    padding: "8px 12px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 5,
                                  }}
                                >
                                  {indicator.subs.map((sub) => {
                                    const files = Array.isArray(docData[sub.id])
                                      ? docData[sub.id]
                                      : [];
                                    const hasFiles = files.length > 0;
                                    const uploading = !!uploadingIds[sub.id];
                                    return (
                                      <div
                                        key={sub.id}
                                        style={{
                                          background: hasFiles
                                            ? ac.light
                                            : "#fafafa",
                                          border: `1px solid ${hasFiles ? ac.border : "#e9edf2"}`,
                                          borderRadius: 8,
                                          padding: "9px 11px",
                                          display: "flex",
                                          gap: 9,
                                          alignItems: "flex-start",
                                        }}
                                      >
                                        <div
                                          style={{
                                            paddingTop: 2,
                                            flexShrink: 0,
                                          }}
                                        >
                                          {hasFiles ? (
                                            <CheckCircle2
                                              size={14}
                                              color={ac.color}
                                            />
                                          ) : (
                                            <div
                                              style={{
                                                width: 14,
                                                height: 14,
                                                borderRadius: "50%",
                                                border: "1.5px solid #cbd5e1",
                                              }}
                                            />
                                          )}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                          <p
                                            style={{
                                              margin: "0 0 6px",
                                              fontSize: 11,
                                              color: "#374151",
                                              lineHeight: 1.55,
                                              fontWeight: 500,
                                            }}
                                          >
                                            {sub.text}
                                          </p>
                                          {uploading && (
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 5,
                                                fontSize: 10,
                                                color: ac.color,
                                                fontWeight: 600,
                                                marginBottom: 5,
                                              }}
                                            >
                                              <Loader2
                                                size={10}
                                                style={{
                                                  animation:
                                                    "spin 1s linear infinite",
                                                }}
                                              />{" "}
                                              Mengunggah ke Google Drive...
                                            </div>
                                          )}
                                          {hasFiles ? (
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 4,
                                              }}
                                            >
                                              {files.map((file) => (
                                                <div
                                                  key={file.id}
                                                  style={{
                                                    background: "#fff",
                                                    borderRadius: 6,
                                                    padding: "5px 8px",
                                                    border: `1px solid ${ac.border}`,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:
                                                      "space-between",
                                                    gap: 8,
                                                  }}
                                                >
                                                  <div
                                                    style={{
                                                      display: "flex",
                                                      alignItems: "center",
                                                      gap: 7,
                                                      overflow: "hidden",
                                                    }}
                                                  >
                                                    <div
                                                      style={{
                                                        width: 22,
                                                        height: 22,
                                                        borderRadius: 5,
                                                        background: ac.light,
                                                        border: `1px solid ${ac.border}`,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent:
                                                          "center",
                                                        flexShrink: 0,
                                                      }}
                                                    >
                                                      <Cloud
                                                        size={11}
                                                        color={ac.color}
                                                      />
                                                    </div>
                                                    <div
                                                      style={{
                                                        overflow: "hidden",
                                                      }}
                                                    >
                                                      <div
                                                        style={{
                                                          fontSize: 11,
                                                          fontWeight: 600,
                                                          color: "#0f172a",
                                                          overflow: "hidden",
                                                          textOverflow:
                                                            "ellipsis",
                                                          whiteSpace: "nowrap",
                                                        }}
                                                      >
                                                        {file.fileName}
                                                      </div>
                                                      <div
                                                        style={{
                                                          fontSize: 9,
                                                          color: "#94a3b8",
                                                        }}
                                                      >
                                                        {file.uploadDate}
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div
                                                    style={{
                                                      display: "flex",
                                                      gap: 2,
                                                      flexShrink: 0,
                                                    }}
                                                  >
                                                    <button
                                                      onClick={() =>
                                                        file.webViewLink &&
                                                        window.open(
                                                          file.webViewLink,
                                                          "_blank",
                                                        )
                                                      }
                                                      title="Buka di Drive"
                                                      style={{
                                                        width: 24,
                                                        height: 24,
                                                        borderRadius: 5,
                                                        border: "none",
                                                        background: "#eff6ff",
                                                        color: "#1d4ed8",
                                                        cursor: "pointer",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent:
                                                          "center",
                                                      }}
                                                    >
                                                      <FolderOpen size={11} />
                                                    </button>
                                                    <button
                                                      onClick={() =>
                                                        file.webContentLink &&
                                                        window.open(
                                                          file.webContentLink,
                                                          "_blank",
                                                        )
                                                      }
                                                      title="Unduh"
                                                      style={{
                                                        width: 24,
                                                        height: 24,
                                                        borderRadius: 5,
                                                        border: "none",
                                                        background: "#f5f3ff",
                                                        color: "#6d28d9",
                                                        cursor: "pointer",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent:
                                                          "center",
                                                      }}
                                                    >
                                                      <Download size={11} />
                                                    </button>
                                                    <button
                                                      onClick={() =>
                                                        handleDelete(
                                                          sub.id,
                                                          file,
                                                        )
                                                      }
                                                      title="Hapus"
                                                      style={{
                                                        width: 24,
                                                        height: 24,
                                                        borderRadius: 5,
                                                        border: "none",
                                                        background: "#fff1f2",
                                                        color: "#be123c",
                                                        cursor: "pointer",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent:
                                                          "center",
                                                      }}
                                                    >
                                                      <Trash2 size={11} />
                                                    </button>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          ) : !uploading ? (
                                            <span
                                              style={{
                                                fontSize: 10,
                                                color: "#cbd5e1",
                                                fontWeight: 500,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 4,
                                              }}
                                            >
                                              <XCircle
                                                size={10}
                                                color="#e2e8f0"
                                              />{" "}
                                              Belum ada dokumen
                                            </span>
                                          ) : null}
                                        </div>
                                        <label
                                          style={{
                                            flexShrink: 0,
                                            cursor: uploading
                                              ? "not-allowed"
                                              : "pointer",
                                          }}
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              gap: 5,
                                              padding: "5px 11px",
                                              borderRadius: 7,
                                              fontSize: 11,
                                              fontWeight: 600,
                                              whiteSpace: "nowrap",
                                              ...(uploading
                                                ? {
                                                    background: "#f8fafc",
                                                    color: "#cbd5e1",
                                                    border: "1px solid #e2e8f0",
                                                  }
                                                : hasFiles
                                                  ? {
                                                      background: "transparent",
                                                      color: ac.color,
                                                      border: `1px solid ${ac.border}`,
                                                    }
                                                  : {
                                                      background: ac.color,
                                                      color: "#fff",
                                                      boxShadow: `0 2px 8px ${ac.color}28`,
                                                    }),
                                            }}
                                          >
                                            {uploading ? (
                                              <>
                                                <Loader2
                                                  size={10}
                                                  style={{
                                                    animation:
                                                      "spin 1s linear infinite",
                                                  }}
                                                />{" "}
                                                Mengunggah
                                              </>
                                            ) : hasFiles ? (
                                              <>
                                                <Upload size={10} /> Tambah
                                              </>
                                            ) : (
                                              <>
                                                <Upload size={10} /> Unggah
                                              </>
                                            )}
                                          </div>
                                          <input
                                            type="file"
                                            style={{ display: "none" }}
                                            multiple
                                            disabled={uploading || !isConnected}
                                            onChange={(e) =>
                                              handleFileUpload(
                                                sub.id,
                                                e,
                                                indicator,
                                                sub,
                                              )
                                            }
                                            accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                                          />
                                        </label>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </main>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
      `}</style>
    </div>
  );
}
