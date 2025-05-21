import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, User, Users, GraduationCap, LogOut } from "lucide-react";
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
import AdminSidebar from "./SidebarAdmin";
import AdminHeader from "./HeaderAdmin";

interface StudentFormData {
  nim: string;
  nama: string;
  tanggalLahir: Date | undefined;
  prodi: string;
  tempatLahir?: string;
  dosenPembimbing?: string;
  email?: string;
  nomorHp?: string;
  tahunMasuk?: string;
  jenisKelamin?: string;
  asal?: string;
  agama?: string;
  alamat?: string;
  fotoProfil?: string;
  password?: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<StudentFormData>({
    nim: "",
    nama: "",
    tanggalLahir: undefined,
    prodi: "",
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Statistik dummy
  const stats = [
    { label: "Total Mahasiswa", value: 1240, icon: User },
    { label: "Total Program Studi", value: 20, icon: GraduationCap },
  ];

  // Check if admin is logged in
  const checkAdminAuth = () => {
    const admin = localStorage.getItem("kampusAdmin");
    if (!admin) {
      navigate("/admin/login");
    }
  };

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
    if (!formData.nim || !formData.nama || !formData.tanggalLahir || !formData.prodi) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Semua field harus diisi",
      });
      return;
    }
    const existingStudents = JSON.parse(localStorage.getItem("students") || "[]");
    existingStudents.push({
      ...formData,
      tanggalLahir: formData.tanggalLahir?.toISOString(),
      id: Date.now().toString(),
    });
    localStorage.setItem("students", JSON.stringify(existingStudents));
    toast({
      title: "Berhasil!",
      description: `Mahasiswa ${formData.nama} berhasil ditambahkan`,
    });
    setFormData({
      nim: "",
      nama: "",
      tanggalLahir: undefined,
      prodi: "",
    });
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <AdminSidebar />
        </div>
      </div>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 flex md:hidden ${sidebarOpen ? 'visible' : 'invisible'}`}>
        <div className={`fixed inset-0 bg-gray-600 ${sidebarOpen ? 'opacity-75' : 'opacity-0'} transition-opacity duration-300 ease-linear`} onClick={() => setSidebarOpen(false)} />
        <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-kampus-primary text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition duration-300 ease-in-out`}>
          <AdminSidebar onCloseSidebar={() => setSidebarOpen(false)} mobile />
        </div>
      </div>
      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <AdminHeader onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 md:px-8">
            <div className="pb-5 border-b border-gray-200 max-w-4xl">
              <h3 className="text-2xl font-bold leading-6 text-gray-900">Dashboard Admin</h3>
              <p className="mt-2 max-w-4xl text-sm text-gray-500">Selamat datang di sistem administrasi akademik.</p>
            </div>
            {/* Statistik */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white overflow-hidden shadow rounded-lg hover-scale">
                  <div className="p-5 flex items-center">
                    <stat.icon className="h-6 w-6 text-gray-400" />
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Form tambah mahasiswa */}
            <div className="mt-8 max-w-4xl">
              <Card className="w-full">
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
                        <Label htmlFor="nim">NIM<span className="text-red-500">*</span></Label>
                        <Input id="nim" name="nim" placeholder="Masukkan NIM" value={formData.nim} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nama">Nama<span className="text-red-500">*</span></Label>
                        <Input id="nama" name="nama" placeholder="Masukkan nama" value={formData.nama} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tempatLahir">Tempat Lahir<span className="text-red-500">*</span></Label>
                        <Input id="tempatLahir" name="tempatLahir" placeholder="Masukkan tempat lahir" value={formData.tempatLahir || ''} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tanggalLahir">Tanggal Lahir<span className="text-red-500">*</span></Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full flex justify-between items-center">
                              {formData.tanggalLahir ? (formData.tanggalLahir.toLocaleDateString()) : (<span>Pilih tanggal</span>)}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={formData.tanggalLahir} onSelect={handleDateChange} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="prodi">Program Studi<span className="text-red-500">*</span></Label>
                        <Select onValueChange={handleProdiChange} value={formData.prodi} required>
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
                      <div className="space-y-2">
                        <Label htmlFor="dosenPembimbing">Dosen Pembimbing<span className="text-red-500">*</span></Label>
                        <Input id="dosenPembimbing" name="dosenPembimbing" placeholder="Masukkan dosen pembimbing" value={formData.dosenPembimbing || ''} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email<span className="text-red-500">*</span></Label>
                        <Input id="email" name="email" type="email" placeholder="Masukkan email" value={formData.email || ''} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nomorHp">Nomor HP<span className="text-red-500">*</span></Label>
                        <Input id="nomorHp" name="nomorHp" placeholder="Masukkan nomor HP" value={formData.nomorHp || ''} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tahunMasuk">Tahun Masuk<span className="text-red-500">*</span></Label>
                        <Input id="tahunMasuk" name="tahunMasuk" placeholder="Masukkan tahun masuk" value={formData.tahunMasuk || ''} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jenisKelamin">Jenis Kelamin<span className="text-red-500">*</span></Label>
                        <Select onValueChange={value => setFormData({ ...formData, jenisKelamin: value })} value={formData.jenisKelamin || ''} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis kelamin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="L">Laki-laki</SelectItem>
                            <SelectItem value="P">Perempuan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="asal">Asal<span className="text-red-500">*</span></Label>
                        <Input id="asal" name="asal" placeholder="Masukkan asal" value={formData.asal || ''} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="agama">Agama<span className="text-red-500">*</span></Label>
                        <Input id="agama" name="agama" placeholder="Masukkan agama" value={formData.agama || ''} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="alamat">Alamat<span className="text-red-500">*</span></Label>
                        <Input id="alamat" name="alamat" placeholder="Masukkan alamat" value={formData.alamat || ''} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fotoProfil">Foto Profil</Label>
                        <Input id="fotoProfil" name="fotoProfil" type="file" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password<span className="text-red-500">*</span></Label>
                        <Input id="password" name="password" type="password" placeholder="Masukkan password" value={formData.password || ''} onChange={handleInputChange} required />
                      </div>
                    </div>
                    <Button type="submit" className="w-full md:w-auto">Simpan Data Mahasiswa</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
