import React from 'react';
import { X, Download, CreditCard, User, MapPin, Hash } from 'lucide-react';

interface QRISModalProps {
  isOpen: boolean;
  onClose: () => void;
  warga: {
    id: number;
    nama: string;
    alamat: string;
    nominal: number;
    qrCodeUrl: string;
  } | null;
}

const QRISModal: React.FC<QRISModalProps> = ({ isOpen, onClose, warga }) => {
  if (!isOpen || !warga) return null;

  const transactionId = `TRX${Date.now().toString().slice(-8)}${warga.id.toString().padStart(3, '0')}`;

  const downloadQR = async () => {
    try {
      const response = await fetch(warga.qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `QRIS_${warga.nama.replace(/\s+/g, '_')}_${transactionId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading QR code:', error);
      alert('Gagal mengunduh QR Code. Silakan coba lagi.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Pembayaran QRIS</h2>
                <p className="text-emerald-100 text-sm">Scan untuk membayar</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Warga Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Nama Warga</p>
                  <p className="font-semibold text-gray-900">{warga.nama}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Alamat</p>
                  <p className="font-medium text-gray-900">{warga.alamat}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Hash className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">ID Transaksi</p>
                  <p className="font-mono text-sm font-medium text-gray-900">{transactionId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Nominal */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-1">Total Pembayaran</p>
            <p className="text-3xl font-bold text-emerald-600">
              Rp {warga.nominal.toLocaleString('id-ID')}
            </p>
          </div>

          {/* QR Code */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center mb-6">
            <div className="inline-block p-4 bg-white rounded-lg shadow-sm">
              <img
                src={warga.qrCodeUrl}
                alt={`QR Code untuk ${warga.nama}`}
                className="w-48 h-48 mx-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNTBMMTUwIDEwMEwxMDAgMTUwTDUwIDEwMEwxMDAgNTBaIiBmaWxsPSIjOUI5QjlCIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QjlCIiBmb250LXNpemU9IjEyIj5RUiBDb2RlPC90ZXh0Pgo8L3N2Zz4=';
                }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Scan QR Code dengan aplikasi pembayaran digital Anda
            </p>
          </div>

          {/* Download Button */}
          <button
            onClick={downloadQR}
            className="w-full bg-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Download QR Code</span>
          </button>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <h4 className="font-semibold text-blue-900 mb-2">Cara Pembayaran:</h4>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Buka aplikasi pembayaran digital (GoPay, OVO, DANA, dll)</li>
              <li>2. Pilih menu "Scan QR" atau "Bayar"</li>
              <li>3. Arahkan kamera ke QR Code di atas</li>
              <li>4. Konfirmasi pembayaran sesuai nominal</li>
              <li>5. Simpan bukti pembayaran</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRISModal;