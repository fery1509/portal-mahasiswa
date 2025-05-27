import { Menu, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

interface HeaderAdminProps {
  onOpenSidebar: () => void;
}

const HeaderAdmin = ({ onOpenSidebar }: HeaderAdminProps) => {
  return (
    <header className="bg-[#000e7c] sticky top-0 z-30 shadow-none">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            {/* Placeholder for logo/title area if needed, or just remove if not */}
            {/* <div className="flex-shrink-0"></div> */}
            {/* "Sistem Informasi Akademik" text - adjusted */}
            <span className="text-3xl md:text-xl font-extrabold text-white tracking-tight">Sistem Informasi Akademik</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative text-white hover:text-blue-200 hover:bg-blue-800">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></span>
            </Button>
            <div className="flex items-center">
              <div className="relative">
                <img
                  className="h-8 w-8 rounded-full ring-2 ring-white"
                  src={`https://ui-avatars.com/api/?name=Admin&background=1e3269&color=fff`}
                  alt="Profile"
                />
                <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white"></div>
              </div>
              <span className="hidden md:flex ml-2 text-sm font-medium text-white">
                Admin
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[4px] bg-[#000e7c] shadow-md" style={{boxShadow:'0 2px 8px 0 rgba(0,14,124,0.10)'}} />
    </header>
  );
};

export default HeaderAdmin; 