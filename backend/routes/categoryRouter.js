import express from 'express'
import { create, deleteCategory, lists, updateCategory } from '../controllers/categoryController.js';
import { protectRoute } from '../middlewares/isAuth.js';

const categoryRouter= express.Router();

// create
categoryRouter.post('/categories/create',protectRoute,create);

// lists
categoryRouter.get('/categories/lists',protectRoute,lists);

// update
categoryRouter.put('/categories/update/:id', protectRoute, updateCategory)

// delete
categoryRouter.delete('/categories/delete/:id', protectRoute,deleteCategory)


export default categoryRouter;



