import React, { useState } from "react";
import Sidebar from "../Components/SiderBar";

const Profile = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [yearOfFounding, setYearOfFounding] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [companyInformation, setCompanyInformation] = useState("");
  const [buildingNo, setBuildingNo] = useState("");
  const [area, setArea] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [logo, setLogo] = useState(null); // Placeholder for logo file

  // List of countries, states, and cities for the dropdown (use your own data here)
  const countries = ["India", "USA", "Canada", "UK", "Germany"];
  const states = ["Tamil Nadu", "California", "New York", "Texas"];
  const cities = ["Chennai", "New York", "Los Angeles", "London"];

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file)); // Generate a preview URL
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      companyName,
      companyType,
      registrationNumber,
      yearOfFounding,
      email,
      mobile,
      companyInformation,
      buildingNo,
      area,
      country,
      state,
      city,
      postalCode,
      logo,
    });
  };

  return (
    <div className="flex">
      <div>
        <Sidebar/>
      </div>
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg w-full shadow-md ">
      <h2 className="text-2xl font-bold text-center bg-blue-500 rounded-lg p-6 mb-6">Company Profile</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Enter company name"
              required
            />
          </div>

          {/* Company Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Type</label>
            <input
              type="text"
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Enter company type"
              required
            />
          </div>

          {/* Registration Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Registration Number</label>
            <input
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Enter registration number"
              required
            />
          </div>

          {/* Year of Founding */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Year of Founding</label>
            <input
              type="number"
              value={yearOfFounding}
              onChange={(e) => setYearOfFounding(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Enter year of founding"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Enter company email"
              required
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Enter mobile number"
              required
            />
          </div>

          {/* Company Information */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Company Information</label>
            <textarea
              value={companyInformation}
              onChange={(e) => setCompanyInformation(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md h-32"
              placeholder="Enter company information"
              required
            />
          </div>

          {/* Address */}
          <div className="col-span-2 sm:grid sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Building No & Name</label>
              <input
                type="text"
                value={buildingNo}
                onChange={(e) => setBuildingNo(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Building No & Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Area/Locality</label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Enter area/locality"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Postal Code</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Postal code"
              />
            </div>
          </div>

          {/* Country, State, City */}
          <div className="col-span-2 sm:grid sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              >
                <option value="">Select Country</option>
                {countries.map((c, idx) => (
                  <option key={idx} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              >
                <option value="">Select State</option>
                {states.map((s, idx) => (
                  <option key={idx} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              >
                <option value="">Select City</option>
                {cities.map((c, idx) => (
                  <option key={idx} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Company Logo */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Company Logo</label>
            <input
              type="file"
              onChange={handleLogoChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            {logo && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700">Logo Preview</h3>
                <img src={logo} alt="Company Logo" className="mt-2 w-32 h-32 object-cover rounded-md" />
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Profile;
