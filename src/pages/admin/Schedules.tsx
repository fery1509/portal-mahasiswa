
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Filter, Edit, Trash2, Eye, ChevronLeft, ChevronRight, 
  Plus, Calendar
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock schedule data
const MOCK_SCHEDULES = [
  {
    id: '1',
    kodeMk: 'TI2101',
    namaMk: 'Algoritma dan Struktur Data',
    kelas: 'A',
    hari: 'Senin',
    jamMulai: '08:00',
    jamSelesai: '10:30',
    ruangan: '1.2.03',
    dosen: 'Dr. Hendro Wijaya, M.Kom',
    tahunAjaran: '2023/2024',
    semester: 'Ganjil',
    status: 'active'
  },
  {
    id: '2',
    kodeMk: 'TI3201',
    namaMk: 'Pemrograman Web',
    kelas: 'B',
    hari: 'Selasa',
    jamMulai: '13:00',
    jamSelesai: '15:30',
    ruangan: '2.1.01',
    dosen: 'Dr. Rina Sari, M.Kom',
    tahunAjaran: '2023/2024',
    semester: 'Ganjil',
    status: 'active'
  },
  {
    id: '3',
    kodeMk: 'TI4102',
    namaMk: 'Kecerdasan Buatan',
    kelas: 'A',
    hari: 'Rabu',
    jamMulai: '10:00',
    jamSelesai: '12:30',
    ruangan: '3.1.02',
    dosen: 'Prof. Bambang Suryanto, Ph.D',
    tahunAjaran: '2023/2024',
    semester: 'Ganjil',
    status: 'active'
  },
  {
    id: '4',
    kodeMk: 'TI3105',
    namaMk: 'Basis Data Lanjut',
    kelas: 'C',
    hari: 'Kamis',
    jamMulai: '09:00',
    jamSelesai: '11:30',
    ruangan: '2.3.04',
    dosen: 'Dr. Fajar Sidik, M.Kom',
    tahunAjaran: '2023/2024',
    semester: 'Ganjil',
    status: 'active'
  },
  {
    id: '5',
    kodeMk: 'MB2101',
    namaMk: 'Manajemen Pemasaran',
    kelas: 'A',
    hari: 'Jumat',
    jamMulai: '08:00',
    jamSelesai: '10:30',
    ruangan: '4.1.01',
    dosen: 'Dr. Amalia Putri, M.M',
    tahunAjaran: '2023/2024',
    semester: 'Ganjil',
    status: 'active'
  },
  {
    id: '6',
    kodeMk: 'MB3102',
    namaMk: 'Keuangan Bisnis',
    kelas: 'B',
    hari: 'Senin',
    jamMulai: '13:00',
    jamSelesai: '15:30',
    ruangan: '4.2.02',
    dosen: 'Prof. Hendra Gunawan, Ph.D',
    tahunAjaran: '2023/2024',
    semester: 'Ganjil',
    status: 'active'
  }
];

// Days of the week
const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

// Time slots
const TIME_SLOTS = [
  '07:00 - 08:00',
  '08:00 - 09:00',
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 13:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00'
];

// Filter options
const semesterOptions = [
  'Semua Semester',
  'Ganjil',
  'Genap'
];

const tahunAjaranOptions = [
  'Semua Tahun Ajaran',
  '2023/2024',
  '2022/2023',
  '2021/2022'
];

const hariOptions = [
  'Semua Hari',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu'
];

const AdminSchedules = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState(semesterOptions[0]);
  const [selectedTahunAjaran, setSelectedTahunAjaran] = useState(tahunAjaranOptions[0]);
  const [selectedHari, setSelectedHari] = useState(hariOptions[0]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('list');

  // Filter schedules
  const filteredSchedules = MOCK_SCHEDULES.filter(schedule => {
    const matchesSearch = 
      schedule.namaMk.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.kodeMk.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.dosen.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSemester = 
      selectedSemester === 'Semua Semester' || 
      schedule.semester === selectedSemester;
    
    const matchesTahunAjaran = 
      selectedTahunAjaran === 'Semua Tahun Ajaran' || 
      schedule.tahunAjaran === selectedTahunAjaran;
    
    const matchesHari = 
      selectedHari === 'Semua Hari' || 
      schedule.hari === selectedHari;
    
    return matchesSearch && matchesSemester && matchesTahunAjaran && matchesHari;
  });

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredSchedules.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSchedules = filteredSchedules.slice(startIndex, endIndex);

  // Handle delete confirmation
  const confirmDelete = (scheduleId: string) => {
    setScheduleToDelete(scheduleId);
    setIsDeleteModalOpen(true);
  };

  // Handle delete operation
  const handleDelete = () => {
    // In a real app, this would be an API call
    console.log(`Deleting schedule: ${scheduleToDelete}`);
    setIsDeleteModalOpen(false);
    setScheduleToDelete(null);
  };

  // Get schedules for a specific day and time slot
  const getScheduleForSlot = (day: string, timeSlot: string) => {
    const [startTime] = timeSlot.split(' - ');
    return MOCK_SCHEDULES.filter(
      schedule => schedule.hari === day && schedule.jamMulai === startTime
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">Jadwal Kuliah</h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <Button variant="default" className="bg-kampus-primary hover:bg-kampus-accent">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Jadwal
          </Button>
        </div>
      </div>

      {/* Tabs for different views */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList>
          <TabsTrigger value="list">Tampilan Daftar</TabsTrigger>
          <TabsTrigger value="calendar">Tampilan Kalender</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-4">
          {/* Search and filters */}
          <div className="sm:flex sm:justify-between">
            <div className="max-w-lg w-full">
              <label htmlFor="search" className="sr-only">
                Cari jadwal
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-kampus-primary focus:border-kampus-primary sm:text-sm"
                  placeholder="Cari berdasarkan mata kuliah atau dosen"
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
                <label htmlFor="tahunAjaran" className="block text-sm font-medium text-gray-700 mb-1">
                  Tahun Ajaran
                </label>
                <select
                  id="tahunAjaran"
                  name="tahunAjaran"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-kampus-primary focus:border-kampus-primary sm:text-sm rounded-md"
                  value={selectedTahunAjaran}
                  onChange={(e) => setSelectedTahunAjaran(e.target.value)}
                >
                  {tahunAjaranOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="hari" className="block text-sm font-medium text-gray-700 mb-1">
                  Hari
                </label>
                <select
                  id="hari"
                  name="hari"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-kampus-primary focus:border-kampus-primary sm:text-sm rounded-md"
                  value={selectedHari}
                  onChange={(e) => setSelectedHari(e.target.value)}
                >
                  {hariOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Schedule table */}
          <div className="mt-6 overflow-hidden shadow border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mata Kuliah
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jadwal
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ruangan
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dosen
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tahun/Semester
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Aksi</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentSchedules.map((schedule) => (
                  <tr key={schedule.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{schedule.kodeMk} - {schedule.kelas}</div>
                      <div className="text-sm text-gray-500">{schedule.namaMk}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{schedule.hari}</div>
                      <div className="text-sm text-gray-500">{schedule.jamMulai} - {schedule.jamSelesai}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{schedule.ruangan}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{schedule.dosen}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{schedule.tahunAjaran}</div>
                      <div className="text-sm text-gray-500">Semester {schedule.semester}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2 justify-end">
                        <Link
                          to={`/admin/schedules/${schedule.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>
                        <Link
                          to={`/admin/schedules/${schedule.id}/edit`}
                          className="text-amber-600 hover:text-amber-900"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => confirmDelete(schedule.id)}
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
                    {Math.min(endIndex, filteredSchedules.length)}
                  </span>{' '}
                  dari <span className="font-medium">{filteredSchedules.length}</span> jadwal
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
        </TabsContent>

        <TabsContent value="calendar" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Jadwal Kalender Mingguan</h3>
            <select
              id="tahunAjaranCalendar"
              name="tahunAjaranCalendar"
              className="block pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-kampus-primary focus:border-kampus-primary rounded-md"
              value={selectedTahunAjaran}
              onChange={(e) => setSelectedTahunAjaran(e.target.value)}
            >
              {tahunAjaranOptions.slice(1).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div className="min-w-full bg-white">
              {/* Calendar header */}
              <div className="grid grid-cols-7 bg-gray-50">
                <div className="col-span-1"></div>
                {DAYS.map((day) => (
                  <div 
                    key={day} 
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar body */}
              <div className="divide-y divide-gray-200">
                {TIME_SLOTS.map((timeSlot) => (
                  <div key={timeSlot} className="grid grid-cols-7">
                    <div className="col-span-1 px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-500 bg-gray-50">
                      {timeSlot}
                    </div>
                    
                    {DAYS.map((day) => {
                      const schedules = getScheduleForSlot(day, timeSlot);
                      return (
                        <div key={`${day}-${timeSlot}`} className="px-2 py-2 border-l relative">
                          {schedules.length > 0 ? (
                            schedules.map((schedule) => (
                              <div 
                                key={schedule.id}
                                className="p-1 text-xs rounded bg-indigo-100 text-indigo-800"
                              >
                                <div className="font-medium truncate">{schedule.kodeMk}</div>
                                <div className="truncate">{schedule.ruangan}</div>
                              </div>
                            ))
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

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
                      Hapus Jadwal
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Apakah Anda yakin ingin menghapus jadwal ini? Tindakan ini tidak dapat dibatalkan.
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

export default AdminSchedules;
