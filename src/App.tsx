import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import AppLayout from "./components/layouts/AppLayout";

// Auth Pages
import Login from "./pages/Login";
import Index from "./pages/Index";

// Student Pages
import StudentDashboard from "./pages/student/Dashboard";
import StudentProfile from "./pages/student/Profile";
import StudentCourses from "./pages/student/Courses";
import StudentAttendance from "./pages/student/Attendance";
import CourseRegistration from "./pages/student/CourseRegistration";
import AcademicRecord from "./pages/student/AcademicRecord";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";

// Error Pages
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Route guard for authenticated routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Route guard for admin routes
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const admin = localStorage.getItem("kampusAdmin");
  
  if (!admin) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DataProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              
              {/* Student routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <AppLayout>
                    <StudentDashboard />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <AppLayout>
                    <StudentProfile />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/courses" element={
                <ProtectedRoute>
                  <AppLayout>
                    <StudentCourses />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/attendance" element={
                <ProtectedRoute>
                  <AppLayout>
                    <StudentAttendance />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/course-registration" element={
                <ProtectedRoute>
                  <AppLayout>
                    <CourseRegistration />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/academic-record" element={
                <ProtectedRoute>
                  <AppLayout>
                    <AcademicRecord />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              {/* Admin routes */}
              <Route path="/admin/dashboard" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              
              {/* Error routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DataProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
