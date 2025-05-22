import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";
import SidebarAdmin from "./SidebarAdmin";
import HeaderAdmin from "./HeaderAdmin";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const dummyStudents = [
  {
    nim: "C030123456",
    nama: "Budi Santoso",
    tempatLahir: "Banjarmasin",
    tanggalLahir: "2003-05-12",
    prodi: "Teknik Informatika",
    dosenPembimbing: "Dr. Hendro Wijaya, M.Kom",
    email: "budi@poliban.ac.id",
    nomorHp: "081234567890",
    tahunMasuk: "2021",
    jenisKelamin: "Laki-laki",
    asal: "Banjarbaru",
    agama: "Islam",
    alamat: "Jl. Merdeka No. 1",
    fotoProfil: "https://ui-avatars.com/api/?name=Budi+Santoso&background=6366F1&color=fff",
  },
  {
    nim: "C030654321",
    nama: "Siti Aminah",
    tempatLahir: "Martapura",
    tanggalLahir: "2002-11-20",
    prodi: "Sistem Informasi",
    dosenPembimbing: "Dr. Siti Rahma, M.Kom",
    email: "siti@poliban.ac.id",
    nomorHp: "082345678901",
    tahunMasuk: "2020",
    jenisKelamin: "Perempuan",
    asal: "Banjarmasin",
    agama: "Islam",
    alamat: "Jl. Pangeran Antasari No. 2",
    fotoProfil: "https://ui-avatars.com/api/?name=Siti+Aminah&background=6366F1&color=fff",
  },
];

const AdminStudents = () => {
  const [selected, setSelected] = useState<any | null>(null);
  const [students, setStudents] = useState(dummyStudents);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleView = (student: any) => {
    setSelected(student);
  };

  const handleEdit = (student: any) => {
    setEditingStudent({ ...student });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (student: any) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data mahasiswa ${student.nama}?`)) {
      setStudents(students.filter(s => s.nim !== student.nim));
      toast({
        title: "Berhasil",
        description: `Data mahasiswa ${student.nama} telah dihapus`,
      });
    }
  };

  const handleSaveEdit = () => {
    setStudents(students.map(s => 
      s.nim === editingStudent.nim ? editingStudent : s
    ));
    setIsEditDialogOpen(false);
    toast({
      title: "Berhasil",
      description: `Data mahasiswa ${editingStudent.nama} telah diperbarui`,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setEditingStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <SidebarAdmin />
        </div>
      </div>
      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <HeaderAdmin onOpenSidebar={() => {}} />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 md:px-8 max-w-5xl">
            <Card className="mb-8 bg-gradient-to-br from-white via-indigo-50 to-purple-50 border border-indigo-100 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 bg-clip-text text-transparent">Data Mahasiswa</CardTitle>
              </CardHeader>
              <div className="mb-4 flex justify-start">
                <Input
                  className="w-full max-w-xs border border-indigo-200 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ml-6"
                  placeholder="Search..."
                  type="search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-indigo-700 font-bold bg-indigo-50/40">NIM</TableHead>
                      <TableHead className="text-indigo-700 font-bold bg-indigo-50/40">Nama</TableHead>
                      <TableHead className="text-indigo-700 font-bold bg-indigo-50/40">Program Studi</TableHead>
                      <TableHead className="text-indigo-700 font-bold bg-indigo-50/40">Tahun Masuk</TableHead>
                      <TableHead className="text-indigo-700 font-bold bg-indigo-50/40">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students
                      .filter((mhs) => {
                        const q = searchQuery.toLowerCase();
                        return (
                          mhs.nim.toLowerCase().includes(q) ||
                          mhs.nama.toLowerCase().includes(q) ||
                          mhs.prodi.toLowerCase().includes(q) ||
                          mhs.tahunMasuk.toLowerCase().includes(q)
                        );
                      })
                      .map((mhs) => (
                        <TableRow key={mhs.nim} className={selected?.nim === mhs.nim ? "bg-indigo-50/60" : "hover:bg-indigo-50/40 transition"}>
                          <TableCell>{mhs.nim}</TableCell>
                          <TableCell>{mhs.nama}</TableCell>
                          <TableCell>{mhs.prodi}</TableCell>
                          <TableCell>{mhs.tahunMasuk}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="hover:bg-indigo-100 group" onClick={() => handleView(mhs)}>
                                <Eye className="h-4 w-4 text-indigo-500 group-hover:text-indigo-700" />
                              </Button>
                              <Button size="sm" variant="outline" className="hover:bg-purple-100 group" onClick={() => handleEdit(mhs)}>
                                <Pencil className="h-4 w-4 text-purple-500 group-hover:text-purple-700" />
                              </Button>
                              <Button size="sm" variant="outline" className="hover:bg-rose-100 group" onClick={() => handleDelete(mhs)}>
                                <Trash2 className="h-4 w-4 text-rose-500 group-hover:text-rose-700" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {selected && (
              <Card className="max-w-3xl bg-gradient-to-br from-white via-indigo-50 to-purple-50 border border-indigo-200 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 bg-clip-text text-transparent">Detail Mahasiswa</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <img src={selected.fotoProfil} alt={selected.nama} className="h-32 w-32 rounded-full object-cover border-4 border-indigo-200 shadow" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 w-full">
                      <div className="text-indigo-800 font-semibold"><b>NIM:</b> {selected.nim}</div>
                      <div className="text-indigo-800 font-semibold"><b>Nama:</b> {selected.nama}</div>
                      <div><b>Tempat Lahir:</b> {selected.tempatLahir}</div>
                      <div><b>Tanggal Lahir:</b> {selected.tanggalLahir}</div>
                      <div><b>Program Studi:</b> {selected.prodi}</div>
                      <div><b>Dosen Pembimbing:</b> {selected.dosenPembimbing}</div>
                      <div><b>Email:</b> {selected.email}</div>
                      <div><b>Nomor HP:</b> {selected.nomorHp}</div>
                      <div><b>Tahun Masuk:</b> {selected.tahunMasuk}</div>
                      <div><b>Jenis Kelamin:</b> {selected.jenisKelamin}</div>
                      <div><b>Asal:</b> {selected.asal}</div>
                      <div><b>Agama:</b> {selected.agama}</div>
                      <div className="md:col-span-2"><b>Alamat:</b> {selected.alamat}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Data Mahasiswa</DialogTitle>
                </DialogHeader>
                {editingStudent && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="nim">NIM</Label>
                      <Input
                        id="nim"
                        name="nim"
                        value={editingStudent.nim}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nama">Nama</Label>
                      <Input
                        id="nama"
                        name="nama"
                        value={editingStudent.nama}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tempatLahir">Tempat Lahir</Label>
                      <Input
                        id="tempatLahir"
                        name="tempatLahir"
                        value={editingStudent.tempatLahir}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
                      <Input
                        id="tanggalLahir"
                        name="tanggalLahir"
                        type="date"
                        value={editingStudent.tanggalLahir}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prodi">Program Studi</Label>
                      <Select
                        value={editingStudent.prodi}
                        onValueChange={(value) => handleSelectChange("prodi", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Program Studi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Teknik Informatika">Teknik Informatika</SelectItem>
                          <SelectItem value="Sistem Informasi">Sistem Informasi</SelectItem>
                          <SelectItem value="Teknik Komputer">Teknik Komputer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dosenPembimbing">Dosen Pembimbing</Label>
                      <Input
                        id="dosenPembimbing"
                        name="dosenPembimbing"
                        value={editingStudent.dosenPembimbing}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={editingStudent.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nomorHp">Nomor HP</Label>
                      <Input
                        id="nomorHp"
                        name="nomorHp"
                        value={editingStudent.nomorHp}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tahunMasuk">Tahun Masuk</Label>
                      <Input
                        id="tahunMasuk"
                        name="tahunMasuk"
                        value={editingStudent.tahunMasuk}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jenisKelamin">Jenis Kelamin</Label>
                      <Select
                        value={editingStudent.jenisKelamin}
                        onValueChange={(value) => handleSelectChange("jenisKelamin", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Jenis Kelamin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                          <SelectItem value="Perempuan">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="asal">Asal</Label>
                      <Input
                        id="asal"
                        name="asal"
                        value={editingStudent.asal}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="agama">Agama</Label>
                      <Select
                        value={editingStudent.agama}
                        onValueChange={(value) => handleSelectChange("agama", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Agama" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Islam">Islam</SelectItem>
                          <SelectItem value="Kristen">Kristen</SelectItem>
                          <SelectItem value="Katolik">Katolik</SelectItem>
                          <SelectItem value="Hindu">Hindu</SelectItem>
                          <SelectItem value="Buddha">Buddha</SelectItem>
                          <SelectItem value="Konghucu">Konghucu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fotoProfil">Foto Profil</Label>
                      <Input
                        id="fotoProfil"
                        name="fotoProfil"
                        type="file"
                        accept="image/*"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => setEditingStudent((prev: any) => ({ ...prev, fotoProfil: reader.result as string }));
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      {editingStudent.fotoProfil && (
                        <img src={editingStudent.fotoProfil} alt="Preview" className="mt-2 h-20 w-20 rounded-full object-cover border-2 border-indigo-200 shadow" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={editingStudent.password || ''}
                        onChange={handleInputChange}
                        placeholder="Masukkan password baru (opsional)"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="alamat">Alamat</Label>
                      <Input
                        id="alamat"
                        name="alamat"
                        value={editingStudent.alamat}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button onClick={handleSaveEdit}>
                    Simpan
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminStudents; 