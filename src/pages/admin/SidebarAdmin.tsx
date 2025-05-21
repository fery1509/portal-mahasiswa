import { Link, useLocation } from "react-router-dom";
import { User, Users, BookOpen, Home, LogOut, UserPlus } from "lucide-react";

interface SidebarAdminProps {
  mobile?: boolean;
  onCloseSidebar?: () => void;
}

const navItems = [
  { name: "Dashboard", icon: Home, path: "/admin/dashboard" },
  { name: "Tambah Mahasiswa", icon: UserPlus, path: "/admin/add-student" },
  { name: "Data Mahasiswa", icon: Users, path: "/admin/students" },
];

const SidebarAdmin = ({ mobile, onCloseSidebar }: SidebarAdminProps) => {
  const location = useLocation();
  const isActivePath = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("kampusAdmin");
    window.location.href = "/admin/login";
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 text-white">
      {/* Sidebar header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-indigo-700/50 bg-gradient-to-r from-indigo-800/50 to-purple-800/50">
        <Link to="/admin/dashboard" className="flex items-center space-x-2">
          <img src="/images/Poliban_logo1.png" alt="Poliban Logo" className="h-10 w-10 object-contain" />
          <span className="text-xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">SIMAK Admin</span>
        </Link>
      </div>
      {/* User info */}
      <div className="px-4 py-4 border-b border-indigo-700/50 bg-gradient-to-r from-indigo-800/30 to-purple-800/30">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img src={`https://ui-avatars.com/api/?name=Admin&background=6366F1&color=fff`} alt="Profile" className="h-10 w-10 rounded-full ring-2 ring-indigo-400" />
            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full border-2 border-indigo-800"></div>
          </div>
          <div className="bg-transparent">
            <p className="font-medium text-white">Admin</p>
            <p className="text-sm text-indigo-200">Administrator</p>
          </div>
        </div>
      </div>
      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={onCloseSidebar}
            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              isActivePath(item.path)
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20"
                : "text-indigo-100 hover:bg-gradient-to-r hover:from-indigo-700/50 hover:to-purple-700/50 hover:text-white"
            }`}
          >
            <item.icon className={`mr-3 h-5 w-5 ${isActivePath(item.path) ? "text-indigo-200" : "text-indigo-300"}`} />
            {item.name}
          </Link>
        ))}
      </nav>
      {/* Logout button */}
      <div className="p-4 border-t border-indigo-700/50 bg-gradient-to-r from-indigo-800/30 to-purple-800/30">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-indigo-100 rounded-lg hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20 hover:text-red-200 transition-all duration-200"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SidebarAdmin; 