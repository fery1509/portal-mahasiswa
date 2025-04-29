
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Filter, Edit, Trash2, Eye, ChevronLeft, ChevronRight, 
  Plus, Download
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock course data
const MOCK_COURSES = [
  {
    id: '1',
    kode: 'TI2101',
    name: 'Algoritma dan Struktur Data',
    sks: 3,
    kategori: 'Wajib',
    programStudi: 'Teknik Informatika',
    semester: 3,
    status: 'active',
    dosen: 'Dr. Hendro Wijaya, M.Kom'
  },
  {
    id: '2',
    kode: 'TI3201',
    name: 'Pemrograman Web',
    sks: 3,
    kategori: 'Wajib',
    programStudi: 'Teknik Informatika',
    semester: 5,
    status: 'active',
    dosen: 'Dr. Rina Sari, M.Kom'
  },
  {
    id: '3',
    kode: 'TI4102',
    name: 'Kecerdasan Buatan',
    sks: 3,
    kategori: 'Wajib',
    programStudi: 'Teknik Informatika',
    semester: 5,
    status: 'active',
    dosen: 'Prof. Bambang Suryanto, Ph.D'
  },
  {
    id: '4',
    kode: 'TI3105',
    name: 'Basis Data Lanjut',
    sks: 3,
    kategori: 'Wajib',
    programStudi: 'Teknik Informatika',
    semester: 5,
    status: 'active',
    dosen: 'Dr. Fajar Sidik, M.Kom'
  },
  {
    id: '5',
    kode: 'MB2101',
    name: 'Manajemen Pemasaran',
    sks: 3,
    kategori: 'Wajib',
    programStudi: 'Manajemen Bisnis',
    semester: 3,
    status: 'active',
    dosen: 'Dr. Amalia Putri, M.M'
  },
  {
    id: '6',
    kode: 'MB3102',
    name: 'Keuangan Bisnis',
    sks: 3,
    kategori: 'Wajib',
    programStudi: 'Manajemen Bisnis',
    semester: 5,
    status: 'active',
    dosen: 'Prof. Hendra Gunawan, Ph.D'
  },
  {
    id: '7',
    kode: 'TE2103',
    name: 'Rangkaian Listrik',
    sks: 4,
    kategori: 'Wajib',
    programStudi: 'Teknik Elektro',
    semester: 3,
    status: 'active',
    dosen: 'Prof. Anton Supriadi, Ph.D'
  },
  {
    id: '8',
    kode: 'AK2101',
    name: 'Akuntansi Keuangan',
    sks: 3,
    kategori: 'Wajib',
    programStudi: 'Akuntansi',
    semester: 3,
    status: 'active',
    dosen: 'Dr. Ratna Dewi, M.Ak'
  }
];

// Program studi options
const programStudiOptions = [
  'Semua Program Studi',
  'Teknik Informatika',
  'Manajemen Bisnis',
  'Teknik Elektro',
  'Akuntansi',
  'Ilmu Komunikasi',
  'Hukum',
  'Teknik Sipil',
  'Desain Grafis'
];

// Semester options
const semesterOptions = [
  'Semua Semester',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8'
];

// Status options
const statusOptions = [
  'Semua Status',
  'Aktif',
  'Nonaktif'
];

const AdminCourses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProdi, setSelectedProdi] = useState(programStudiOptions[0]);
  const [selectedSemester, setSelectedSemester] = useState(semesterOptions[0]);
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

  // Filter courses
  const filteredCourses = MOCK_COURSES.filter(course => {
    const matchesSearch = 
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.kode.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesProdi = 
      selectedProdi === 'Semua Program Studi' || 
      course.programStudi === selectedProdi;
    
    const matchesSemester = 
      selectedSemester === 'Semua Semester' || 
      course.semester.toString() === selectedSemester;
    
    const matchesStatus = 
      selectedStatus === 'Semua Status' || 
      (selectedStatus === 'Aktif' && course.status === 'active') ||
      (selectedStatus === 'Nonaktif' && course.status === 'inactive');
    
    return matchesSearch && matchesProdi && matchesSemester && matchesStatus;
  });

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  // Handle delete confirmation
  const confirmDelete = (courseId: string) => {
    setCourseToDelete(courseId);
    setIsDeleteModalOpen(true);
  };

  // Handle delete operation
  const handleDelete = () => {
    // In a real app, this would be an API call
    console.log(`Deleting course: ${courseToDelete}`);
    setIsDeleteModalOpen(false);
    setCourseToDelete(null);
  };

  return (
    <div className="animate-fade-in">
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">Daftar Mata Kuliah</h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <Button variant="default" className="bg-kampus-primary hover:bg-kampus-accent">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Mata Kuliah
          </Button>
        </div>
      </div>

      {/* Search and filters */}
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
              placeholder="Cari berdasarkan nama atau kode"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-3 sm:mt-0 sm:ml-4">
          <Button 
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Filter options */}
      {showFilters && (
        <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-x-4">
          <div>
            <label htmlFor="prodi" className="block text-sm font-medium text-gray-700 mb-1">
              Program Studi
            </label>
            <select
              id="prodi"
              name="prodi"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-kampus-primary focus:border-kampus-primary sm:text-sm rounded-md"
              value={selectedProdi}
              onChange={(e) => setSelectedProdi(e.target.value)}
            >
              {programStudiOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">
              Semester
            </label>
            <select
              id="semester"
              name="semester"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-kampus-primary focus:border-kampus-primary sm:text-sm rounded-md"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              {semesterOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-kampus-primary focus:border-kampus-primary sm:text-sm rounded-md"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Course table */}
      <div className="mt-6 overflow-hidden shadow border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kode / Nama
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKS
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Program Studi
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Semester
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dosen
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentCourses.map((course) => (
              <tr key={course.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{course.kode}</div>
                  <div className="text-sm text-gray-500">{course.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{course.sks}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{course.programStudi}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{course.semester}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{course.dosen}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex space-x-2 justify-end">
                    <Link
                      to={`/admin/courses/${course.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Eye className="h-5 w-5" />
                    </Link>
                    <Link
                      to={`/admin/courses/${course.id}/edit`}
                      className="text-amber-600 hover:text-amber-900"
                    >
                      <Edit className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => confirmDelete(course.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Sebelumnya
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Selanjutnya
          </Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Menampilkan <span className="font-medium">{startIndex + 1}</span> sampai{' '}
              <span className="font-medium">
                {Math.min(endIndex, filteredCourses.length)}
              </span>{' '}
              dari <span className="font-medium">{filteredCourses.length}</span> mata kuliah
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    page === currentPage
                      ? 'z-10 bg-kampus-primary border-kampus-primary text-white'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {isDeleteModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Trash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Hapus Mata Kuliah
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Apakah Anda yakin ingin menghapus mata kuliah ini? Tindakan ini tidak dapat dibatalkan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  className="w-full sm:ml-3 sm:w-auto"
                >
                  Hapus
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto"
                >
                  Batal
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;
