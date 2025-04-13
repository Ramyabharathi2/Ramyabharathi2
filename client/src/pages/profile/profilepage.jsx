import React, { useEffect, useState } from 'react';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    role: '',
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  // Load existing user data
  useEffect(() => {
    const fetchData = async () => {
      // Replace with API call
      const userData = JSON.parse(localStorage.getItem("userData")) ;
      setFormData(userData);
    };
    fetchData();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const submitProfile = async (e) => {
    e.preventDefault();
    setLoadingProfile(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage('Profile updated successfully!');
      } else {
        setMessage('Failed to update profile.');
      }
    } catch (err) {
      setMessage('Something went wrong.');
    } finally {
      setLoadingProfile(false);
    }
  };

  const submitPassword = async (e) => {
    e.preventDefault();
    setLoadingPassword(true);
    setPasswordMessage('');

    try {
      const response = await fetch('http://localhost:5000/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        })
      });

      if (response.ok) {
        setPasswordMessage('Password updated successfully!');
        setPasswordData({ oldPassword: '', newPassword: '' });
      } else {
        setPasswordMessage('Failed to update password.');
      }
    } catch (err) {
      setPasswordMessage('Something went wrong.');
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl space-y-8">
      {/* Profile Section */}
      <div>
        <h2 className="text-xl font-bold text-blue-600 mb-4">Edit Profile</h2>
        <form onSubmit={submitProfile} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleProfileChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-2 bg-gray-100 border rounded-lg cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Mobile</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleProfileChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>
         
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              disabled={loadingProfile}
            >
              {loadingProfile ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
          {message && (
            <div className={`text-center ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </div>
          )}
        </form>
      </div>

      <hr className="border-t-2 border-gray-200" />

      {/* Password Section */}
      <div>
        <h2 className="text-xl font-bold text-blue-600 mb-4">Change Password</h2>
        <form onSubmit={submitPassword} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              disabled={loadingPassword}
            >
              {loadingPassword ? 'Updating...' : 'Change Password'}
            </button>
          </div>
          {passwordMessage && (
            <div className={`text-center ${passwordMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
              {passwordMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
