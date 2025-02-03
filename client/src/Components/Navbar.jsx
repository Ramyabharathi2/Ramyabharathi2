import React, { useState, useEffect } from "react";
import { FaSearch, FaSignInAlt, FaUserPlus, FaUser, FaSignOutAlt, FaBell } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
  }, []);

  return (
    <nav className="bg-white text-black shadow-2xl border-4 font-poppins  py-4">
      <div className="container mx-auto flex   items-center justify-between px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-24 w-56 object-contain" />
        </div>

        {/* Navigation Links - Show only when NOT authenticated */}
        {!isAuthenticated && !isDashboardPage && (
          <ul className="flex items-center space-x-8 text-base font-semibold ml-10">
            <li>
              <Link to="/" className="hover:text-blue-500 transition">
                Home
              </Link>
            </li>
            <li className="relative group">
              <Link to="#" className="hover:text-blue-500 transition">
                Jobs
              </Link>
              <ul className="absolute hidden group-hover:block bg-white shadow-md rounded mt-0 p-2 w-40">
                <li>
                  <Link to="#" className="block px-4 py-2 hover:bg-blue-100 rounded">
                    Full Time
                  </Link>
                </li>
                <li>
                  <Link to="#" className="block px-4 py-2 hover:bg-blue-100 rounded">
                    Part Time
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="#" className="hover:text-blue-500 transition">
                FAQ
              </Link>
            </li>
          </ul>
        )}

        {/* Search Bar - Show only when NOT authenticated */}
        {!isAuthenticated && !isDashboardPage && (
          <div className="relative flex-1 max-w-sm mx-10 hidden lg:block">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-full py-2 px-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        )}

        {/* Authentication and Notification Buttons */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="notification-button relative text-gray-600 hover:text-blue-500 transition"
              >
                <FaBell className="text-2xl" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="notification-dropdown absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg z-10">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Notifications
                    </h3>
                  </div>
                  <ul className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <li
                        key={notification.id}
                        className="p-3 hover:bg-gray-100 text-sm text-gray-700"
                      >
                        {notification.message}
                      </li>
                    ))}
                  </ul>
                  <div className="p-2 text-center text-indigo-600 cursor-pointer hover:bg-gray-100">
                    <button onClick={() => setIsNotificationOpen(false)}>
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Profile / Login and Signup */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="profile-button bg-gray-200 text-black py-2 px-6 rounded-full text-sm md:text-base font-semibold hover:bg-blue-500 focus:outline-none flex items-center transition duration-300"
              >
                <FaUser className="mr-2" />
                Profile
              </button>

              {isProfileMenuOpen && (
                <div className="profile-dropdown absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  <ul className="text-gray-700">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        password change
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="bg-blue-500 text-white py-2 px-6 rounded-full text-sm md:text-base font-semibold hover:bg-blue-600 focus:outline-none flex items-center transition duration-300"
              >
                <FaSignInAlt className="mr-2" />
                Login
              </button>
              <Link
                to="/signup"
                className="bg-green-500 text-white py-2 px-6 rounded-full text-sm md:text-base font-semibold hover:bg-green-600 focus:outline-none flex items-center transition duration-300"
              >
                <FaUserPlus className="mr-2" />
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
