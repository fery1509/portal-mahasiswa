import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import {
  Users,
  Book,
  Calendar,
  UserPlus,
  ChevronUp,
  ChevronDown,
  CheckCircle,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { courses, enrollments } = useData();
  const [showUserList, setShowUserList] = useState(false);

  // Mock data for admin dashboard
  const studentCount = 128;
  const courseCount = courses.length;
  const facultyCount = 32;
  const activeStudents = 115;

  // Mock recent students
  const recentStudents = [
    {
      id: "1",
      name: "Budi Santoso",
      programStudi: "Teknik Informatika",
      tahunMasuk: "2021",
      status: "active",
      nim: "1234567890",
      avatar:
        "https://ui-avatars.com/api/?name=Budi+Santoso&background=6366F1&color=fff",
    },
    {
      id: "2",
      name: "Siti Nurhayati",
      programStudi: "Manajemen Bisnis",
      tahunMasuk: "2022",
      status: "active",
      nim: "0987654321",
      avatar:
        "https://ui-avatars.com/api/?name=Siti+Nurhayati&background=8B5CF6&color=fff",
    },
    {
      id: "3",
      name: "Ahmad Fauzi",
      programStudi: "Teknik Elektro",
      tahunMasuk: "2023",
      status: "pending",
      nim: "5678901234",
      avatar:
        "https://ui-avatars.com/api/?name=Ahmad+Fauzi&background=4F46E5&color=fff",
    },
    {
      id: "4",
      name: "Dewi Susanti",
      programStudi: "Akuntansi",
      tahunMasuk: "2022",
      status: "active",
      nim: "3456789012",
      avatar:
        "https://ui-avatars.com/api/?name=Dewi+Susanti&background=6366F1&color=fff",
    },
    {
      id: "5",
      name: "Rahmat Hidayat",
      programStudi: "Ilmu Komunikasi",
      tahunMasuk: "2023",
      status: "pending",
      nim: "7890123456",
      avatar:
        "https://ui-avatars.com/api/?name=Rahmat+Hidayat&background=8B5CF6&color=fff",
    },
  ];

  // Mock recent actions
  const recentActions = [
    {
      id: "1",
      action: "add_student",
      user: "Admin Akademik",
      target: "Ahmad Fauzi",
      time: "2 jam yang lalu",
    },
    {
      id: "2",
      action: "update_course",
      user: "Admin Akademik",
      target: "Kecerdasan Buatan",
      time: "3 jam yang lalu",
    },
    {
      id: "3",
      action: "approve_registration",
      user: "Admin Akademik",
      target: "Dewi Susanti",
      time: "1 hari yang lalu",
    },
    {
      id: "4",
      action: "add_course",
      user: "Admin Akademik",
      target: "Data Mining",
      time: "2 hari yang lalu",
    },
  ];

  // Get action icon and color
  const getActionDetails = (action: string) => {
    switch (action) {
      case "add_student":
        return {
          icon: <UserPlus className="h-5 w-5 text-green-500" />,
          color: "bg-green-100 text-green-800",
        };
      case "update_course":
        return {
          icon: <Book className="h-5 w-5 text-blue-500" />,
          color: "bg-blue-100 text-blue-800",
        };
      case "approve_registration":
        return {
          icon: <CheckCircle className="h-5 w-5 text-purple-500" />,
          color: "bg-purple-100 text-purple-800",
        };
      case "add_course":
        return {
          icon: <Book className="h-5 w-5 text-green-500" />,
          color: "bg-green-100 text-green-800",
        };
      default:
        return {
          icon: <Calendar className="h-5 w-5 text-gray-500" />,
          color: "bg-gray-100 text-gray-800",
        };
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">
          Dashboard Admin Akademik200
        </h3>
      </div>

      {/* Welcome banner */}
      <div className="mt-6 rounded-lg bg-gradient-to-r from-kampus-primary to-kampus-secondary p-6 shadow-md text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Selamat Datang, {user?.name}!
            </h2>
            <p className="mt-1">Admin Akademik5000</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              to="/admin/students/new"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-kampus-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Tambah Mahasiswa Baru
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg hover-scale">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-indigo-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Mahasiswa
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {studentCount}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link
                to="/admin/students"
                className="font-medium text-kampus-primary hover:text-kampus-accent"
              >
                Lihat detail
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg hover-scale">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Book className="h-6 w-6 text-indigo-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Mata Kuliah
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {courseCount}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link
                to="/admin/courses"
                className="font-medium text-kampus-primary hover:text-kampus-accent"
              >
                Lihat detail
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg hover-scale">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-indigo-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Dosen
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {facultyCount}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link
                to="/admin/faculty"
                className="font-medium text-kampus-primary hover:text-kampus-accent"
              >
                Lihat detail
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg hover-scale">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Mahasiswa Aktif
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {activeStudents}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link
                to="/admin/students?status=active"
                className="font-medium text-kampus-primary hover:text-kampus-accent"
              >
                Lihat detail
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent students & activity */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="bg-white shadow rounded-lg lg:col-span-2">
          <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Mahasiswa Terbaru
            </h3>
            <div className="flex items-center">
              <label htmlFor="search" className="sr-only">
                Cari mahasiswa
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-kampus-primary focus:border-kampus-primary sm:text-sm"
                  placeholder="Cari mahasiswa"
                />
              </div>
            </div>
          </div>
          <div className="px-5 py-3">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Mahasiswa
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Program Studi
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Angkatan
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={student.avatar}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {student.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {student.nim}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {student.programStudi}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {student.tahunMasuk}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            student.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {student.status === "active" ? "Aktif" : "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-kampus-primary hover:text-kampus-accent"
                        >
                          Detail
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="px-5 py-3 bg-gray-50 text-right rounded-b-lg">
            <Link
              to="/admin/students"
              className="text-sm font-medium text-kampus-primary hover:text-kampus-accent"
            >
              Lihat semua mahasiswa
            </Link>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Aktivitas Terbaru
            </h3>
            <button
              onClick={() => setShowUserList(!showUserList)}
              className="inline-flex items-center px-2 py-1 text-sm font-medium text-kampus-primary"
            >
              {showUserList ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Sembunyikan
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Lihat Detail
                </>
              )}
            </button>
          </div>
          <div className="px-5 py-3">
            <ul className="divide-y divide-gray-200">
              {recentActions.map((action) => {
                const actionDetails = getActionDetails(action.action);

                return (
                  <li key={action.id} className="py-3">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">{actionDetails.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {action.user}{" "}
                            {action.action === "add_student"
                              ? "menambahkan mahasiswa baru"
                              : action.action === "update_course"
                              ? "memperbarui mata kuliah"
                              : action.action === "approve_registration"
                              ? "menyetujui registrasi"
                              : "menambahkan mata kuliah baru"}
                          </p>
                          <p className="text-xs text-gray-500">{action.time}</p>
                        </div>
                        <p className="text-sm text-gray-500">{action.target}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="px-5 py-3 bg-gray-50 text-right rounded-b-lg">
            <a
              href="#"
              className="text-sm font-medium text-kampus-primary hover:text-kampus-accent"
            >
              Lihat semua aktivitas
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
