
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [systemAnnouncements, setSystemAnnouncements] = useState(true);
  const [defaultSemester, setDefaultSemester] = useState('Ganjil 2023/2024');
  const [registrationOpen, setRegistrationOpen] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [academicCalendar, setAcademicCalendar] = useState({
    startDate: '2023-09-01',
    endDate: '2024-01-15',
    registrationStart: '2023-08-01',
    registrationEnd: '2023-08-15',
    examStart: '2023-12-15',
    examEnd: '2024-01-10'
  });

  const handleSaveGeneralSettings = () => {
    toast({
      title: "Pengaturan Tersimpan",
      description: "Pengaturan umum berhasil disimpan.",
    });
  };

  const handleSaveAcademicSettings = () => {
    toast({
      title: "Pengaturan Tersimpan",
      description: "Pengaturan akademik berhasil disimpan.",
    });
  };

  const handleSystemBackup = () => {
    toast({
      title: "Backup Berhasil",
      description: "Backup sistem berhasil dibuat.",
    });
  };

  const handleEnterMaintenanceMode = () => {
    setMaintenanceMode(true);
    toast({
      title: "Mode Pemeliharaan Aktif",
      description: "Sistem telah masuk ke dalam mode pemeliharaan.",
      variant: "destructive"
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">Pengaturan Sistem</h3>
        <p className="mt-2 text-sm text-gray-500">
          Kelola berbagai pengaturan sistem akademik
        </p>
      </div>

      <Tabs defaultValue="general" className="mt-6">
        <TabsList className="mb-6">
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="academic">Akademik</TabsTrigger>
          <TabsTrigger value="system">Sistem</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Umum</CardTitle>
              <CardDescription>
                Konfigurasi dasar sistem akademik
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Notifikasi</h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Notifikasi Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Aktifkan notifikasi via email untuk pengguna
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="system-announcements">Pengumuman Sistem</Label>
                    <p className="text-sm text-muted-foreground">
                      Tampilkan pengumuman sistem di dashboard
                    </p>
                  </div>
                  <Switch
                    id="system-announcements"
                    checked={systemAnnouncements}
                    onCheckedChange={setSystemAnnouncements}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Tampilan</h4>
                
                <div className="grid gap-2">
                  <Label htmlFor="language">Bahasa Default</Label>
                  <select
                    id="language"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-kampus-primary focus:border-kampus-primary sm:text-sm rounded-md"
                  >
                    <option value="id">Bahasa Indonesia</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="theme">Tema</Label>
                  <select
                    id="theme"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-kampus-primary focus:border-kampus-primary sm:text-sm rounded-md"
                  >
                    <option value="light">Terang</option>
                    <option value="dark">Gelap</option>
                    <option value="system">Ikuti Sistem</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneralSettings}>Simpan Perubahan</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Academic Settings */}
        <TabsContent value="academic">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Akademik</CardTitle>
              <CardDescription>
                Konfigurasi jadwal dan parameter akademik
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Periode Akademik</h4>
                
                <div className="grid gap-2">
                  <Label htmlFor="default-semester">Semester Aktif</Label>
                  <select
                    id="default-semester"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-kampus-primary focus:border-kampus-primary sm:text-sm rounded-md"
                    value={defaultSemester}
                    onChange={(e) => setDefaultSemester(e.target.value)}
                  >
                    <option value="Ganjil 2023/2024">Ganjil 2023/2024</option>
                    <option value="Genap 2023/2024">Genap 2023/2024</option>
                    <option value="Ganjil 2024/2025">Ganjil 2024/2025</option>
                  </select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="start-date">Tanggal Mulai Semester</Label>
                  <input
                    type="date"
                    id="start-date"
                    className="block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-kampus-primary focus:border-kampus-primary sm:text-sm rounded-md"
                    value={academicCalendar.startDate}
                    onChange={(e) => setAcademicCalendar({...academicCalendar, startDate: e.target.value})}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="end-date">Tanggal Akhir Semester</Label>
                  <input
                    type="date"
                    id="end-date"
                    className="block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-kampus-primary focus:border-kampus-primary sm:text-sm rounded-md"
                    value={academicCalendar.endDate}
                    onChange={(e) => setAcademicCalendar({...academicCalendar, endDate: e.target.value})}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Pendaftaran KRS</h4>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="registration-status">Status Pendaftaran KRS</Label>
                    <p className="text-sm text-muted-foreground">
                      Aktifkan jika periode pendaftaran KRS sedang berlangsung
                    </p>
                  </div>
                  <Switch
                    id="registration-status"
                    checked={registrationOpen}
                    onCheckedChange={setRegistrationOpen}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="registration-start">Tanggal Mulai KRS</Label>
                  <input
                    type="date"
                    id="registration-start"
                    className="block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-kampus-primary focus:border-kampus-primary sm:text-sm rounded-md"
                    value={academicCalendar.registrationStart}
                    onChange={(e) => setAcademicCalendar({...academicCalendar, registrationStart: e.target.value})}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="registration-end">Tanggal Akhir KRS</Label>
                  <input
                    type="date"
                    id="registration-end"
                    className="block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-kampus-primary focus:border-kampus-primary sm:text-sm rounded-md"
                    value={academicCalendar.registrationEnd}
                    onChange={(e) => setAcademicCalendar({...academicCalendar, registrationEnd: e.target.value})}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Ujian</h4>
                
                <div className="grid gap-2">
                  <Label htmlFor="exam-start">Tanggal Mulai Ujian</Label>
                  <input
                    type="date"
                    id="exam-start"
                    className="block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-kampus-primary focus:border-kampus-primary sm:text-sm rounded-md"
                    value={academicCalendar.examStart}
                    onChange={(e) => setAcademicCalendar({...academicCalendar, examStart: e.target.value})}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="exam-end">Tanggal Akhir Ujian</Label>
                  <input
                    type="date"
                    id="exam-end"
                    className="block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-kampus-primary focus:border-kampus-primary sm:text-sm rounded-md"
                    value={academicCalendar.examEnd}
                    onChange={(e) => setAcademicCalendar({...academicCalendar, examEnd: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveAcademicSettings}>Simpan Perubahan</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Sistem</CardTitle>
              <CardDescription>
                Pengaturan sistem dan keamanan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Keamanan</h4>
                
                <div className="grid gap-2">
                  <Label htmlFor="session-timeout">Waktu Sesi (menit)</Label>
                  <input
                    type="number"
                    id="session-timeout"
                    className="block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-kampus-primary focus:border-kampus-primary sm:text-sm rounded-md"
                    defaultValue={30}
                    min={1}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password-policy">Kebijakan Sandi</Label>
                  <select
                    id="password-policy"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-kampus-primary focus:border-kampus-primary sm:text-sm rounded-md"
                  >
                    <option value="low">Rendah (min. 6 karakter)</option>
                    <option value="medium">Sedang (min. 8 karakter, huruf dan angka)</option>
                    <option value="high">Tinggi (min. 10 karakter, huruf besar/kecil, angka, simbol)</option>
                  </select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Backup & Pemeliharaan</h4>
                
                <div className="grid gap-2">
                  <Label htmlFor="backup-frequency">Frekuensi Backup</Label>
                  <select
                    id="backup-frequency"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-kampus-primary focus:border-kampus-primary sm:text-sm rounded-md"
                  >
                    <option value="daily">Harian</option>
                    <option value="weekly">Mingguan</option>
                    <option value="monthly">Bulanan</option>
                  </select>
                </div>

                <div>
                  <Button variant="outline" className="w-full" onClick={handleSystemBackup}>
                    Backup Database Sekarang
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-mode">Mode Pemeliharaan</Label>
                    <p className="text-sm text-muted-foreground">
                      Aktifkan mode pemeliharaan (hanya admin dapat login)
                    </p>
                  </div>
                  <Switch
                    id="maintenance-mode"
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Aksi Berbahaya</h4>
                
                <div>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={handleEnterMaintenanceMode}
                    disabled={maintenanceMode}
                  >
                    Masuk Mode Pemeliharaan
                  </Button>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Peringatan: Hanya pengguna dengan akses admin yang dapat login selama mode pemeliharaan.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Simpan Perubahan</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
