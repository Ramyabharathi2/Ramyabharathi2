import React, { useState, useEffect } from "react";
import { FaSearch, FaSignInAlt, FaUserPlus, FaUser, FaSignOutAlt, FaBell } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const storedUser = JSON.parse(localStorage.getItem("userData"));
  const storedAuth = localStorage.getItem("isAuthenticated");
  const [isAuthenticated, setIsAuthenticated] = useState(storedAuth === "true");

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const notifications = [
    { id: 1, message: "New job posted: Software Engineer" },
    { id: 2, message: "Interview scheduled for John tomorrow" },
    { id: 3, message: "Your profile has been updated" },
  ];

  const unreadNotifications = notifications.length;

  const handleLogin = () => {
    navigate("/login");
  };

  const handlelearnpage=()=> navigate("/skill-learning");

  const handledashboard=()=>{

    storedUser.role === "admin" ? navigate("/dashboard") :null
    storedUser.role === "user" ? navigate("/userdashboard") :null
   
  }

  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("userData");
    setIsAuthenticated(false);
    navigate("/");
  };

  const isDashboardPage = location.pathname === "/dashboard";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-dropdown") && !event.target.closest(".profile-button")) {
        setIsProfileMenuOpen(false);
      }
      if (!event.target.closest(".notification-dropdown") && !event.target.closest(".notification-button")) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  return (
    <nav className="bg-white text-black shadow-md border-b-2 font-poppins py-4">
    <div className="container mx-auto flex flex-wrap items-center justify-between px-6">
      
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <img src={logo} alt="Logo" className="h-16 w-auto object-contain" />
      </div>
  
      {/* Center Navigation Links */}
      <div className="flex-1 hidden lg:flex justify-center">
        <ul className="flex space-x-8 text-base font-semibold">
          <li>
            <Link to="/" className="hover:text-blue-500 transition">Home</Link>
          </li>
          <li>
            <Link to="/view-questions" className="hover:text-blue-500 transition">View Questions</Link>
          </li>
          <li>
            <Link to="#" className="hover:text-blue-500 transition">FAQ</Link>
          </li>
        </ul>
      </div>
  
      {/* Right Section - Auth / Dashboard / Actions */}
      <div className="flex items-center space-x-4 mt-4 lg:mt-0">
        {!isAuthenticated && !isDashboardPage && (
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-full py-2 px-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        )}
  
        <button
          onClick={handledashboard}
          className="bg-green-200 text-black py-2 px-6 rounded-full text-sm md:text-base font-semibold hover:bg-orange-500 transition duration-300"
        >
          Dashboard
        </button>
  
        {isAuthenticated ? (
          <div className="relative">
              <button
             onClick={()=>navigate("/playquiz")}
              className="bg-gray-200 text-black py-2 px-6 rounded-full text-sm md:text-base font-semibold hover:bg-blue-500 transition duration-300"
            >
              
              playquiz
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="bg-gray-200 text-black py-2 px-6 rounded-full text-sm md:text-base font-semibold hover:bg-blue-500 transition duration-300"
            >
              <FaUser className="inline-block mr-2" />
              Profile
            </button>
          
            {/* {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                <ul className="text-gray-700">
                  <li><Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</Link></li>
                  <li><Link to="/playquiz" className="block px-4 py-2 hover:bg-gray-100">Play Quiz</Link></li>
                  <li><Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Password Change</Link></li>
                  <li>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                  </li>
                </ul>
              </div>
            )} */}
          </div>
        ) : (
          <>
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white py-2 px-6 rounded-full text-sm md:text-base font-semibold hover:bg-blue-600 transition duration-300"
            >
              <FaSignInAlt className="inline-block mr-2" />
              Login
            </button>
            <Link
              to="/signup"
              className="bg-green-500 text-white py-2 px-6 rounded-full text-sm md:text-base font-semibold hover:bg-green-600 transition duration-300"
            >
              <FaUserPlus className="inline-block mr-2" />
              Signup
            </Link>
          </>
        )}
  
        <button
          onClick={handlelearnpage}
          className="bg-blue-500 text-white py-2 px-6 rounded-full text-sm md:text-base font-semibold hover:bg-orange-600 transition duration-300"
        >
          Learning Skills
        </button>
  
        <Link
          to="/resume-builder"
          className="bg-blue-500 text-white py-2 px-6 rounded-full text-sm md:text-base font-semibold hover:bg-orange-600 transition duration-300"
        >
          Resume Builder
        </Link>
      </div>
    </div>
  </nav>
  
  );
};

export default Navbar;
