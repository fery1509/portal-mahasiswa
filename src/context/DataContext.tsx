
import { createContext, useContext, ReactNode } from 'react';

// Course types
export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  semester: number;
  lecturer: string;
}

// Enrollment status
export type EnrollmentStatus = 'pending' | 'approved' | 'rejected';

// Student enrollment
export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  status: EnrollmentStatus;
  grade?: string;
  attendancePercentage: number;
}

// Attendance record
export interface Attendance {
  id: string;
  date: string;
  studentId: string;
  courseId: string;
  status: 'present' | 'absent' | 'late' | 'excused';
}

// Academic term
export interface AcademicTerm {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

// Mock data for development
const MOCK_COURSES: Course[] = [
  {
    id: '1',
    code: 'CSC101',
    name: 'Pengantar Ilmu Komputer',
    credits: 3,
    semester: 1,
    lecturer: 'Dr. Hendro Wijaya, M.Kom'
  },
  {
    id: '2',
    code: 'CSC201',
    name: 'Struktur Data dan Algoritma',
    credits: 4,
    semester: 3,
    lecturer: 'Dr. Maya Indira, M.Sc'
  },
  {
    id: '3',
    code: 'CSC301',
    name: 'Pemrograman Web',
    credits: 3,
    semester: 5,
    lecturer: 'Prof. Anton Supriadi, Ph.D'
  },
  {
    id: '4',
    code: 'CSC302',
    name: 'Kecerdasan Buatan',
    credits: 3,
    semester: 5,
    lecturer: 'Dr. Ratna Dewi, M.Kom'
  },
  {
    id: '5',
    code: 'MGT101',
    name: 'Pengantar Manajemen',
    credits: 3,
    semester: 1,
    lecturer: 'Dr. Amalia Putri, M.M'
  },
  {
    id: '6',
    code: 'MGT201',
    name: 'Pemasaran Digital',
    credits: 3,
    semester: 3,
    lecturer: 'Prof. Dimas Pratama, M.M'
  }
];

const MOCK_ENROLLMENTS: Enrollment[] = [
  {
    id: '1',
    studentId: '2',
    courseId: '1',
    status: 'approved',
    grade: 'A',
    attendancePercentage: 95
  },
  {
    id: '2',
    studentId: '2',
    courseId: '2',
    status: 'approved',
    grade: 'B+',
    attendancePercentage: 88
  },
  {
    id: '3',
    studentId: '2',
    courseId: '3',
    status: 'approved',
    attendancePercentage: 92
  },
  {
    id: '4',
    studentId: '2',
    courseId: '4',
    status: 'approved',
    attendancePercentage: 100
  },
  {
    id: '5',
    studentId: '3',
    courseId: '5',
    status: 'approved',
    grade: 'A-',
    attendancePercentage: 90
  },
  {
    id: '6',
    studentId: '3',
    courseId: '6',
    status: 'approved',
    attendancePercentage: 85
  }
];

const MOCK_ATTENDANCES: Attendance[] = [
  {
    id: '1',
    date: '2023-09-01',
    studentId: '2',
    courseId: '3',
    status: 'present'
  },
  {
    id: '2',
    date: '2023-09-08',
    studentId: '2',
    courseId: '3',
    status: 'present'
  },
  {
    id: '3',
    date: '2023-09-15',
    studentId: '2',
    courseId: '3',
    status: 'late'
  },
  {
    id: '4',
    date: '2023-09-22',
    studentId: '2',
    courseId: '3',
    status: 'present'
  },
  {
    id: '5',
    date: '2023-09-01',
    studentId: '2',
    courseId: '4',
    status: 'present'
  },
  {
    id: '6',
    date: '2023-09-08',
    studentId: '2',
    courseId: '4',
    status: 'present'
  }
];

const CURRENT_TERM: AcademicTerm = {
  id: '1',
  name: 'Semester Ganjil 2023/2024',
  startDate: '2023-09-01',
  endDate: '2024-01-31',
  isActive: true
};

// Data context type
interface DataContextType {
  courses: Course[];
  enrollments: Enrollment[];
  attendances: Attendance[];
  currentTerm: AcademicTerm;
  getStudentCourses: (studentId: string) => Course[];
  getStudentAttendance: (studentId: string, courseId: string) => Attendance[];
  getCourseById: (courseId: string) => Course | undefined;
  getStudentEnrollment: (studentId: string, courseId: string) => Enrollment | undefined;
  markAttendance: (studentId: string, courseId: string, status: Attendance['status']) => void;
  submitCourseRegistration: (studentId: string, courseIds: string[]) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  // Get student courses
  const getStudentCourses = (studentId: string): Course[] => {
    const studentEnrollmentIds = MOCK_ENROLLMENTS
      .filter(enrollment => enrollment.studentId === studentId)
      .map(enrollment => enrollment.courseId);

    return MOCK_COURSES.filter(course => studentEnrollmentIds.includes(course.id));
  };

  // Get student attendance for a course
  const getStudentAttendance = (studentId: string, courseId: string): Attendance[] => {
    return MOCK_ATTENDANCES.filter(
      attendance => attendance.studentId === studentId && attendance.courseId === courseId
    );
  };

  // Get course by ID
  const getCourseById = (courseId: string): Course | undefined => {
    return MOCK_COURSES.find(course => course.id === courseId);
  };

  // Get student enrollment for a course
  const getStudentEnrollment = (studentId: string, courseId: string): Enrollment | undefined => {
    return MOCK_ENROLLMENTS.find(
      enrollment => enrollment.studentId === studentId && enrollment.courseId === courseId
    );
  };

  // Mark attendance for a student in a course
  const markAttendance = (studentId: string, courseId: string, status: Attendance['status']) => {
    const today = new Date().toISOString().split('T')[0];
    
    // Check if attendance already exists for today
    const existingAttendance = MOCK_ATTENDANCES.find(
      attendance => 
        attendance.studentId === studentId && 
        attendance.courseId === courseId && 
        attendance.date === today
    );

    if (existingAttendance) {
      // Update existing attendance
      existingAttendance.status = status;
    } else {
      // Add new attendance
      const newAttendance: Attendance = {
        id: `${MOCK_ATTENDANCES.length + 1}`,
        date: today,
        studentId,
        courseId,
        status
      };
      MOCK_ATTENDANCES.push(newAttendance);
    }
  };

  // Submit course registration
  const submitCourseRegistration = async (studentId: string, courseIds: string[]): Promise<void> => {
    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Remove existing pending enrollments
    const filteredEnrollments = MOCK_ENROLLMENTS.filter(
      enrollment => !(enrollment.studentId === studentId && enrollment.status === 'pending')
    );
    
    // Add new pending enrollments
    courseIds.forEach(courseId => {
      const newEnrollment: Enrollment = {
        id: `${MOCK_ENROLLMENTS.length + 1}`,
        studentId,
        courseId,
        status: 'pending',
        attendancePercentage: 0
      };
      filteredEnrollments.push(newEnrollment);
    });
    
    // Update enrollments (in a real app, this would be an API call)
    MOCK_ENROLLMENTS.length = 0;
    MOCK_ENROLLMENTS.push(...filteredEnrollments);
  };

  return (
    <DataContext.Provider value={{
      courses: MOCK_COURSES,
      enrollments: MOCK_ENROLLMENTS,
      attendances: MOCK_ATTENDANCES,
      currentTerm: CURRENT_TERM,
      getStudentCourses,
      getStudentAttendance,
      getCourseById,
      getStudentEnrollment,
      markAttendance,
      submitCourseRegistration
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
