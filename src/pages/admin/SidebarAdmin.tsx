import { Link, useLocation } from "react-router-dom";
import { User, Users, BookOpen, Home, LogOut } from "lucide-react";

interface SidebarAdminProps {
  mobile?: boolean;
  onCloseSidebar?: () => void;
}

const navItems = [
  { name: "Dashboard", icon: Home, path: "/admin/dashboard" },
  { name: "Data Mahasiswa", icon: User, path: "/admin/students" },
];

const SidebarAdmin = ({ mobile, onCloseSidebar }: SidebarAdminProps) => {
  const location = useLocation();
  const isActivePath = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("kampusAdmin");
    window.location.href = "/admin/login";
  };

  return (
    <div className="h-full flex flex-col bg-kampus-primary text-white">
      {/* Sidebar header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-kampus-secondary">
        <Link to="/admin/dashboard" className="flex items-center space-x-2">
          <img src="/images/logo-simak.png" alt="Logo SIMAK" className="h-10 w-10 object-contain" />
          <span className="text-xl font-bold">SIMAK Admin</span>
        </Link>
      </div>
      {/* User info */}
      <div className="px-4 py-4 border-b border-kampus-secondary">
        <div className="flex items-center space-x-3">
          <img src={`https://ui-avatars.com/api/?name=Admin&background=000080&color=fff`} alt="Profile" className="h-10 w-10 rounded-full" />
          <div className="bg-transparent">
            <p className="font-medium">Admin</p>
            <p className="text-sm text-kampus-light">Administrator</p>
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
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md group transition-colors ${isActivePath(item.path) ? "bg-kampus-dark text-white" : "text-kampus-light hover:bg-kampus-secondary hover:text-white"}`}
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
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-kampus-light rounded-md hover:bg-kampus-secondary hover:text-white transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SidebarAdmin; 