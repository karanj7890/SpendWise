import React, { useState } from 'react';
import { LuLoader } from 'react-icons/lu';
import { useAuthStore } from '../../store/useAuthStore';
import { MdModeEdit } from "react-icons/md";
import { Dollar } from '../Category/dollarSign';

const ProfilePage = () => {
  const { authUser,updateProfile } = useAuthStore();

  // State for form data
  const [formData, setFormData] = useState({
    username: authUser?.username || '',
    email: authUser?.email || '',
  });

  // State for tracking if the profile is being updated
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // State for tracking which field is being edited
  const [isEditingField, setIsEditingField] = useState(null); // 'username' or 'email'

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);


    // Simulate an API call to update the profile
    setTimeout(() => {
      console.log('Updated data:', formData);
      setIsUpdatingProfile(false);
      setIsEditingField(null); // Exit editing mode
    }, 1000);

    await updateProfile(formData);
  };

  return (
    <div className='relative'>
      <Dollar/>
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10" >
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text text-center p-2">Profile Page</h1>

      {/* Username Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Username</h2>
        <div className="relative">
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={isEditingField !== 'username'}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm  pr-10 pl-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your username"
          />
          <button
            onClick={() => setIsEditingField('username')}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-blue-600"
          >
            <MdModeEdit size={20} />
          </button>
        </div>
        {isEditingField === 'username' && (
          <form onSubmit={handleSubmit} className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={isUpdatingProfile}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
            >
              {isUpdatingProfile ? (
                <>
                  <LuLoader className="h-5 w-5 animate-spin inline-block mr-2" />
                  Loading...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        )}
      </div>

      {/* Email Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Email</h2>
        <div className="relative">
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isEditingField !== 'email'}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm pr-10 pl-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your Email"
          />
          <button
            onClick={() => setIsEditingField('email')}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-blue-600"
          >
            <MdModeEdit size={20} />
          </button>
        </div>
        {isEditingField === 'email' && (
          <form onSubmit={handleSubmit} className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={isUpdatingProfile}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
            >
              {isUpdatingProfile ? (
                <>
                  <LuLoader className="h-5 w-5 animate-spin inline-block mr-2" />
                  Loading...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
    </div>
    
  );
};

export default ProfilePage;
