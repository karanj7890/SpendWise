import Category from "../model/Category.js";
import Transaction from "../model/Transaction.js";
import asyncHandler from 'express-async-handler'

  // Add
  export const create= asyncHandler(async (req, res) => {
    const { name, type } = req.body;
    if (!name || !type) {
        return res.status(400).json({message:"Name and type are required for creating a category"})
    }
    // converting the name to lowercasr
    const normalizedName = name.toLowerCase();
    
    // Check if the type is valid or not
    const validTypes = ["income", "expense"];
    if (!validTypes.includes(type.toLowerCase())) {
        return res.status(400).json({message:"Invalid type. Type must be either income or expense"});
    }
    // Check if category already exists for the user
    const categoryExists = await Category.findOne({
      name: normalizedName,
      user: req.user,
    });

    if (categoryExists) {
        return res.status(400).json({message:`Category ${categoryExists.name} already exists for the user`});
    }

    // Create the category
    const category = await Category.create({
      name: normalizedName,
      user: req.user,
      type,
    });
    res.status(201).json(category);
  })

  // Lists
 export const lists = asyncHandler(async (req, res) => {
    const categories = await Category.find({ user: req.user });
    res.status(200).json(categories);
  })

  // Update
  export const updateCategory= asyncHandler(async (req, res) => {
    const { type, name } = req.body;
    const normalizedName = name.toLowerCase();
    const category = await Category.findById(req.params.id);

    if (category && category.user.toString() === req.user.id.toString()) {
    const oldName = category.name;
    // Update category properties
    category.name = normalizedName || category.name;
    category.type = type || category.type;
    const updatedCategory = await category.save();
    //Update affected transaction
    if (oldName !== updatedCategory.name) {
      await Transaction.updateMany(
        {
          user: req.user,
          category: oldName,
        },
        { $set: { category: updatedCategory.name } }
      );
    }
    res.status(200).json(updatedCategory);
  }
  else{
    return res.status(404).json({ message: "Category not found or user not authorized" });
  }
  })

  // Delete

  export const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (category && category.user.toString() === req.user.id.toString()) {
      // Update transactions that have this category
      const defaultCategory = "Uncategorized";
      await Transaction.updateMany(
        { user: req.user, category: category.name },
        { $set: { category: defaultCategory } }
      );

      // Remove category
      await Category.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Category removed and transactions updated" });
    } else {
      res.status(400).json({ message: "Category not found or user not authorized" });
    }
  })
