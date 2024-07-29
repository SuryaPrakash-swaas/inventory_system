const db = require("../jwtAuth/Models/db"); 

async function insertItem(data) {
    let message;
    try {
      const [inventoryExists] = await db.execute("SELECT * FROM inventory WHERE inventory_name = ?", [
        data.inventory_name,
      ]);
      if (inventoryExists.length) {
        message = "Inventory Exists";
      } else {

        const [categoryExists] = await db.execute("SELECT * FROM category WHERE category_id=?", [
            data.category_id
          ]);
          if (categoryExists.length) {
            await db.execute(
                "INSERT INTO inventory(inventory_name,inventory_description,inventory_quantity,inventory_price,userId,category_id,is_active,modified_by) VALUES (?,?,?,?,?,?,?,?)",
                [data.inventory_name,data.inventory_description, data.inventory_quantity,data.inventory_price,data.userId,data.category_id,true,data.userId]
              );
           
         message = "Success";
          }
          else{
            message="Category Not Exists"
          }
          
      }
    } catch (error) {

      message = "Failed";
    }
   
    return message;
  }



  async function viewInventory(data) {
    let message;
    let queryResult;
    try {
      const [inventoryItems] = await db.query("SELECT * FROM inventory WHERE userId = ?", [
        data.userId,
      ]);
      if (inventoryItems.length) {
        message = "Success";
        queryResult = inventoryItems
      } else { 
        message = "Failed";
      }
    } catch (error) {
    
      message = "Error";
    }
    
    return {message, queryResult};
    
  }

  
  async function editInventory(data) {
    let message;
    try {
        const [itemExists] = await db.query("SELECT * FROM inventory WHERE userId = ? and inventory_id=?", [
            data.userId,data.inventory_id
          ]);

          if (itemExists.length) {
            await db.execute(
                "Update inventory set inventory_name=?,inventory_description=?,inventory_quantity=?,inventory_price=?,category_id=? where userId=? and inventory_id=?",
                [data.inventory_name, data.inventory_description,data.inventory_quantity,data.inventory_price,data.category_id,data.userId,data.inventory_id]
              );
            message = "Success";
          } else {
            
            message = "Failed";
          }
        } catch (error) {
          
          message = "Error";
        }
     

    return message;
    
  };


  
  async function deleteInventory(data) {
    let message;
    try {
       
            const [inventoryExists] = await db.query("SELECT * FROM inventory WHERE userId =? and inventory_id=?", [
                data.userId,data.inventory_id
              ]);
              if (inventoryExists.length) {
                await db.query("DELETE from inventory where userId=? and inventory_id=?",[
                    data.userId,data.inventory_id

                ])
             message = "Success";
              }
              else{
                message="Inventory Not Exists"
              }

           

        } catch (error) {
        
          message = "Error";
        }
     
    return message;
    
  };


  async function searchInventory(data) {
    let message;
    let queryResult;
    try {
      const [inventoryItems] = await db.query("SELECT * FROM inventory WHERE userId = ? and inventory_name= ?", [
        data.userId,data.inventory_name
      ]);
      if (inventoryItems.length) {
        message = "Success";
        queryResult = inventoryItems
      } else { 
        message = "Failed";
      }
    } catch (error) {
    
      message = "Error";
    }
    
    return {message, queryResult};
    
  }



  module.exports={insertItem, viewInventory, editInventory, deleteInventory, searchInventory};

