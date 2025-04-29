
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Filter, UserPlus, Edit, Trash2, Eye, ChevronLeft, ChevronRight, 
  Download, Upload
} from 'lucide-react';

// Mock student data
const MOCK_STUDENTS = [
  {
    id: '1',
    name: 'Budi Santoso',
    nim: '1234567890',
    programStudi: 'Teknik Informatika',
    semester: 5,
    tahunMasuk: '2021',
    dosenWali: 'Dr. Hendro Wijaya, M.Kom',
    provinsi: 'Jawa Barat',
    kabupaten: 'Bandung',
    jenisKelamin: 'L',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=6366F1&color=fff'
  },
  {
    id: '2',
    name: 'Siti Nurhayati',
    nim: '0987654321',
    programStudi: 'Manajemen Bisnis',
    semester: 3,
    tahunMasuk: '2022',
    dosenWali: 'Dr. Amalia Putri, M.M',
    provinsi: 'DKI Jakarta',
    kabupaten: 'Jakarta Selatan',
    jenisKelamin: 'P',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Siti+Nurhayati&background=8B5CF6&color=fff'
  },
  {
    id: '3',
    name: 'Ahmad Fauzi',
    nim: '5678901234',
    programStudi: 'Teknik Elektro',
    semester: 1,
    tahunMasuk: '2023',
    dosenWali: 'Prof. Anton Supriadi, Ph.D',
    provinsi: 'Jawa Timur',
    kabupaten: 'Surabaya',
    jenisKelamin: 'L',
    status: 'pending',
    avatar: 'https://ui-avatars.com/api/?name=Ahmad+Fauzi&background=4F46E5&color=fff'
  },
  {
    id: '4',
    name: 'Dewi Susanti',
    nim: '3456789012',
    programStudi: 'Akuntansi',
    semester: 3,
    tahunMasuk: '2022',
    dosenWali: 'Dr. Ratna Dewi, M.Kom',
    provinsi: 'Bali',
    kabupaten: 'Denpasar',
    jenisKelamin: 'P',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Dewi+Susanti&background=6366F1&color=fff'
  },
  {
    id: '5',
    name: 'Rahmat Hidayat',
    nim: '7890123456',
    programStudi: 'Ilmu Komunikasi',
    semester: 1,
    tahunMasuk: '2023',
    dosenWali: 'Prof. Dimas Pratama, M.M',
    provinsi: 'Sulawesi Selatan',
    kabupaten: 'Makassar',
    jenisKelamin: 'L',
    status: 'pending',
    avatar: 'https://ui-avatars.com/api/?name=Rahmat+Hidayat&background=8B5CF6&color=fff'
  },
  {
    id: '6',
    name: 'Anisa Rahmawati',
    nim: '2345678901',
    programStudi: 'Hukum',
    semester: 7,
    tahunMasuk: '2020',
    dosenWali: 'Dr. Budi Santoso, S.H., M.H.',
    provinsi: 'Jawa Tengah',
    kabupaten: 'Semarang',
    jenisKelamin: 'P',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Anisa+Rahmawati&background=4F46E5&color=fff'
  },
  {
    id: '7',
    name: 'Deni Kurniawan',
    nim: '8901234567',
    programStudi: 'Teknik Sipil',
    semester: 5,
    tahunMasuk: '2021',
    dosenWali: 'Prof. Hendri Wijaya, M.T.',
    provinsi: 'Jawa Barat',
    kabupaten: 'Bekasi',
    jenisKelamin: 'L',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Deni+Kurniawan&background=6366F1&color=fff'
  },
  {
    id: '8',
    name: 'Maya Puspita',
    nim: '4567890123',
    programStudi: 'Desain Grafis',
    semester: 3,
    tahunMasuk: '2022',
    dosenWali: 'Dr. Sinta Dewi, M.Ds.',
    provinsi: 'DKI Jakarta',
    kabupaten: 'Jakarta Timur',
    jenisKelamin: 'P',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Maya+Puspita&background=8B5CF6&color=fff'
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

// Tahun masuk options
const tahunMasukOptions = [
  'Semua Angkatan',
  '2023',
  '2022',
  '2021',
  '2020',
  '2019'
];

// Status options
const statusOptions = [
  'Semua Status',
  'Aktif',
  'Pending'
];

const AdminStudents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProdi, setSelectedProdi] = useState(programStudiOptions[0]);
  const [selectedTahun, setSelectedTahun] = useState(tahunMasukOptions[0]);
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);

  // Filter students
  const filteredStudents = MOCK_STUDENTS.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.nim.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesProdi = 
      selectedProdi === 'Semua Program Studi' || 
      student.programStudi === selectedProdi;
    
    const matchesTahun = 
      selectedTahun === 'Semua Angkatan' || 
      student.tahunMasuk === selectedTahun;
    
    const matchesStatus = 
      selectedStatus === 'Semua Status' || 
      (selectedStatus === 'Aktif' && student.status === 'active') ||
      (selectedStatus === 'Pending' && student.status === 'pending');
    
    return matchesSearch && matchesProdi && matchesTahun && matchesStatus;
  });

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  // Handle checkbox selection
  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  // Handle select all checkbox
  const toggleSelectAll = () => {
    if (selectedStudents.length === currentStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(currentStudents.map(student => student.id));
    }
  };

  // Handle delete confirmation
  const confirmDelete = (studentId: string) => {
    setStudentToDelete(studentId);
    setIsDeleteModalOpen(true);
  };

  // Handle delete operation
  const handleDelete = () => {
    // In a real app, this would be an API call
    console.log(`Deleting student: ${studentToDelete}`);
    setIsDeleteModalOpen(false);
    setStudentToDelete(null);
  };

  return (
    <div className="animate-fade-in">
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">Daftar Mahasiswa</h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <Link
            to="/admin/students/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-kampus-primary hover:bg-kampus-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kampus-primary"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Tambah Mahasiswa
          </Link>
        </div>
      </div>

      {/* Search and filters */}
      <div className="mt-6 sm:flex sm:justify-between">
        <div className="max-w-lg w-full">
          <label htmlFor="search" className="sr-only">
            Cari mahasiswa
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="search"
              name="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-kampus-primary focus:border-kampus-primary sm:text-sm"
              placeholder="Cari berdasarkan nama atau NIM"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-3 sm:mt-0 sm:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kampus-primary"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
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
            <label htmlFor="tahun" className="block text-sm font-medium text-gray-700 mb-1">
              Angkatan
            </label>
            <select
              id="tahun"
              name="tahun"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-kampus-primary focus:border-kampus-primary sm:text-sm rounded-md"
              value={selectedTahun}
              onChange={(e) => setSelectedTahun(e.target.value)}
            >
              {tahunMasukOptions.map((option) => (
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

      {/* Bulk actions */}
      {selectedStudents.length > 0 && (
        <div className="mt-4 bg-gray-50 p-4 sm:flex sm:items-center sm:justify-between rounded-md border border-gray-200">
          <div className="text-sm text-gray-700">
            {selectedStudents.length} mahasiswa dipilih
          </div>
          <div className="mt-3 sm:mt-0 flex space-x-2">
            <button
              type="button"
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Export
            </button>
            <button
              type="button"
              className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <Trash2 className="h-3.5 w-3.5 mr-1.5" />
              Hapus
            </button>
          </div>
        </div>
      )}

      {/* Student table */}
      <div className="mt-6 overflow-hidden shadow border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3">
                <div className="flex items-center">
                  <input
                    id="select-all"
                    type="checkbox"
                    className="h-4 w-4 text-kampus-primary focus:ring-kampus-primary border-gray-300 rounded"
                    checked={
                      currentStudents.length > 0 &&
                      selectedStudents.length === currentStudents.length
                    }
                    onChange={toggleSelectAll}
                  />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mahasiswa
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Program Studi
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Angkatan
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentStudents.map((student) => (
              <tr key={student.id}>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <input
                      id={`select-${student.id}`}
                      type="checkbox"
                      className="h-4 w-4 text-kampus-primary focus:ring-kampus-primary border-gray-300 rounded"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => toggleStudentSelection(student.id)}
                    />
                  </div>
                </td>
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
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.nim}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.programStudi}</div>
                  <div className="text-sm text-gray-500">Semester {student.semester}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.tahunMasuk}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    student.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {student.status === 'active' ? 'Aktif' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex space-x-2 justify-end">
                    <Link
                      to={`/admin/students/${student.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Eye className="h-5 w-5" />
                    </Link>
                    <Link
                      to={`/admin/students/${student.id}/edit`}
                      className="text-amber-600 hover:text-amber-900"
                    >
                      <Edit className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => confirmDelete(student.id)}
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
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sebelumnya
          </button>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Selanjutnya
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Menampilkan <span className="font-medium">{startIndex + 1}</span> sampai{' '}
              <span className="font-medium">
                {Math.min(endIndex, filteredStudents.length)}
              </span>{' '}
              dari <span className="font-medium">{filteredStudents.length}</span> mahasiswa
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
                      Hapus Mahasiswa
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Apakah Anda yakin ingin menghapus data mahasiswa ini? Tindakan ini tidak dapat dibatalkan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDelete}
                >
                  Hapus
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStudents;
