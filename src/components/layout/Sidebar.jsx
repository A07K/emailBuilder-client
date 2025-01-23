import { useState } from "react";
import { useRecoilState } from "recoil";
import { sidebarAtom } from "../../store/atoms/sidebarAtom";
import {
  ChevronLeft,
  ChevronRight,
  Layout,
  Image,
  Type,
  ListOrdered,
  Share,
  User,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useRecoilState(sidebarAtom);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleProfileClick = () => {
    setIsDropdownOpen((prevState) => !prevState); // Toggle dropdown
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "http://localhost:5173";
  };

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-white shadow-lg transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-6 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white shadow-lg"
          >
            {isOpen ? (
              <ChevronLeft size={16} color="black" />
            ) : (
              <ChevronRight size={16} color="black" />
            )}
          </button>

          {/* Sidebar Items */}
          <div className="flex flex-col space-y-6 p-4">
            {[
              { icon: <Layout size={24} />, label: "Create", path: "/builder" },
              /*{
                icon: <Image size={24} />,
                label: "Examples",
                path: "/examples",
              },*/
              {
                icon: <Type size={24} />,
                label: "Templates",
                path: "/templates",
              },
              {
                icon: <ListOrdered size={24} />,
                label: "View",
                path: "/view",
              },
              /*{ icon: <Share size={24} />, label: "Export", path: "/export" },*/
            ].map((item, index) => (
              <div
                key={index}
                className={`flex cursor-pointer items-center rounded-lg p-2 hover:bg-gray-100 ${
                  isOpen ? "justify-start space-x-3" : "justify-center"
                }`}
                onClick={() => navigateTo(item.path)}
              >
                {item.icon}
                {isOpen && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Profile Section */}
        <div className="relative p-4">
          <div
            className="flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-lg p-2"
            onClick={handleProfileClick}
          >
            <User size={24} />
            {isOpen && (
              <span className="text-sm font-medium ml-3">Profile</span>
            )}
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              className={`absolute ${
                isOpen ? "left-full -translate-x-4" : "left-full -translate-x-2"
              } bottom-full mb-2 bg-white shadow-lg border border-gray-200 rounded-lg w-48
    transform transition-all duration-200 ease-in-out opacity-100 scale-100
    origin-top-left`}
            >
              <div className="absolute -bottom-2 left-4 h-4 w-4">
                <div className="absolute rotate-45 transform h-2 w-2 bg-white border-r border-b border-gray-200"></div>
              </div>
              <div
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => navigateTo("/profile")}
              >
                Profile
              </div>
              <div
                className="cursor-pointer flex items-center px-4 py-2 hover:bg-gray-100 text-red-500"
                onClick={handleLogout}
              >
                <LogOut size={16} className="mr-2" />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
