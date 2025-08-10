import React, { useState } from 'react'
import { Bell, X, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react'
import { useRealtimePengumuman } from '../hooks/useRealtime'
import type { Pengumuman } from '../lib/supabase'

const NotificationPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [readNotifications, setReadNotifications] = useState<Set<number>>(new Set())
  const { data: pengumumanList } = useRealtimePengumuman()
  
  const activePengumuman = pengumumanList.filter((p: Pengumuman) => p.active)
  const unreadPengumuman = activePengumuman.filter(p => !readNotifications.has(p.id))
  const unreadCount = unreadPengumuman.length

  const markAsRead = (id: number) => {
    setReadNotifications(prev => new Set([...prev, id]))
  }

  const markAllAsRead = () => {
    const allIds = activePengumuman.map(p => p.id)
    setReadNotifications(new Set(allIds))
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'medium':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      default:
        return <Info className="w-4 h-4 text-blue-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50'
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50'
      default:
        return 'border-l-blue-500 bg-blue-50'
    }
  }

  return (
    <>
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-24 right-4 z-50 bg-white shadow-lg border border-gray-200 p-3 rounded-full hover:bg-gray-50 transition-colors"
      >
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </div>
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="fixed top-20 right-4 z-50 w-80 max-h-96 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <h3 className="font-semibold">Notifikasi</h3>
              </div>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-emerald-100 hover:text-white text-xs underline"
                  >
                    Tandai Semua Dibaca
                  </button>
                )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-emerald-100 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              </div>
            </div>
            {unreadCount > 0 && (
              <p className="text-emerald-100 text-sm mt-1">
                {unreadCount} pengumuman belum dibaca
              </p>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {activePengumuman.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <CheckCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p>Tidak ada pengumuman aktif</p>
              </div>
            ) : unreadCount === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <CheckCircle className="w-12 h-12 text-green-300 mx-auto mb-3" />
                <p>Semua pengumuman sudah dibaca</p>
                <button
                  onClick={() => setReadNotifications(new Set())}
                  className="mt-2 text-emerald-600 hover:text-emerald-700 text-sm underline"
                >
                  Reset Status Baca
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {activePengumuman.map((pengumuman: Pengumuman) => (
                  <div
                    key={pengumuman.id}
                    className={`p-4 border-l-4 ${getPriorityColor(pengumuman.priority)} hover:bg-gray-50 transition-colors cursor-pointer ${
                      readNotifications.has(pengumuman.id) ? 'opacity-60' : ''
                    }`}
                    onClick={() => markAsRead(pengumuman.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getPriorityIcon(pengumuman.priority)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`text-sm font-semibold ${
                            readNotifications.has(pengumuman.id) ? 'text-gray-500' : 'text-gray-900'
                          }`}>
                            {pengumuman.title}
                          </h4>
                          {!readNotifications.has(pengumuman.id) && (
                            <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                          )}
                        </div>
                        <p className={`text-sm line-clamp-2 ${
                          readNotifications.has(pengumuman.id) ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {pengumuman.title}
                          {pengumuman.content}
                        </p>
                        <p className={`text-xs mt-2 ${
                          readNotifications.has(pengumuman.id) ? 'text-gray-300' : 'text-gray-400'
                        }`}>
                          {new Date(pengumuman.created_at).toLocaleString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                          {readNotifications.has(pengumuman.id) && (
                            <span className="ml-2 text-green-500">✓ Dibaca</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {activePengumuman.length > 0 && (
            <div className="p-3 bg-gray-50 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {activePengumuman.length - unreadCount} dari {activePengumuman.length} dibaca
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default NotificationPanel