
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
import AdminStudents from "./pages/admin/Students";
import AdminCourses from "./pages/admin/Courses";
import AdminSchedules from "./pages/admin/Schedules";
import AdminSettings from "./pages/admin/Settings";

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

// Route guard based on user role
const RoleRoute = ({ 
  children, 
  allowedRole 
}: { 
  children: React.ReactNode;
  allowedRole: 'admin' | 'student';
}) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (user?.role !== allowedRole) {
    return <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace />;
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
                <RoleRoute allowedRole="student">
                  <AppLayout>
                    <StudentDashboard />
                  </AppLayout>
                </RoleRoute>
              } />
              <Route path="/profile" element={
                <RoleRoute allowedRole="student">
                  <AppLayout>
                    <StudentProfile />
                  </AppLayout>
                </RoleRoute>
              } />
              <Route path="/courses" element={
                <RoleRoute allowedRole="student">
                  <AppLayout>
                    <StudentCourses />
                  </AppLayout>
                </RoleRoute>
              } />
              <Route path="/attendance" element={
                <RoleRoute allowedRole="student">
                  <AppLayout>
                    <StudentAttendance />
                  </AppLayout>
                </RoleRoute>
              } />
              <Route path="/course-registration" element={
                <RoleRoute allowedRole="student">
                  <AppLayout>
                    <CourseRegistration />
                  </AppLayout>
                </RoleRoute>
              } />
              <Route path="/academic-record" element={
                <RoleRoute allowedRole="student">
                  <AppLayout>
                    <AcademicRecord />
                  </AppLayout>
                </RoleRoute>
              } />
              
              {/* Admin routes */}
              <Route path="/admin" element={
                <RoleRoute allowedRole="admin">
                  <AppLayout>
                    <AdminDashboard />
                  </AppLayout>
                </RoleRoute>
              } />
              <Route path="/admin/students" element={
                <RoleRoute allowedRole="admin">
                  <AppLayout>
                    <AdminStudents />
                  </AppLayout>
                </RoleRoute>
              } />
              <Route path="/admin/courses" element={
                <RoleRoute allowedRole="admin">
                  <AppLayout>
                    <AdminCourses />
                  </AppLayout>
                </RoleRoute>
              } />
              <Route path="/admin/schedules" element={
                <RoleRoute allowedRole="admin">
                  <AppLayout>
                    <AdminSchedules />
                  </AppLayout>
                </RoleRoute>
              } />
              <Route path="/admin/settings" element={
                <RoleRoute allowedRole="admin">
                  <AppLayout>
                    <AdminSettings />
                  </AppLayout>
                </RoleRoute>
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
