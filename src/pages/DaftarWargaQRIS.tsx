import React, { useState } from 'react';
import { QrCode, User, MapPin, DollarSign, Search, Filter } from 'lucide-react';
import QRISModal from '../components/QRISModal';

// Data dummy warga dengan QR Code URLs yang diberikan
const dummyWargaData = [
  {
    id: 1,
    nama: 'Budi Santoso',
    alamat: 'Jl. Kalita Blok A No. 15',
    nominal: 175000, // Iuran bulanan + sampah
    qrCodeUrl: 'https://oxbalusfprtiklgarvyr.supabase.co/storage/v1/object/public/galeri/Capture1.PNG'
  },
  {
    id: 2,
    nama: 'Siti Nurhaliza',
    alamat: 'Jl. Kalita Blok B No. 8',
    nominal: 175000,
    qrCodeUrl: 'https://oxbalusfprtiklgarvyr.supabase.co/storage/v1/object/public/galeri/Capture2.PNG'
  },
  {
    id: 3,
    nama: 'Ahmad Wijaya',
    alamat: 'Jl. Kalita Blok C No. 22',
    nominal: 175000,
    qrCodeUrl: 'https://oxbalusfprtiklgarvyr.supabase.co/storage/v1/object/public/galeri/Capture1.PNG'
  },
  {
    id: 4,
    nama: 'Rina Marlina',
    alamat: 'Jl. Kalita Blok A No. 7',
    nominal: 175000,
    qrCodeUrl: 'https://oxbalusfprtiklgarvyr.supabase.co/storage/v1/object/public/galeri/Capture2.PNG'
  },
  {
    id: 5,
    nama: 'Dedi Kurniawan',
    alamat: 'Jl. Kalita Blok D No. 12',
    nominal: 175000,
    qrCodeUrl: 'https://oxbalusfprtiklgarvyr.supabase.co/storage/v1/object/public/galeri/Capture1.PNG'
  }
];

const DaftarWargaQRIS: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWarga, setSelectedWarga] = useState<typeof dummyWargaData[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter data berdasarkan pencarian
  const filteredWarga = dummyWargaData.filter(warga =>
    warga.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warga.alamat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openQRISModal = (warga: typeof dummyWargaData[0]) => {
    setSelectedWarga(warga);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWarga(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Pembayaran QRIS</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Daftar warga dan nominal tagihan iuran bulanan. Klik alamat atau tombol QR untuk 
          menampilkan QR Code pembayaran QRIS.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Warga</p>
              <p className="text-3xl font-bold text-gray-900">{dummyWargaData.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Nominal per Warga</p>
              <p className="text-3xl font-bold text-emerald-600">Rp 175K</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tagihan</p>
              <p className="text-3xl font-bold text-orange-600">
                Rp {(dummyWargaData.length * 175000).toLocaleString('id-ID')}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <QrCode className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari nama atau alamat warga..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            />
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Filter className="w-5 h-5" />
            <span className="text-sm font-medium">
              Menampilkan {filteredWarga.length} dari {dummyWargaData.length} warga
            </span>
          </div>
        </div>
      </div>

      {/* Warga Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-emerald-50 to-emerald-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800 uppercase tracking-wider">
                  Nama Warga
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800 uppercase tracking-wider">
                  Alamat
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-emerald-800 uppercase tracking-wider">
                  Nominal Tagihan
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-emerald-800 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredWarga.map((warga, index) => (
                <tr key={warga.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-emerald-600">
                        {index + 1}
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {warga.nama.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{warga.nama}</div>
                        <div className="text-sm text-gray-500">ID: {String(warga.id).padStart(3, '0')}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openQRISModal(warga)}
                      className="flex items-start space-x-2 text-left hover:text-emerald-600 transition-colors group"
                    >
                      <MapPin className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-900 group-hover:text-emerald-600 underline-offset-2 group-hover:underline">
                        {warga.alamat}
                      </span>
                    </button>
                  </td>
                  
                  <td className="px-6 py-4 text-right">
                    <div className="text-lg font-bold text-gray-900">
                      Rp {warga.nominal.toLocaleString('id-ID')}
                    </div>
                    <div className="text-xs text-gray-500">
                      Bulanan + Sampah
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => openQRISModal(warga)}
                      className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-sm hover:shadow-md"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>Tampilkan QR</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredWarga.length === 0 && (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Tidak ada data warga yang ditemukan</p>
            <p className="text-gray-400 text-sm">Coba ubah kata kunci pencarian</p>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <QrCode className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Informasi Pembayaran QRIS</h3>
            <div className="text-blue-800 space-y-1">
              <p>• Klik pada alamat warga atau tombol "Tampilkan QR" untuk membuka QR Code</p>
              <p>• QR Code dapat diunduh dalam format PNG untuk disimpan</p>
              <p>• Nominal tagihan sudah termasuk iuran bulanan (Rp 150.000) + iuran sampah (Rp 25.000)</p>
              <p>• Pembayaran dapat dilakukan melalui semua aplikasi pembayaran digital yang mendukung QRIS</p>
            </div>
          </div>
        </div>
      </div>

      {/* QRIS Modal */}
      <QRISModal
        isOpen={isModalOpen}
        onClose={closeModal}
        warga={selectedWarga}
      />
    </div>
  );
};

export default DaftarWargaQRIS;