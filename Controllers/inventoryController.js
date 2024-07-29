const inventoryModel=require('../Models/inventoryModel')
const addItem = async (req, res) => {
    const inventoryData = {
       inventory_name:req.body.inventory_name, 
       inventory_description:req.body.inventory_description,
       inventory_quantity:req.body.inventory_quantity,
       inventory_price:req.body.inventory_price,
       category_id:req.body.category_id,
       userId:req.params.userId, 
    };
    const itemInsert = await inventoryModel.insertItem(inventoryData);
    if (itemInsert === "Success") {
      res.status(200).json({message:"Item added to inventory successfully"});
      return;
    }
    if (itemInsert === "Inventory Exists") {
      res.status(200).json({message:"Inventory item name already exists for this user"});
    }
    if (itemInsert === "Category Not Exists") {
        res.status(200).json({message:"category ID not found"});
      }

    if(itemInsert==="Failed"){
        res.status(500).json({message:'Error during inventory insertion'})
       
    }
  };

  
  const viewInventoryList = async(req,res)=>{
    const viewData={
        userId:req.params.userId,
    }
    const inventoryView = await inventoryModel.viewInventory(viewData);
    if (inventoryView.message === "Success") {
        res.status(200).json({message: 'Inventory items fetched successfully',inventory_list:inventoryView.queryResult})
      return;
    }
    if (inventoryView.message === "Failed") {
      res.status(200).json({message:"No Records Found"});
    }

    if(inventoryView.message==="Error"){
        res.status(500).json({message:'Error during category fetching'})
       
    }
  };


  const updateInventory = async(req,res)=>{
    const updateData={
        userId:req.params.userId,
        inventory_id:atob(req.params.inventory_id),
        inventory_name:req.body.inventory_name,
        inventory_description:req.body.inventory_description,
        inventory_quantity:req.body.inventory_quantity,
        inventory_price:req.body.inventory_price,
        category_id:req.body.category_id,

    }
    const inventoryEdit = await inventoryModel.editInventory(updateData);
    if (inventoryEdit === "Success") {
        res.status(200).json({message: 'Inventory Item Updated Successfully'})
      return;
    }
    if (inventoryEdit === "Failed") {
      res.status(200).json({message:"Inventory item not found for this user"});
    }

    if(inventoryEdit==="Error"){
        res.status(500).json({message:'Error during item update'})
       
    }
  };


  
  const removeInventory = async(req,res)=>{
    const deleteData={
        userId:req.params.userId,
        inventory_id:atob(req.params.inventory_id),
    }
    const inventoryDelete = await inventoryModel.deleteInventory(deleteData);
    if (inventoryDelete === "Success") {
        res.status(200).json({message: 'Item Deleted Successfully'})
      return;
    }

    if (inventoryDelete==="Inventory Not Exists"){
        res.status(200).json({message:"Inventory item not found for this user"})
    }

    if(inventoryDelete==="Error"){
        res.status(500).json({message:'Error  during item delete'})
       
    }
  };

  const searchInventoryItem = async(req,res)=>{
    const viewData={
        userId:req.params.userId,
        inventory_name:req.params.inventory_name,
    }
    const inventoryItem = await inventoryModel.searchInventory(viewData);
    if (inventoryItem.message === "Success") {
        res.status(200).json({message: 'Inventory items fetched successfully',inventory_list:inventoryItem.queryResult})
      return;
    }
    if (inventoryItem.message === "Failed") {
      res.status(200).json({message:"No Records Found"});
    }

    if(inventoryItem.message==="Error"){
        res.status(500).json({message:'Error during category fetching'})
       
    }
  };
  module.exports={addItem, viewInventoryList, updateInventory, removeInventory, searchInventoryItem}