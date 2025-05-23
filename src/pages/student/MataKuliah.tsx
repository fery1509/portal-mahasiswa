import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import {
  Book, Calendar, Clock, User, FileText, Search, CheckCircle, XCircle, AlertCircle
} from 'lucide-react';

const MataKuliah = () => {
  const { user } = useAuth();
  const { getStudentCourses, getStudentEnrollment } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  // Get student courses
  const studentId = user?.id as string;
  const courses = getStudentCourses(studentId);
  
  // Mock schedule data
  const courseSchedules = [
    { courseId: '1', day: 'Senin', startTime: '13:00', endTime: '15:30', room: 'Lab Komputer 3' },
    { courseId: '2', day: 'Rabu', startTime: '08:00', endTime: '10:30', room: 'Ruang 2.3' },
    { courseId: '3', day: 'Kamis', startTime: '10:00', endTime: '12:30', room: 'Lab Komputer 2' },
    { courseId: '4', day: 'Jumat', startTime: '14:00', endTime: '16:30', room: 'Ruang 3.1' }
  ];

  // Filter courses based on search query and selected tab
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTab === 'all') {
      return matchesSearch;
    } else if (selectedTab === 'this-semester') {
      return matchesSearch && course.semester === user?.studentData?.semester;
    }
    
    return matchesSearch;
  });

  // Get course schedule
  const getCourseSchedule = (courseId: string) => {
    return courseSchedules.find(schedule => schedule.courseId === courseId);
  };

  // Get attendance status icon
  const getAttendanceStatusIcon = (percentage: number) => {
    if (percentage >= 80) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else if (percentage >= 60) {
      return <AlertCircle className="h-5 w-5 text-amber-500" />;
    } else {
      return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">Mata Kuliah</h3>
      </div>

      {/* Search and tabs */}
      <div className="mt-6 sm:flex sm:justify-between">
        <div className="max-w-lg w-full">
          <label htmlFor="search" className="sr-only">
            Cari mata kuliah
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="search"
              name="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-kampus-primary focus:border-kampus-primary sm:text-sm"
              placeholder="Cari mata kuliah"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-3 sm:mt-0 sm:ml-4">
          <div className="flex justify-center rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`py-2 px-4 text-sm font-medium rounded-l-md border ${
                selectedTab === 'all'
                  ? 'bg-kampus-primary text-white border-kampus-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedTab('all')}
            >
              Semua
            </button>
            <button
              type="button"
              className={`py-2 px-4 text-sm font-medium rounded-r-md border ${
                selectedTab === 'this-semester'
                  ? 'bg-kampus-primary text-white border-kampus-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedTab('this-semester')}
            >
              Semester Ini
            </button>
          </div>
        </div>
      </div>

      {/* Course list */}
      <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => {
            const enrollment = getStudentEnrollment(studentId, course.id);
            const schedule = getCourseSchedule(course.id);
            
            return (
              <div 
                key={course.id} 
                className="bg-white rounded-lg shadow overflow-hidden hover-scale"
              >
                <div className="h-2 bg-kampus-primary" />
                <div className="p-5">
                  <div className="flex justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {course.code}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {course.credits} SKS
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-gray-900">{course.name}</h3>
                  
                  <div className="mt-4 text-sm text-gray-500 space-y-2">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{course.lecturer}</span>
                    </div>
                    
                    {schedule && (
                      <>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{schedule.day}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{schedule.startTime} - {schedule.endTime}</span>
                        </div>
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{schedule.room}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {enrollment && (
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center">
                        {getAttendanceStatusIcon(enrollment.attendancePercentage)}
                        <span className="ml-2 text-sm text-gray-500">
                          Kehadiran: {enrollment.attendancePercentage}%
                        </span>
                      </div>
                      {enrollment.grade && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Nilai: {enrollment.grade}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="border-t border-gray-200 bg-gray-50 px-5 py-3 text-right">
                  <a
                    href="#"
                    className="text-sm font-medium text-kampus-primary hover:text-kampus-accent"
                  >
                    Detail Kelas
                  </a>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-10">
            <Book className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada mata kuliah</h3>
            <p className="mt-1 text-sm text-gray-500">
              Tidak ada mata kuliah yang cocok dengan filter Anda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MataKuliah;
