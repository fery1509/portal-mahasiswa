import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useHoverSound } from "@/hooks/useHoverSound";
import {
  Home,
  Book,
  Calendar,
  FileText,
  User,
  Users,
  LogOut,
  Menu,
  X,
  Settings,
  BookOpen,
  GraduationCap,
} from "lucide-react";

interface SidebarProps {
  mobile: boolean;
  onCloseSidebar?: () => void;
}

const Sidebar = ({ mobile, onCloseSidebar }: SidebarProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState<string | null>(null);

  // Hook untuk suara hover dengan path yang benar
  const hoverSoundPath = "/sounds/hover-sound.mp3";
  const { playSound } = useHoverSound(hoverSoundPath);

  console.log("Loading hover sound from:", hoverSoundPath);

  // Navigation items
  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Profil", icon: User, path: "/profile" },
    { name: "Mata Kuliah", icon: BookOpen, path: "/MataKuliah" },
    { name: "Presensi", icon: Calendar, path: "/Presensi" },
    { name: "KRS", icon: FileText, path: "/KRS" },
    { name: "KHS", icon: GraduationCap, path: "/KHS" },
    
  ];

  // Fungsi untuk menjalankan suara hover
  const handleMouseEnter = () => {
    playSound();
  };

  // Toggle submenu
  const toggleSubmenu = (name: string) => {
    setOpen(open === name ? null : name);
  };

  // Check if path is active
  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    if (onCloseSidebar) {
      onCloseSidebar();
    }
  };

  return (
    <div className="h-full flex flex-col bg-kampus-primary text-white">
      {/* Sidebar header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-kampus-secondary">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/images/Poliban_logo1.png"
            alt="Poliban Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-xl font-bold">SIMAK</span>
        </Link>
        {mobile && (
          <button
            type="button"
            className="text-white hover:text-gray-200 focus:outline-none"
            onClick={onCloseSidebar}
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* User info */}
      <div className="px-4 py-4 border-b border-kampus-secondary">
        <div className="flex items-center space-x-3">
          <img
            src={
              user?.avatar ||
              `https://ui-avatars.com/api/?name=${
                user?.name || "User"
              }&background=000080&color=fff`
            }
            alt="Profile"
            className="h-10 w-10 rounded-full"
          />
          <div className="bg-transparent">
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-kampus-light">Mahasiswa</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onMouseEnter={handleMouseEnter}
            className={`
              flex items-center px-3 py-2 text-sm font-medium rounded-md group transition-colors
              ${
                isActivePath(item.path)
                  ? "bg-kampus-dark text-white"
                  : "text-kampus-light hover:bg-kampus-secondary hover:text-white"
              }
            `}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Logout button */}
      <div className="p-4 border-t border-kampus-secondary">
        <button
          onClick={handleLogout}
          onMouseEnter={handleMouseEnter}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-kampus-light rounded-md hover:bg-kampus-secondary hover:text-white transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
