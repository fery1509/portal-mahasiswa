import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="py-6 px-4 sm:px-6 md:px-8 max-w-5xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Data Mahasiswa</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NIM</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Program Studi</TableHead>
                <TableHead>Tahun Masuk</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyStudents.map((mhs) => (
                <TableRow key={mhs.nim} className={selected?.nim === mhs.nim ? "bg-blue-50" : ""}>
                  <TableCell>{mhs.nim}</TableCell>
                  <TableCell>{mhs.nama}</TableCell>
                  <TableCell>{mhs.prodi}</TableCell>
                  <TableCell>{mhs.tahunMasuk}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => setSelected(mhs)}>
                      Lihat
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {selected && (
        <Card className="max-w-3xl">
          <CardHeader>
            <CardTitle>Detail Mahasiswa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <img src={selected.fotoProfil} alt={selected.nama} className="h-32 w-32 rounded-full object-cover border" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 w-full">
                <div><b>NIM:</b> {selected.nim}</div>
                <div><b>Nama:</b> {selected.nama}</div>
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
    </div>
  );
};

export default AdminStudents; 