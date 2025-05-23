import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { BookOpen, Calendar, CheckCircle, Clock, FileText, Award } from 'lucide-react';
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
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">Dashboard Mahasiswa</h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Semester Aktif: {currentTerm.name}
        </p>
      </div>

      {/* Welcome banner */}
      <div className="mt-6 rounded-lg bg-gradient-to-r from-kampus-primary to-kampus-secondary p-6 shadow-md text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Selamat Datang, {user?.name}!</h2>
            <p className="mt-1">{user?.studentData?.programStudi} - Semester {user?.studentData?.semester}</p>
            <p className="mt-2 text-sm font-semibold flex items-center gap-1" style={{ color: isUKTPaid ? '#6ee7b7' : '#fca5a5' }}>
              Status: {isUKTPaid ? 'Aktif' : 'Tidak Aktif'}
              {isUKTPaid && <CheckCircle className="inline h-4 w-4 text-emerald-400 ml-1" />}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm">NIM: {user?.studentData?.nim}</p>
            <p className="text-sm mt-1">Dosen Wali: {user?.studentData?.dosenWali}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg hover-scale">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BookOpen className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Mata Kuliah Diambil
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {studentCourses.length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/matakuliah" className="font-medium text-kampus-primary hover:text-kampus-accent">
                Lihat detail
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg hover-scale">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total SKS
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {totalCredits}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/khs" className="font-medium text-kampus-primary hover:text-kampus-accent">
                Lihat KHS
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg hover-scale">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Rata-rata Kehadiran
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {averageAttendance.toFixed(1)}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/presensi" className="font-medium text-kampus-primary hover:text-kampus-accent">
                Lihat presensi
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg hover-scale">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Award className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    IPK
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      3.75
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/khs" className="font-medium text-kampus-primary hover:text-kampus-accent">
                Lihat transkrip
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming schedule & recent activity */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="bg-white shadow rounded-lg lg:col-span-2">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Jadwal Kuliah Mendatang</h3>
          </div>
          <div className="px-5 py-3">
            {upcomingCourses.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {upcomingCourses.map((course) => (
                  <li key={course.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Clock className="h-6 w-6 text-kampus-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {course.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {course.time} • {course.room}
                        </p>
                      </div>
                      <div>
                        <a
                          href="#"
                          className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Detail
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-4 text-sm text-gray-500">Tidak ada jadwal kuliah dalam waktu dekat.</p>
            )}
          </div>
          <div className="px-5 py-3 bg-gray-50 text-right rounded-b-lg">
            <Link
              to="/matakuliah"
              className="text-sm font-medium text-kampus-primary hover:text-kampus-accent"
            >
              Lihat semua jadwal
            </Link>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Aktivitas Terbaru</h3>
          </div>
          <div className="px-5 py-3">
            {recentActivity.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="py-3">
                    {activity.type === 'attendance' && (
                      <div className="flex items-start space-x-3">
                        <Calendar className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Presensi {activity.course}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(activity.date).toLocaleDateString('id-ID', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                    )}
                    {activity.type === 'grade' && (
                      <div className="flex items-start space-x-3">
                        <Award className="h-5 w-5 text-indigo-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Nilai {activity.assignment}: {activity.grade}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.course}
                          </p>
                        </div>
                      </div>
                    )}
                    {activity.type === 'announcement' && (
                      <div className="flex items-start space-x-3">
                        <FileText className="h-5 w-5 text-amber-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {activity.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(activity.date).toLocaleDateString('id-ID', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-4 text-sm text-gray-500">Tidak ada aktivitas terbaru.</p>
            )}
          </div>
          <div className="px-5 py-3 bg-gray-50 text-right rounded-b-lg">
            <Link
              to="#"
              className="text-sm font-medium text-kampus-primary hover:text-kampus-accent"
            >
              Lihat semua aktivitas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
