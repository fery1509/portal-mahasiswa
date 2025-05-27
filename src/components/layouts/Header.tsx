import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Bell, Menu, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onOpenSidebar: () => void;
}

const Header = ({ onOpenSidebar }: HeaderProps) => {
  const { user } = useAuth();
  // Dummy notifikasi
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "Tugas",
      message: "Tugas Pemrograman Web dikumpulkan besok",
      read: false,
    },
    {
      id: 2,
      type: "Presensi",
      message: "Presensi hari ini belum dilakukan",
      read: false,
    },
    {
      id: 3,
      type: "Pengumuman",
      message: "Libur nasional minggu depan",
      read: false,
    },
  ]);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleOpen = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <>
    <header className="bg-[#000e7c] shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button
              type="button"
              className="px-4 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white md:hidden"
              onClick={onOpenSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center ml-1,5">
              <span className="text-xl font-extrabold text-white tracking-tight">Sistem Informasi Akademik</span>
            </div>
          </div>
          <div className="flex items-center">
            <DropdownMenu onOpenChange={(isOpen) => isOpen && handleOpen()}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="relative p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kampus-primary"
                  aria-label="View notifications"
                >
                  <Bell className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                  <DropdownMenuItem>Tidak ada notifikasi</DropdownMenuItem>
                ) : (
                  notifications.map((notif) => (
                    <DropdownMenuItem
                      key={notif.id}
                      className={
                        !notif.read ? "font-semibold" : "text-gray-400"
                      }
                    >
                      <div>
                        <div className="text-xs text-gray-500">
                          {notif.type}
                        </div>
                        <div>{notif.message}</div>
                      </div>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="ml-3 relative">
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src={
                    user?.avatar ||
                    `https://ui-avatars.com/api/?name=${
                      user?.name || "User"
                    }&background=6366F1&color=fff`
                  }
                  alt="Profile"
                />
                <span className="hidden md:flex ml-2 text-sm font-medium text-white">
                  {user?.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div className="w-full h-[1px] bg-gray-400" />
    </>
  );
};

export default Header;
