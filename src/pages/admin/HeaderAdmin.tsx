import { Menu } from "lucide-react";

interface HeaderAdminProps {
  onOpenSidebar: () => void;
}

const HeaderAdmin = ({ onOpenSidebar }: HeaderAdminProps) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button
              type="button"
              className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-kampus-primary md:hidden"
              onClick={onOpenSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-1 flex items-center justify-center md:justify-start">
              <div className="flex-shrink-0 flex items-center"></div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-3 relative">
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src={`https://ui-avatars.com/api/?name=Admin&background=6366F1&color=fff`}
                  alt="Profile"
                />
                <span className="hidden md:flex ml-2 text-sm font-medium text-gray-700">
                  Admin
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin; 