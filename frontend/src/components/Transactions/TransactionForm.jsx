import React from "react";
import {
  FaCalendarAlt,
  FaRegCommentDots,
  FaWallet,
  FaRupeeSign
} from "react-icons/fa";
import { useTransactionStore } from "../../store/useTransactionStore";
import { useCategoryStore } from "../../store/useCategoryStore";
import { Dollar } from "../Category/dollarSign";

const TransactionForm = () => {
  const {
    type,
    amount,
    category,
    date,
    description,
    errors,
    setField,
    submitTransaction,
    isLoading
  } = useTransactionStore();

  const { categories } = useCategoryStore();

  const today = new Date().toISOString().split('T')[0];


  const handleSubmit = (e) => {
    e.preventDefault();  
    submitTransaction();
  };

  return (
    <div className="relative">
      <Dollar/>
      <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto my-10 bg-white p-6 rounded-lg shadow-lg space-y-6"
      >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Transaction Details
        </h2>
        <p className="text-gray-600">Fill in the details below.</p>
      </div>
     
      {/* Transaction Type Field */}
      <div className="space-y-2">
        <label
          htmlFor="type"
          className="flex gap-2 items-center text-gray-700 font-medium"
        >
          <FaWallet className="text-blue-500" />
          <span>Type</span>
        </label>
        <select
          value={type}
          onChange={(e) => setField("type", e.target.value)}
          id="type"
          className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          required
        >
          <option value="">Select transaction type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-xs">{errors.type}</p>
        )}

      </div>

      {/* Amount Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="amount" className="text-gray-700 font-medium">
          <FaRupeeSign className="inline mr-2 text-blue-500" />
          Amount
        </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setField("amount", e.target.value)}
            id="amount"
            placeholder="Amount"
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
          {errors.amount && (
            <p className="text-red-500 text-xs italic">{errors.amount}</p>
          )}

      </div>

      {/* Category Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="category" className="text-gray-700 font-medium">
          <FaRegCommentDots className="inline mr-2 text-blue-500" />
          Category
        </label>
          <select
            value={category}
            onChange={(e) => setField("category", e.target.value)}
            id="category"
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}

          </select>
          {errors.category && (
            <p className="text-red-500 text-xs italic"> 
              {errors.category}
            </p>
          )}

      </div>

      {/* Date Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="date" className="text-gray-700 font-medium">
          <FaCalendarAlt className="inline mr-2 text-blue-500" />
          Date
        </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setField("date", e.target.value)}
            id="date"
            max={today}
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
          {errors.date && (
            <p className="text-red-500 text-xs italic">{errors.date}</p>
          )}

      </div>

      {/* Description Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="description" className="text-gray-700 font-medium">
          <FaRegCommentDots className="inline mr-2 text-blue-500" />
          Description (Optional)
        </label>
          <textarea
            value={description}
            onChange={(e) => setField("description", e.target.value)}
            id="description"
            placeholder="Description"
            rows="3"
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-xs italic">
              {errors.description}
            </p>
          )}

      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? 'Submitting...' :'Submit Transaction'}
      </button>
     </form>
    </div>
    
  );
};

export default TransactionForm;
