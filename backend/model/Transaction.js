import mongoose from "mongoose";

const TransactionSchema= new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type:{
        type: String,
        required: true,
        enum: ['income', 'expense'],
    },
    category:{
        type: String,
        required: true,
        default: "UnCategorized"
    },
    amount:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    description:{
        type: String,
        required: false
    }
   },
   {
    timestamps: true
   }
)

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;