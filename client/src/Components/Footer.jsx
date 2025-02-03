import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import logo from "../assets/logo.png"; // Add your image logo path here

const Footer = () => {
  return (
    <footer className="bg-White border-2 text-gray-800 py-10 mt-12 shadow-md">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company Information */}
        <div className="space-y-4">
          <img src={logo} alt="Logo" className="h-24 " />
          <p className="text-sm text-gray-600">
            Connecting job seekers with top companies. Explore job opportunities, internships, and career tips.
          </p>
          <div className="flex space-x-5 text-blue-600">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-xl hover:text-blue-500 transition-colors" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-xl hover:text-blue-500 transition-colors" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="text-xl hover:text-blue-500 transition-colors" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-xl hover:text-blue-500 transition-colors" />
            </a>
          </div>
        </div>

        {/* Services */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-600">Our Services</h3>
          <ul className="space-y-2">
            <li>
              <a href="/internships" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                Internship Opportunities
              </a>
            </li>
            <li>
              <a href="/jobs" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                Job Opportunities
              </a>
            </li>
            <li>
              <a href="/resume-building" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                Resume Assistance
              </a>
            </li>
            <li>
              <a href="/career-advice" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                Career Advice
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-600">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about-us" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-600">Subscribe</h3>
          <p className="text-sm text-gray-600">
            Get the latest job updates and career tips delivered directly to your inbox.
          </p>
          <form className="flex flex-col">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-100 text-gray-800 p-3 rounded-md mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-blue-600 py-4 text-center text-sm text-white mt-8 shadow-md">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
