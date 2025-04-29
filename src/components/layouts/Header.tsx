
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Bell, Menu, Search } from 'lucide-react';

interface HeaderProps {
  onOpenSidebar: () => void;
}

const Header = ({ onOpenSidebar }: HeaderProps) => {
  const { user } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Mock notifications
  const notifications = [
    {
      id: '1',
      message: 'Jadwal kuliah Pemrograman Web telah diperbarui',
      time: '5 menit yang lalu',
      read: false
    },
    {
      id: '2',
      message: 'Nilai UTS Struktur Data telah dipublikasikan',
      time: '1 jam yang lalu',
      read: false
    },
    {
      id: '3',
      message: 'Pengumuman: Libur akademik 17 Agustus',
      time: 'Kemarin',
      read: true
    }
  ];

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden text-gray-500 hover:text-gray-600 focus:outline-none"
          onClick={onOpenSidebar}
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Search */}
        <div className="max-w-md w-full lg:max-w-xs ml-4 md:ml-0">
          <label htmlFor="search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-kampus-primary focus:border-kampus-primary sm:text-sm"
              placeholder="Cari..."
              type="search"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-1 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none relative"
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              )}
            </button>

            {/* Notifications dropdown */}
            {notificationsOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">Notifikasi</h3>
                  </div>
                  {notifications.length > 0 ? (
                    <div className="max-h-60 overflow-y-auto">
                      {notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                        >
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      Tidak ada notifikasi
                    </div>
                  )}
                  <div className="border-t border-gray-200 px-4 py-2">
                    <button className="text-xs text-kampus-primary hover:text-kampus-accent font-medium">
                      Lihat semua notifikasi
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile dropdown */}
          <div className="ml-3 relative">
            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full"
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=6366F1&color=fff`}
                alt="Profile"
              />
              <span className="hidden md:flex ml-2 text-sm font-medium text-gray-700">
                {user?.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
