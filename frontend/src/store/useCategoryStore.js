import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useCategoryStore = create((set,get) => ({
  categories: [],
  isLoading: false,
  error: null,

  // Create new category
  createCategory: async (categoryData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post("/api/auth/categories/create", categoryData);
      set((state) => ({
        categories: [...state.categories, res.data],
        isLoading: false
      }));
      toast.success('Category created successfully');
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to create category', isLoading: false });
      toast.error(error.response?.data?.message || 'Failed to create category');
    }
  },

  // Get all categories for user
  getCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/api/auth/categories/lists");
      set({ categories: res.data, isLoading: false });
      return res.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch categories', isLoading: false });
      toast.error(error.response?.data?.message || 'Failed to fetch categories');
      return null;


    }
  },

  // Update existing category
  updateCategory: async (id, updateData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.put(`/api/auth/categories/update/${id}`, updateData);
      set((state) => ({
        categories: state.categories.map((cat) =>
          cat._id === id ? response.data : cat
        ),
        isLoading: false
      }));
      toast.success('Category updated successfully');
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to update category', isLoading: false });
      toast.error(error.response?.data?.message || 'Failed to update category');
      return null;

    }
  },

  // Delete category
  deleteCategory: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/api/auth/categories/delete/${id}`);
      set((state) => ({
        categories: state.categories.filter((cat) => cat._id !== id),
        isLoading: false
      }));
      toast.success('Category deleted successfully');
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to delete category', isLoading: false });
      toast.error(error.response?.data?.message || 'Failed to delete category');
      return null;

    }
  }
}));
