import React from "react";
import { FaSearch, FaBriefcase, FaBuilding, FaGraduationCap, FaUsers } from "react-icons/fa";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-24">
        <h1 className="text-5xl font-bold mb-4">Find Your Dream Job</h1>
        <p className="text-lg lg:text-2xl mb-6 font-light">
          Discover thousands of career opportunities tailored just for you.
        </p>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto flex items-center bg-white p-4 rounded-full shadow-md transition hover:shadow-lg">
          <input
            type="text"
            placeholder="Search for jobs, companies, or locations"
            className="flex-grow py-3 px-4 rounded-l-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-r-full flex items-center transition">
            <FaSearch className="mr-2" /> Search
          </button>
        </div>
      </section>

      {/* Job Categories Section */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-12">Explore Job Categories</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {[
            { icon: FaBriefcase, title: "Full-Time Jobs", description: "Explore a variety of full-time job opportunities in various industries." },
            { icon: FaBuilding, title: "Part-Time Jobs", description: "Find flexible part-time roles that fit your schedule and needs." },
            { icon: FaGraduationCap, title: "Internships", description: "Gain valuable work experience with internship opportunities." },
            { icon: FaUsers, title: "Remote Jobs", description: "Find remote job opportunities that allow you to work from anywhere." },
          ].map((category, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg hover:scale-105 transition transform duration-300"
            >
              <category.icon className="text-blue-500 text-6xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-10">Why Choose Us?</h2>
          <p className="text-lg text-gray-600 mb-12">
            We connect talented professionals with top employers. Here's why we're the best choice for your career:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Trusted Employers", description: "We partner with top companies who offer excellent career opportunities." },
              { title: "Personalized Job Matches", description: "Get job recommendations based on your skills, experience, and preferences." },
              { title: "Easy Application Process", description: "Apply for jobs with just a few clicks. It's fast and simple!" },
            ].map((reason, index) => (
              <div
                key={index}
                className="bg-gray-100 p-8 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition transform duration-300"
              >
                <h3 className="text-2xl font-bold mb-4">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Start Your Career?</h2>
        <p className="text-lg mb-8">
          Browse thousands of job opportunities and take the next step in your career today!
        </p>
        <button className="bg-white text-blue-600 py-3 px-10 rounded-full text-lg font-semibold hover:bg-gray-100 transition">
          Start Searching
        </button>
      </section>
    </div>
  );
};

export default HomePage;
