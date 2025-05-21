import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, GraduationCap, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SidebarAdmin from "./SidebarAdmin";
import HeaderAdmin from "./HeaderAdmin";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Statistik dummy
  const stats = [
    { 
      label: "Total Mahasiswa", 
      value: 1240, 
      icon: User,
      change: "+12%",
      changeType: "increase",
      description: "Dari bulan lalu"
    },
    { 
      label: "Total Program Studi", 
      value: 20, 
      icon: GraduationCap,
      change: "+2",
      changeType: "increase",
      description: "Program studi aktif"
    },
    { 
      label: "Mahasiswa Baru", 
      value: 156, 
      icon: Users,
      change: "+8%",
      changeType: "increase",
      description: "Tahun ajaran ini"
    },
    { 
      label: "Pertumbuhan", 
      value: "12.5%", 
      icon: TrendingUp,
      change: "+2.3%",
      changeType: "increase",
      description: "Dari tahun lalu"
    },
  ];

  // Check if admin is logged in
  const checkAdminAuth = () => {
    const admin = localStorage.getItem("kampusAdmin");
    if (!admin) {
      navigate("/admin/login");
    }
  };

  useEffect(() => {
    checkAdminAuth();
  }, []);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <SidebarAdmin />
        </div>
      </div>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 flex md:hidden ${sidebarOpen ? 'visible' : 'invisible'}`}>
        <div className={`fixed inset-0 bg-gray-600 ${sidebarOpen ? 'opacity-75' : 'opacity-0'} transition-opacity duration-300 ease-linear`} onClick={() => setSidebarOpen(false)} />
        <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-kampus-primary text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition duration-300 ease-in-out`}>
          <SidebarAdmin onCloseSidebar={() => setSidebarOpen(false)} mobile />
        </div>
      </div>
      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <HeaderAdmin onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 md:px-8">
            <div className="pb-5 border-b border-gray-200 max-w-7xl">
              <h3 className="text-2xl font-bold leading-6 text-gray-900">Welcome to SIMAK Admin</h3>
              <p className="mt-2 max-w-4xl text-sm text-gray-500">Selamat datang di sistem administrasi akademik.</p>
            </div>
            {/* Statistik */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl">
              {stats.map((stat) => (
                <Card key={stat.label} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      {stat.label}
                    </CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="flex items-center mt-1">
                      <span className={`text-sm font-medium ${stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">{stat.description}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
