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
    window.location.href = "/login";
  };

  return (
    <div className="h-full flex flex-col bg-[#000e7c] text-white">
      {/* Sidebar header */}
      <div className="flex items-center justify-between h-20 px-4 border-b border-[#000e7c] bg-[#000e7c]">
        <Link to="/admin/dashboard" className="flex items-center space-x-2">
          <img src="/images/Poliban_logo1.png" alt="Poliban Logo" className="h-10 w-10 object-contain" />
          <span className="text-xl font-bold text-white">SIMAK Admin</span>
        </Link>
      </div>
      {/* User info */}
      <div className="px-4 py-4 border-b border-[#000e7c] bg-[#000e7c]">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img src={`https://ui-avatars.com/api/?name=Admin&background=1e3269&color=fff`} alt="Profile" className="h-10 w-10 rounded-full ring-2 ring-white" />
            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div className="bg-transparent">
            <p className="font-medium text-white">Admin</p>
            <p className="text-sm text-blue-200">Administrator</p>
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
                ? "bg-blue-800 text-white shadow-lg shadow-blue-900/20"
                : "text-blue-100 hover:bg-blue-800 hover:text-white"
            }`}
          >
            <item.icon className={`mr-3 h-5 w-5 ${isActivePath(item.path) ? "text-white" : "text-blue-200"}`} />
            {item.name}
          </Link>
        ))}
      </nav>
      {/* Logout button */}
      <div className="p-4 border-t border-[#000e7c] bg-[#000e7c]">
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