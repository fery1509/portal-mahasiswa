import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { BookOpen, Calendar, CheckCircle, Clock, FileText, Award, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { 
    getStudentCourses, 
    enrollments, 
    currentTerm
  } = useData();

  // Get student data
  const studentId = user?.id as string;
  const studentCourses = getStudentCourses(studentId);
  const studentEnrollments = enrollments.filter(e => e.studentId === studentId);
  
  // Calculate statistics
  const totalCredits = studentCourses.reduce((sum, course) => sum + course.credits, 0);
  const averageAttendance = studentEnrollments.length > 0
    ? studentEnrollments.reduce((sum, enrollment) => sum + enrollment.attendancePercentage, 0) / studentEnrollments.length
    : 0;
  
  // Get upcoming courses (mock data)
  const upcomingCourses = [
    { 
      id: '1', 
      name: 'Pemrograman Web', 
      time: 'Senin, 13:00 - 15:30', 
      room: 'Lab Komputer 3'
    },
    { 
      id: '2', 
      name: 'Kecerdasan Buatan', 
      time: 'Rabu, 08:00 - 10:30', 
      room: 'Ruang 2.3'
    }
  ];

  // Get recent activity (mock data)
  const recentActivity = [
    { 
      id: '1', 
      type: 'attendance', 
      course: 'Pemrograman Web', 
      date: '2023-09-15', 
      status: 'present'
    },
    { 
      id: '2', 
      type: 'grade', 
      course: 'Struktur Data', 
      assignment: 'Tugas 3', 
      grade: 'A'
    },
    { 
      id: '3', 
      type: 'announcement', 
      title: 'Jadwal UTS', 
      date: '2023-09-12'
    }
  ];

  // Mock status for UKT payment
  const isUKTPaid = true; // This should be replaced with actual logic to check UKT payment status

  return (
    <div className="animate-fade-in">
      {/* Banner Selamat Datang */}
      <div className="rounded-xl bg-gradient-to-r from-kampus-primary to-kampus-secondary p-6 md:p-8 shadow-lg text-white flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-2xl font-bold">Selamat Datang, {user?.name}!</h2>
          <p className="mt-1 text-base md:text-lg">{user?.studentData?.programStudi} - Semester {user?.studentData?.semester}</p>
          <span className="inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold bg-emerald-500/90 text-white">Status: Aktif {isUKTPaid && <CheckCircle className="inline h-4 w-4 ml-1 text-white" />}</span>
        </div>
        <div className="mt-6 md:mt-0 text-right space-y-1">
          <div className="text-sm md:text-base font-medium">NIM: <span className="font-bold tracking-wide">{user?.studentData?.nim}</span></div>
          <div className="text-sm md:text-base font-medium">Dosen Wali: <span className="font-bold">{user?.studentData?.dosenWali}</span></div>
        </div>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-5 flex flex-col items-start border border-gray-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300 cursor-pointer">
          <div className="flex items-center mb-2"><FileText className="h-5 w-5 text-indigo-500 mr-2" /><span className="text-sm font-medium text-gray-500">Mata Kuliah Diambil</span></div>
          <div className="text-2xl font-bold text-indigo-900 ml-2">{studentCourses.length}</div>
          <div className="w-full pt-2 px-0">
            <div className="shadow-[0_4px_8px_-4px_rgba(99,102,241,0.15)] rounded-b-xl">
              <Link to="/matakuliah" className="block text-xs text-indigo-600 hover:underline px-4 py-2">Lihat detail</Link>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-5 flex flex-col items-start border border-gray-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300 cursor-pointer">
          <div className="flex items-center mb-2"><BarChart2 className="h-5 w-5 text-purple-500 mr-2" /><span className="text-sm font-medium text-gray-500">Total SKS</span></div>
          <div className="text-2xl font-bold text-indigo-900 ml-2">{totalCredits}</div>
          <div className="w-full pt-2 px-0">
            <div className="shadow-[0_4px_8px_-4px_rgba(99,102,241,0.15)] rounded-b-xl">
              <Link to="/khs" className="block text-xs text-indigo-600 hover:underline px-4 py-2">Lihat KHS</Link>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-5 flex flex-col items-start border border-gray-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300 cursor-pointer">
          <div className="flex items-center mb-2"><CheckCircle className="h-5 w-5 text-emerald-500 mr-2" /><span className="text-sm font-medium text-gray-500">Rata-rata Kehadiran</span></div>
          <div className="text-2xl font-bold text-indigo-900 ml-2">{averageAttendance.toFixed(1)}%</div>
          <div className="w-full pt-2 px-0">
            <div className="shadow-[0_4px_8px_-4px_rgba(99,102,241,0.15)] rounded-b-xl">
              <Link to="/presensi" className="block text-xs text-indigo-600 hover:underline px-4 py-2">Lihat presensi</Link>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-5 flex flex-col items-start border border-gray-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300 cursor-pointer">
          <div className="flex items-center mb-2"><Award className="h-5 w-5 text-yellow-500 mr-2" /><span className="text-sm font-medium text-gray-500">IPK</span></div>
          <div className="text-2xl font-bold text-indigo-900 ml-2">3.75</div>
          <div className="w-full pt-2 px-0">
            <div className="shadow-[0_4px_8px_-4px_rgba(99,102,241,0.15)] rounded-b-xl">
              <Link to="/khs" className="block text-xs text-indigo-600 hover:underline px-4 py-2">Lihat transkrip</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Jadwal Kuliah Mendatang & Aktivitas Terbaru */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Jadwal Kuliah Mendatang */}
        <div className="bg-white rounded-xl shadow p-6 lg:col-span-2 border border-gray-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300 cursor-pointer">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">Jadwal Kuliah Mendatang</h3>
          {upcomingCourses.length > 0 ? (
            <ul className="space-y-4">
              {upcomingCourses.map((course) => (
                <li key={course.id} className="flex items-center justify-between border-b last:border-b-0 pb-3">
                  <div>
                    <div className="font-medium text-indigo-800">{course.name}</div>
                    <div className="text-sm text-gray-500">{course.time} • {course.room}</div>
                  </div>
                  <a href="#" className="inline-flex items-center px-3 py-1 border border-indigo-200 text-xs font-medium rounded-md text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors">Detail</a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Tidak ada jadwal kuliah dalam waktu dekat.</p>
          )}
        </div>
        {/* Aktivitas Terbaru */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300 cursor-pointer">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">Aktivitas Terbaru</h3>
          {recentActivity.length > 0 ? (
            <ul className="space-y-4">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="flex items-start gap-3">
                  {activity.type === 'attendance' && <CheckCircle className="h-5 w-5 text-emerald-500 mt-1" />}
                  {activity.type === 'grade' && <Award className="h-5 w-5 text-yellow-500 mt-1" />}
                  {activity.type === 'announcement' && <FileText className="h-5 w-5 text-blue-500 mt-1" />}
                  <div>
                    <div className="font-medium text-gray-900">
                      {activity.type === 'attendance' && `Presensi ${activity.course}`}
                      {activity.type === 'grade' && `Nilai ${activity.assignment}: ${activity.grade}`}
                      {activity.type === 'announcement' && activity.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {activity.type === 'attendance' && new Date(activity.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      {activity.type === 'grade' && activity.course}
                      {activity.type === 'announcement' && new Date(activity.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Tidak ada aktivitas terbaru.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
