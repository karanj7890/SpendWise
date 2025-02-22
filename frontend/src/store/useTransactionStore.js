import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useTransactionStore = create((set, get) => ({
  // Form state
  type: "",
  amount: "",
  category: "",
  date: "",
  description: "",
  isLoading: false,
  errors: {},
  transactions: [],

  // Update individual field
  setField: (field, value) => set({ [field]: value }),

  // Validate form
  validateForm: () => {
    const { type, amount, category, date } = get();
    const errors = {};

    if (!type) errors.type = "Transaction type is required";
    if (!amount || isNaN(amount) || amount <= 0) 
      errors.amount = "Valid amount is required";
    if (!category) errors.category = "Category is required";
    if (!date) errors.date = "Date is required";

    set({ errors });
    return Object.keys(errors).length === 0;
  },

  // Submit transaction
  submitTransaction: async () => {
    if (!get().validateForm()) {
      toast.error("Please fix form errors");
      return;
    }

    set({ isLoading: true });
    try {
      const response = await axiosInstance.post("/api/auth/transaction/create", {
        type: get().type,
        amount: get().amount,
        category: get().category,
        date: get().date,
        description: get().description,
      });
      toast.success("Transaction added successfully");
      get().resetForm();
      return response.data;
    } catch (error) {
      toast.error("Failed to add transaction");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  getTransactions: async()=>{
    set({isLoading : true});

    try {
      const res= await axiosInstance.get("/api/auth/transaction/lists");
      set({transactions: res.data, isLoading:false});
      return res.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch transactions', isLoading: false });
      toast.error(error.response?.data?.message || 'Failed to fetch transactions');
    }
  },

  updateTransactions: async (id, updatedData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.put(`/api/auth/transaction/update/${id}`, updatedData);
      set((state) => ({
        transactions: state.transactions.map((transaction) =>
          transaction._id === id ? { ...transaction, ...updatedData } : transaction
        ),
      }));
      toast.success("Transaction Updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update transaction");
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTransactions: async(id)=>{
    set({isLoading:true});
    try {
      await axiosInstance.delete(`/api/auth/transaction/delete/${id}`);
      set((state) => ({
        transactions: state.transactions.filter((tra) => tra._id !== id),
        isLoading: false
      }));
      toast.success('Category deleted successfully');
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to delete transaction', isLoading: false });
      toast.error(error.response?.data?.message || 'Failed to delete transaction');
      return null;

    }
  },

  // Reset form
  resetForm: () => set({
    type: "",
    amount: "",
    category: "",
    date: "",
    description: "",
    errors: {},
  }),
}));
