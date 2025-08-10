import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// Database types
export interface Warga {
  id: number
  nama: string
  alamat: string
  telepon: string
  email: string
  status: 'aktif' | 'non-aktif'
  jumlah_anggota: number
  pekerjaan: string
  tanggal_daftar: string
  created_at: string
  updated_at: string
}

export interface Iuran {
  id: number
  warga_id: number
  bulan: string
  tahun: number
  jenis: 'bulanan' | 'sampah'
  jumlah: number
  status: 'lunas' | 'belum'
  tanggal_bayar?: string
  created_at: string
  updated_at: string
}

export interface Berita {
  id: number
  title: string
  content: string
  summary: string
  type: 'berita' | 'pengumuman'
  author: string
  published_at: string
  created_at: string
  updated_at: string
}

export interface ChatMessage {
  id: number
  user_name: string
  message: string
  created_at: string
}

export interface Pengumuman {
  id: number
  title: string
  content: string
  priority: 'low' | 'medium' | 'high'
  active: boolean
  created_at: string
  updated_at: string
}