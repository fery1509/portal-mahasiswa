import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Calendar as CalendarIcon, User, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";

interface StudentFormData {
  nim: string;
  nama: string;
  tanggalLahir: Date | undefined;
  prodi: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<StudentFormData>({
    nim: "",
    nama: "",
    tanggalLahir: undefined,
    prodi: "",
  });

  // Check if admin is logged in
  const checkAdminAuth = () => {
    const admin = localStorage.getItem("kampusAdmin");
    if (!admin) {
      navigate("/admin/login");
    }
  };

  // Call this on component mount
  useEffect(() => {
    checkAdminAuth();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProdiChange = (value: string) => {
    setFormData({
      ...formData,
      prodi: value,
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData({
      ...formData,
      tanggalLahir: date,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.nim || !formData.nama || !formData.tanggalLahir || !formData.prodi) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Semua field harus diisi",
      });
      return;
    }

    // In a real application, you would send this data to your API
    // For this demo, we'll just show a success message and reset the form
    
    // Get existing students from localStorage or create empty array
    const existingStudents = JSON.parse(localStorage.getItem("students") || "[]");
    
    // Add new student
    existingStudents.push({
      ...formData,
      tanggalLahir: formData.tanggalLahir?.toISOString(),
      id: Date.now().toString(), // Simple unique ID
    });
    
    // Save back to localStorage
    localStorage.setItem("students", JSON.stringify(existingStudents));
    
    // Show success message
    toast({
      title: "Berhasil!",
      description: `Mahasiswa ${formData.nama} berhasil ditambahkan`,
    });
    
    // Reset form
    setFormData({
      nim: "",
      nama: "",
      tanggalLahir: undefined,
      prodi: "",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("kampusAdmin");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src="/images/logo-simak.png"
              alt="Logo SIMAK"
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold">Admin SIMAK</span>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="text-white hover:bg-blue-700">
            Logout
          </Button>
        </div>
      </nav>

      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-6 w-6" />
              <span>Tambah Mahasiswa Baru</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nim">NIM</Label>
                  <Input
                    id="nim"
                    name="nim"
                    placeholder="Masukkan NIM"
                    value={formData.nim}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input
                    id="nama"
                    name="nama"
                    placeholder="Masukkan nama lengkap"
                    value={formData.nama}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full flex justify-between items-center"
                      >
                        {formData.tanggalLahir ? (
                          format(formData.tanggalLahir, "PPP")
                        ) : (
                          <span>Pilih tanggal</span>
                        )}
                        <CalendarIcon className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.tanggalLahir}
                        onSelect={handleDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prodi">Program Studi</Label>
                  <Select onValueChange={handleProdiChange} value={formData.prodi}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih program studi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teknik_informatika">Teknik Informatika</SelectItem>
                      <SelectItem value="sistem_informasi">Sistem Informasi</SelectItem>
                      <SelectItem value="teknik_elektro">Teknik Elektro</SelectItem>
                      <SelectItem value="teknik_sipil">Teknik Sipil</SelectItem>
                      <SelectItem value="manajemen">Manajemen</SelectItem>
                      <SelectItem value="akuntansi">Akuntansi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full md:w-auto">
                Simpan Data Mahasiswa
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6" />
              <span>Informasi</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Sistem Administrator digunakan untuk mengelola data mahasiswa, perkuliahan, dan informasi
              akademik lainnya. Fitur ini masih dalam pengembangan.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
