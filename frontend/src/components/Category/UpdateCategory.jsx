import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaWallet,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useCategoryStore } from "../../store/useCategoryStore";
import { Dollar } from "./dollarSign";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateCategory, isLoading } = useCategoryStore();

  const [formData, setFormData] = useState({
    type: "",
    name: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!id) {
      toast.error("Invalid category ID");
      navigate("/categories");
    }
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = "Category name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (!id) {
      toast.error("Category ID is missing");
      return;
    }
    
    const success = await updateCategory(id, formData);
    if (success) {
      
      setTimeout(() => {
        navigate("/categories");
      }, 1000);
    }

  };

  return (
      <div className="relative">
        <Dollar />
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow m-10">
          <h2 className="text-2xl font-semibold mb-4 text-center">Update Category</h2>
          <p className="text-gray-600 text-center mb-5">Update the details below.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="type"
                className="flex gap-2 items-center text-gray-700 font-medium"
              >
                <FaWallet className="text-blue-500" />
                <span>Type</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                
              >
                <option value="">Select transaction type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block font-medium text-gray-700 mb-1 gap-2 items-center"
              >
                <MdOutlineDriveFileRenameOutline className="inline mr-2 text-blue-500" />
                Category Name 
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category name"
                required
              />
               {errors.name && (
                  <p className="text-red-500 text-xs italic">{errors.name}</p>
                )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {isLoading ? "Updating..." : "Update Category"}
            </button>
          </form>
        </div>
      </div>
  );
};

export default UpdateCategory;
