import { Menu, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderAdminProps {
  onOpenSidebar: () => void;
}

const HeaderAdmin = ({ onOpenSidebar }: HeaderAdminProps) => {
  return (
    <header className="bg-gradient-to-r from-white via-indigo-50 to-purple-50 sticky top-0 z-30 shadow-none">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center w-full justify-center">
            <span className="text-3xl md:text-xl font-extrabold text-indigo-700 tracking-tight text-left w-full block">Sistem Informasi Akademik</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></span>
            </Button>
            <div className="flex items-center">
              <div className="relative">
                <img
                  className="h-8 w-8 rounded-full ring-2 ring-indigo-500"
                  src={`https://ui-avatars.com/api/?name=Admin&background=6366F1&color=fff`}
                  alt="Profile"
                />
                <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white"></div>
              </div>
              <span className="hidden md:flex ml-2 text-sm font-medium text-indigo-700">
                Admin
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[4px] bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 shadow-md" style={{boxShadow:'0 2px 8px 0 rgba(99,102,241,0.10)'}} />
    </header>
  );
};

export default HeaderAdmin; 