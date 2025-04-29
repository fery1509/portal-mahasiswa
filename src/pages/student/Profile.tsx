
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, School, BookOpen, 
  FileEdit, X, CheckCircle, Save } from 'lucide-react';

const StudentProfile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    alamat: user?.studentData?.alamat || '',
    telepon: user?.studentData?.telepon || '',
    email: user?.email || '',
  });

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission with timeout
    setTimeout(() => {
      // Update local user data (in a real app, this would be an API call)
      if (user && user.studentData) {
        user.studentData.alamat = formData.alamat;
        user.studentData.telepon = formData.telepon;
        user.email = formData.email;
      }
      
      // Show success message and exit edit mode
      setSaveSuccess(true);
      setEditing(false);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1000);
  };

  // Handle cancel editing
  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      alamat: user?.studentData?.alamat || '',
      telepon: user?.studentData?.telepon || '',
      email: user?.email || '',
    });
    setEditing(false);
  };

  if (!user || !user.studentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">Data mahasiswa tidak ditemukan</h3>
          <p className="mt-1 text-sm text-gray-500">Silakan hubungi administrator.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">Profil Mahasiswa</h3>
        {!editing && (
          <div className="mt-3 sm:mt-0">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kampus-primary"
              onClick={() => setEditing(true)}
            >
              <FileEdit className="h-4 w-4 mr-2" />
              Edit Profil
            </button>
          </div>
        )}
      </div>

      {/* Success notification */}
      {saveSuccess && (
        <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                Profil berhasil diperbarui.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Profile header with photo */}
          <div className="px-4 py-5 sm:px-6 bg-gray-50">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-20 w-20">
                <img
                  className="h-20 w-20 rounded-full"
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=6366F1&color=fff&size=128`}
                  alt="Profile"
                />
              </div>
              <div className="ml-5">
                <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">NIM: {user.studentData.nim}</p>
                <p className="text-sm text-gray-500">{user.studentData.programStudi} - Semester {user.studentData.semester}</p>
              </div>
            </div>
          </div>

          {editing ? (
            // Edit form
            <form onSubmit={handleSubmit}>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  {/* Email */}
                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-kampus-primary focus:border-kampus-primary block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="sm:col-span-3">
                    <label htmlFor="telepon" className="block text-sm font-medium text-gray-700">
                      Nomor Telepon
                    </label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        name="telepon"
                        id="telepon"
                        value={formData.telepon}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-kampus-primary focus:border-kampus-primary block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-6">
                    <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">
                      Alamat
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="alamat"
                        name="alamat"
                        rows={3}
                        value={formData.alamat}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-kampus-primary focus:border-kampus-primary block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form actions */}
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <X className="h-4 w-4 mr-2" />
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-kampus-primary hover:bg-kampus-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kampus-primary"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Simpan
                </button>
              </div>
            </form>
          ) : (
            // Profile details
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Tahun Masuk
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.studentData.tahunMasuk}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <School className="h-4 w-4 mr-2" />
                    Program Studi
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.studentData.programStudi}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Dosen Wali
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.studentData.dosenWali}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.email}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Jenis Kelamin
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.studentData.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Asal
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.studentData.kabupaten}, {user.studentData.provinsi}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Alamat
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.studentData.alamat}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Telepon
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.studentData.telepon}
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
