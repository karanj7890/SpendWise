import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useTransactionStore } from "../../store/useTransactionStore";
import { useCategoryStore } from "../../store/useCategoryStore";
import { Dollar } from "../Category/dollarSign";

const TransactionList = () => {
    const {transactions,isLoading,getTransactions,category,setField,deleteTransactions,updateTransactions}= useTransactionStore();
    const { categories,getCategories } = useCategoryStore();

    const today = new Date().toISOString().split('T')[0];
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    useEffect(()=>{
        getTransactions();
        getCategories();
    },[getTransactions, getCategories])

    const handleDelete = async(transactionId)=>{
      try {
        if (!transactionId) {
          toast.error("Transaction ID is missing");
          return;
        }
    
        const confirmed = window.confirm("Are you sure you want to delete this transaction?");
        if (!confirmed) return;
    
        await deleteTransactions(transactionId);
       
      } catch (error) {
        toast.error(error.message || "Failed to delete category");
      }
    }

    const handleUpdateTransaction = async(transactionId) => {
      const transaction = transactions.find(t => t._id === transactionId);
      if (!transaction) {
        toast.error("Transaction not found");
        return;
      }
      setEditingTransaction(transaction);
      setIsEditModalOpen(true);
    };

    const handleSubmitUpdate = async (updatedData) => {
      try {
        await updateTransactions(editingTransaction._id, updatedData);
        setIsEditModalOpen(false);
        getTransactions(); // Refresh the transaction list
      } catch (error) {
        toast.error("Failed to update transaction");
      }
    };

    if (isLoading) {
        return <div className="max-w-md mx-auto my-10 bg-white p-6 rounded-lg shadow-lg">Loading transactions...</div>;
    }

  return (
    <div className="my-4 p-4 shadow-lg rounded-lg bg-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border border-gray-200 rounded-lg p-4">

        {/* Start Date */}
        <input
          type="date"
          name="startDate"
          max={today}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {/* End Date */}
        <input
          type="date"
          name="endDate"
          max={today}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />

        {/* Type */}
        <div className="relative">
          <select
            name="type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
          >

            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        {/* Category */}
        <div className="relative">
          <select
            name="category"
            value={category}
            onChange={(e) => setField("category", e.target.value)}
            id="category"
            className="w-full p-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <div className="my-4 p-4 shadow-lg rounded-lg bg-white">
        {/* Inputs and selects for filtering (unchanged) */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Filtered Transactions
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {transactions
              ?.filter(transaction => {
                // Filter by date range
                if (startDate && new Date(transaction.date) < new Date(startDate)) return false;
                if (endDate && new Date(transaction.date) > new Date(endDate)) return false;
                // Filter by type
                if (typeFilter && transaction.type !== typeFilter) return false;
                // Filter by category
                if (category && category !== "" && transaction.category !== category) return false;

                return true;
              })
              .map((transaction) => (

              <li
                key={transaction._id}

                className={`bg-white p-3 rounded-md shadow border flex justify-between items-center ${
                  transaction.type === "income" ? "border-green-500" : "border-red-500"
                }`}
              >

                <div>
                  <span className="font-medium text-gray-600">
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                  <span
                    className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.type === "income"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction.type.charAt(0).toUpperCase() +
                      transaction.type.slice(1)}
                  </span>
                  <span className="ml-2 text-gray-800">
                    {transaction.category?.name} - ₹
                    {transaction.amount.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-600 italic ml-2">
                    {transaction.description}
                  </span>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleUpdateTransaction(transaction._id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={async () => {
                      await handleDelete(transaction._id);
                      getTransactions(); // Refresh transactions after deletion
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>

                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative">
        <Dollar/>
      {/* Edit Modal */}
        {isEditModalOpen && editingTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Edit Transaction</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmitUpdate({
                  type: e.target.type.value,
                  category: e.target.category.value,
                  amount: e.target.amount.value,
                  date: e.target.date.value,
                  description: e.target.description.value
                });
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                      name="type"
                      defaultValue={editingTransaction.type}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>
                  <div className="relative">
                    <select
                      name="category"
                      value={category}
                      onChange={(e) => setField("category", e.target.value)}
                      id="category"
                      className="w-full p-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                      type="number"
                      name="amount"
                      defaultValue={editingTransaction.amount}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      name="date"
                      max={today}
                      defaultValue={new Date(editingTransaction.date).toISOString().split('T')[0]}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      name="description"
                      defaultValue={editingTransaction.description}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
