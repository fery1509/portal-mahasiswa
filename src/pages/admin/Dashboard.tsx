import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, GraduationCap, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SidebarAdmin from "./SidebarAdmin";
import HeaderAdmin from "./HeaderAdmin";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <SidebarAdmin />
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 flex md:hidden ${sidebarOpen ? 'visible' : 'invisible'}`}>
        <div className={`fixed inset-0 bg-gradient-to-br from-gray-600 to-gray-800 ${sidebarOpen ? 'opacity-75' : 'opacity-0'} transition-opacity duration-300 ease-linear`} onClick={() => setSidebarOpen(false)} />
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
              <h3 className="text-3xl font-bold leading-tight text-gray-800">Welcome to SIMAK Admin</h3>
              <p className="mt-1 text-sm text-gray-600">Selamat datang di sistem administrasi akademik.</p>
            </div>

            {/* Banner */}
            <div className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white flex flex-col md:flex-row items-center justify-between">
              <div className="space-y-2">
                <h4 className="text-xl font-bold">Ringkasan Tugas Admin</h4>
                <p className="text-indigo-100 text-sm">Berikut adalah beberapa tugas utama yang dapat Anda lakukan di sini:</p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-wrap gap-3 justify-center">
                <a href="/admin/add-student" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                  Tambah Mahasiswa Baru
                </a>
                <a href="/admin/students" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-purple-700 bg-purple-50 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">
                  Kelola Data Mahasiswa
                </a>
              </div>
            </div>

            {/* Statistik */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl">
              {stats.map((stat, index) => (
                <Card
                  key={stat.label}
                  className={`
                    hover:shadow-lg transition-all duration-200 hover:scale-[1.02] p-6 rounded-xl border-b-4
                    bg-white border-purple-300 shadow-sm
                  `}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-indigo-600">
                      {stat.label}
                    </CardTitle>
                    <stat.icon className="h-5 w-5 text-indigo-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-indigo-900">{stat.value}</div>
                    <div className="flex items-center mt-1">
                      <span className={`text-sm font-medium ${stat.changeType === 'increase' ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-indigo-600/70 ml-2">{stat.description}</span>
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
