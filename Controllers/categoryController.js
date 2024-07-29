const categoryModel=require('../Models/categoryModel')
const addCategory = async (req, res) => {
    const categoryData = {
       category_name:req.body.category_name, 
       category_description:req.body.category_description,
       userId:req.params.userId, 
    };
    const categoryInsert = await categoryModel.insertCategory(categoryData);
    if (categoryInsert === "Success") {
      res.status(200).json({message:"Category Created Successfully"});
      return;
    }
    if (categoryInsert === "Already Exists") {
      res.status(200).json({message:"Category name already exists for this user"});
    }

    if(categoryInsert==="Failed"){
        res.status(500).json({message:'Error during category insertion'})
       
    }
  };

  const viewCategoryList = async(req,res)=>{
    const viewData={
        userId:req.params.userId,
    }
    const categoryView = await categoryModel.viewCategory(viewData);
    if (categoryView.message === "Success") {
        res.status(200).json({message: 'Categories fetched successfully',category_list:categoryView.queryResult})
      return;
    }
    if (categoryView.message === "Failed") {
      res.status(200).json({message:"No Records Found"});
    }

    if(categoryView.message==="Error"){
        res.status(500).json({message:'Error during category fetching'})
       
    }
  };


  const updateCategory = async(req,res)=>{
    const updateData={
        userId:req.params.userId,
        category_id:atob(req.params.category_id),
        category_name:req.body.category_name,
        category_description:req.body.category_description,
    }
    const categoryEdit = await categoryModel.editCategory(updateData);
    if (categoryEdit === "Success") {
        res.status(200).json({message: 'Category Updated Successfully'})
      return;
    }
    if (categoryEdit === "Failed") {
      res.status(200).json({message:"Category not found for this user"});
    }

    if(categoryEdit==="Error"){
        res.status(500).json({message:'Error during category update'})
       
    }
  };

  
  const removeCategory = async(req,res)=>{
    const deleteData={
        userId:req.params.userId,
        category_id:atob(req.params.category_id),
    }
    const categoryDelete = await categoryModel.deleteCategory(deleteData);
    if (categoryDelete === "Success") {
        res.status(200).json({message: 'Category Deleted Successfully'})
      return;
    }
    if (categoryDelete === "Failed") {
      res.status(200).json({message:"Category cannot be deleted as it has associated inventory items"});
    }
    if (categoryDelete==="Category Not Exists"){
        res.status(200).json({message:"Category not found for this user"})
    }

    if(categoryDelete==="Error"){
        res.status(500).json({message:'Error during category update'})
       
    }
  };

  module.exports = {addCategory, viewCategoryList, updateCategory, removeCategory};