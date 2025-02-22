import express from 'express'
import { createTransaction, deleteTransaction, filteredTransactions, updateTransactions } from '../controllers/transactionController.js';
import { protectRoute } from '../middlewares/isAuth.js';

const transactionRouter= express();

// create a transaction
transactionRouter.post('/transaction/create',protectRoute,createTransaction);

// lists
transactionRouter.get('/transaction/lists',protectRoute,filteredTransactions);

//update

transactionRouter.put('/transaction/update/:id',protectRoute,updateTransactions);

// delete
transactionRouter.delete('/transaction/delete/:id',protectRoute,deleteTransaction);

export default transactionRouter;