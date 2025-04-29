
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { CheckCircle, XCircle, BookOpen } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const CourseRegistration = () => {
  const { user } = useAuth();
  const { courses, submitCourseRegistration, currentTerm } = useData();
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter courses for the current semester
  const availableCourses = courses.filter(
    course => course.semester === user?.studentData?.semester
  );

  const handleCourseToggle = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId) 
        : [...prev, courseId]
    );
  };

  const handleSubmit = async () => {
    if (selectedCourses.length === 0) {
      toast({
        title: "Pilih Mata Kuliah",
        description: "Silakan pilih minimal satu mata kuliah untuk diajukan.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await submitCourseRegistration(user?.id as string, selectedCourses);
      toast({
        title: "KRS Berhasil Diajukan",
        description: "Pengajuan KRS Anda telah berhasil dikirim dan menunggu persetujuan dosen wali.",
      });
      setSelectedCourses([]);
    } catch (error) {
      toast({
        title: "Gagal Mengajukan KRS",
        description: "Terjadi kesalahan saat mengajukan KRS. Silakan coba lagi nanti.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate total credits
  const totalCredits = selectedCourses.reduce((sum, courseId) => {
    const course = courses.find(c => c.id === courseId);
    return sum + (course?.credits || 0);
  }, 0);

  return (
    <div className="animate-fade-in">
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">Kartu Rencana Studi (KRS)</h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Semester Aktif: {currentTerm.name}
        </p>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Pilih Mata Kuliah</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Silakan pilih mata kuliah yang ingin Anda ambil untuk semester ini.</p>
          </div>

          <div className="mt-4 bg-gray-50 p-4 rounded-md">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Mata Kuliah Dipilih: </span>
                <span className="text-sm font-bold text-gray-900">{selectedCourses.length}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Total SKS: </span>
                <span className={`text-sm font-bold ${totalCredits > 24 ? 'text-red-600' : 'text-gray-900'}`}>
                  {totalCredits}
                </span>
                {totalCredits > 24 && (
                  <span className="ml-2 text-xs text-red-600">
                    (Melebihi batas maksimum 24 SKS)
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            {availableCourses.length > 0 ? (
              <Table>
                <TableCaption>Daftar mata kuliah yang tersedia untuk semester {user?.studentData?.semester}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Pilih</TableHead>
                    <TableHead>Kode</TableHead>
                    <TableHead>Nama Mata Kuliah</TableHead>
                    <TableHead>SKS</TableHead>
                    <TableHead>Dosen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availableCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedCourses.includes(course.id)}
                          onChange={() => handleCourseToggle(course.id)}
                          className="h-4 w-4 text-kampus-primary focus:ring-kampus-secondary border-gray-300 rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{course.code}</TableCell>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.credits}</TableCell>
                      <TableCell>{course.lecturer}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada mata kuliah</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Tidak ada mata kuliah yang tersedia untuk semester ini.
                </p>
              </div>
            )}
          </div>

          <div className="mt-5">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || selectedCourses.length === 0 || totalCredits > 24}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-kampus-primary hover:bg-kampus-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kampus-accent"
            >
              {isSubmitting ? 'Memproses...' : 'Ajukan KRS'}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Status Pengajuan KRS</h3>
          
          <div className="mt-4 overflow-x-auto">
            <Table>
              <TableCaption>Status pengajuan KRS Anda</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Semester</TableHead>
                  <TableHead>Tanggal Pengajuan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Disetujui Oleh</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Semester Ganjil 2023/2024</TableCell>
                  <TableCell>15 Agustus 2023</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="mr-1 h-4 w-4" />
                      Disetujui
                    </span>
                  </TableCell>
                  <TableCell>{user?.studentData?.dosenWali}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Semester Genap 2022/2023</TableCell>
                  <TableCell>20 Januari 2023</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="mr-1 h-4 w-4" />
                      Disetujui
                    </span>
                  </TableCell>
                  <TableCell>{user?.studentData?.dosenWali}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRegistration;
