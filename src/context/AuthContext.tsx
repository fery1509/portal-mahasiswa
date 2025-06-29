import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// User types
export type UserRole = "student" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Student-specific data
export interface StudentData {
  nim: string;
  programStudi: string;
  semester: number;
  dosenWali: string;
  tahunMasuk: string;
  provinsi: string;
  kabupaten: string;
  jenisKelamin: "L" | "P";
  alamat: string;
  telepon: string;
}

// Admin has no specific data beyond the base User type

interface AuthContextType {
  user: (User & { studentData?: StudentData }) | null;
  loading: boolean;
  login: (nim: string, password: string) => Promise<void>;
  adminLogin: (nip: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for development
const MOCK_USERS = [
  {
    id: "2",
    name: "Budi Santoso",
    email: "budi@gmail.com",
    password: "student123",
    role: "student" as UserRole,
    avatar:
      "https://ui-avatars.com/api/?name=Budi+Santoso&background=6366F1&color=fff",
    studentData: {
      nim: "C030323083",
      programStudi: "Teknik Informatika",
      semester: 4,
      dosenWali: "Dr. Hendro Wijaya, M.Kom",
      tahunMasuk: "2023",
      provinsi: "Kalimantan Selatan",
      kabupaten: "Banjarmasin",
      jenisKelamin: "L" as const,
      alamat: "Jl. Sukabirus No. 123, Banjarmasin",
      telepon: "081234567890",
    },
  },
  {
    id: "3",
    name: "Siti Nurhayati",
    email: "siti@student.kampus.ac.id",
    password: "student123",
    role: "student" as UserRole,
    avatar:
      "https://ui-avatars.com/api/?name=Siti+Nurhayati&background=8B5CF6&color=fff",
    studentData: {
      nim: "0987654321",
      programStudi: "Manajemen Bisnis",
      semester: 3,
      dosenWali: "Dr. Amalia Putri, M.M",
      tahunMasuk: "2022",
      provinsi: "DKI Jakarta",
      kabupaten: "Jakarta Selatan",
      jenisKelamin: "P" as const,
      alamat: "Jl. Merdeka No. 45, Jakarta Selatan",
      telepon: "089876543210",
    },
  },
];

// Mock admin data for development
const MOCK_ADMINS = [
  {
    id: "admin1",
    name: "Admin Akademik",
    email: "admin@kampus.ac.id",
    password: "admin123",
    role: "admin" as UserRole,
    avatar: "https://ui-avatars.com/api/?name=Admin+Akademik&background=10B981&color=fff",
    nip: "admin123"
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<
    (User & { studentData?: StudentData }) | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("kampusUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (nim: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Login hanya dengan NIM mahasiswa
      const matchedUser = MOCK_USERS.find(
        (u) => u.studentData?.nim === nim && u.password === password
      );

      if (!matchedUser) {
        throw new Error("NIM atau kata sandi tidak valid");
      }

      // Remove password before storing user data
      const { password: _, ...userWithoutPassword } = matchedUser;

      // Store user in state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem("kampusUser", JSON.stringify(userWithoutPassword));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  // Admin login function
  const adminLogin = async (nip: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Login dengan NIP admin
      const matchedAdmin = MOCK_ADMINS.find(
        (a) => a.nip === nip && a.password === password
      );

      if (!matchedAdmin) {
        throw new Error("NIP atau kata sandi tidak valid");
      }

      // Remove password before storing admin data
      const { password: _, ...adminWithoutPassword } = matchedAdmin;

      // Store admin in state and localStorage
      setUser(adminWithoutPassword);
      localStorage.setItem("kampusAdmin", JSON.stringify(adminWithoutPassword));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("kampusUser");
    localStorage.removeItem("kampusAdmin");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        adminLogin,
        logout,
        isAuthenticated: !!user,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
