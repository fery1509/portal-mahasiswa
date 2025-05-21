import { Menu, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderAdminProps {
  onOpenSidebar: () => void;
}

const HeaderAdmin = ({ onOpenSidebar }: HeaderAdminProps) => {
  return (
    <header className="bg-gradient-to-r from-white via-indigo-50 to-purple-50 border-b border-gray-200/80 backdrop-blur-sm bg-white/80 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              type="button"
              className="px-4 text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={onOpenSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-1 flex items-center justify-center md:justify-start">
              <div className="w-full max-w-lg lg:max-w-xs">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    className="block w-full pl-10 pr-3 py-2 border border-indigo-200 rounded-lg leading-5 bg-white/50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search..."
                    type="search"
                  />
                </div>
              </div>
            </div>
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
    </header>
  );
};

export default HeaderAdmin; 