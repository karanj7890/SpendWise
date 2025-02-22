import React, { useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCategoryStore } from "../../store/useCategoryStore";
import { Dollar } from "./dollarSign";
import toast from "react-hot-toast";


const CategoriesList = () => {
const {categories, getCategories, isLoading, error,deleteCategory} = useCategoryStore();

useEffect(() => {
  getCategories();
}, [getCategories]);

const handleDelete = async (categoryId) => {
  try {
    if (!categoryId) {
      toast.error("Category ID is missing");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete this category?");
    if (!confirmed) return;

    await deleteCategory(categoryId);
   
  } catch (error) {
    toast.error(error.message || "Failed to delete category");
  }
}


if (isLoading) {
  return <div className="max-w-md mx-auto my-10 bg-white p-6 rounded-lg shadow-lg">Loading categories...</div>;
}

if (error) {
  return <div className="max-w-md mx-auto my-10 bg-white p-6 rounded-lg shadow-lg text-red-500">Error: {error}</div>;
}


  return (
    <div className="relative">
      <Dollar/>
      <div className="max-w-md mx-auto my-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text mb-10 text-center p-2">Categories</h2>
      <ul className="space-y-4">
        {categories && categories.length > 0 ? categories.map((category) => (


          <li
            key={category?._id}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
          >
            <div>
              <span className="text-gray-800">{category?.name}</span>
              <span
                className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  category.type === "income"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {category?.type?.charAt(0).toUpperCase() +
                  category?.type?.slice(1)}
              </span>
            </div>
            <div className="flex space-x-3">
              <Link to={`/update-category/${category._id}`}>
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
              </Link>
              <button
                onClick={() => handleDelete(category?._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        )) : (
          <>
            <li className="text-gray-500">No categories found</li>

            <Link to={`/add-category`}>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-color cursor-pointer">
                  Add Category
                </button>
            </Link>
            
          </>
        )}

      </ul>
    </div>
    </div>
    
  );
};

export default CategoriesList;
