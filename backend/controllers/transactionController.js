import Category from "../model/Category.js";
import Transaction from "../model/Transaction.js";
import asyncHandler from 'express-async-handler';


export const createTransaction= asyncHandler(async (req, res) => {
    const { type, category, amount, date, description } = req.body;
    if (!amount || !type || !date) {
        return res.status(400).json({ message: 'Type, amount and date are required' });
    }


    // Create transaction
    const transaction = await Transaction.create({
      user: req.user,
      type,
      category,
      amount,
      date,
      description,
    });
    res.status(201).json(transaction);
  })



  export const filteredTransactions= asyncHandler(async(req,res) =>{
    const {startDate, endDate,type,category}= req.query
    
    let filters= {user: req.user};

    if(startDate){
        filters.date= {...filters.date, $gte: new Date(startDate) }
    }

    if(endDate){
        filters.date= {...filters.date, $lte: new Date(endDate) }
    }
    if (type) {
        filters.type = type;
    }
    if(category){
        if (category === "All") {
            //  No category filter needed when filtering for 'All'
        } else if (category === "Uncategorized") {
            // Filter for transactions that are specifically categorized as 'Uncategorized'
            filters.category = "Uncategorized";
        } else {
            filters.category = category;
        }
    }
    const transaction = await Transaction.find(filters).sort({date:-1});
    res.status(200).json(transaction);
    
  })

export const updateTransactions = asyncHandler(async (req, res) => {
    // Find the transaction by ID
    const transaction = await Transaction.findById(req.params.id);

    // Check if the transaction exists and if the user is authorized to update it
    if (!transaction) {
        
        return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.user.toString() !== req.user.id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this transaction' });
    }


    // Update the transaction fields with the new values or keep the existing ones
    transaction.type = req.body.type || transaction.type;
    transaction.category = req.body.category || transaction.category;
    transaction.amount = req.body.amount || transaction.amount;
    transaction.date = req.body.date || transaction.date;
    transaction.description = req.body.description || transaction.description;

    // Save the updated transaction
    const updatedTransaction = await transaction.save();
    // Respond with the updated transaction
    res.json(updatedTransaction);

});

  export const deleteTransaction= asyncHandler(async(req,res)=>{
    const transaction = await Transaction.findById(req.params.id);
    if (transaction && transaction.user.toString() === req.user.id.toString()) {
        await Transaction.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Transaction removed" });
    }
  })
