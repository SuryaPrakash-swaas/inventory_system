const db = require("../jwtAuth/Models/db"); 
async function insertCategory(data) {
  let message;
  try {
    const [rows] = await db.query("SELECT * FROM category WHERE category_name = ?", [
      data.category_name,
    ]);
    if (rows.length) {
      message = "Already Exists";
    } else {
        
        await db.execute(
            "INSERT INTO category(userId,category_name, category_description,is_active,modified_by) VALUES (?,?,?,?,?)",
            [data.userId,data.category_name, data.category_description,true,data.userId]
          );
      message = "Success";
    }
  } catch (error) {
    
    message = "Failed";
  }
  
  return message;
}

async function viewCategory(data) {
    let message;
    let queryResult;
    try {
      const [rows] = await db.query("SELECT * FROM category WHERE userId = ?", [
        data.userId,
      ]);
      if (rows.length) {
        message = "Success";
        queryResult = rows
      } else { 
        message = "Failed";
      }
    } catch (error) {
     
      message = "Error";
    }
    
    return {message, queryResult};
    
  }

  async function editCategory(data) {
    let message;
    try {
        const [rows] = await db.query("SELECT * FROM category WHERE userId = ? and category_id=?", [
            data.userId,data.category_id
          ]);

          if (rows.length) {
            await db.execute(
                "Update category set category_name=?,category_description=? where userId=? and category_id=?",
                [data.category_name, data.category_description,data.userId,data.category_id]
              );
            message = "Success";
          } else {
            
            message = "Failed";
          }
        } catch (error) {
     
          message = "Error";
        }
     
    console.log(message)
    return message;
    
  };


  async function deleteCategory(data) {
    let message;
    try {
        const [rows] = await db.query("SELECT * FROM inventory WHERE category_id=?", [
            data.category_id
          ]);
  
          if (rows.length) {
            message = "Failed";

           
          } else {
            const [userExists] = await db.query("SELECT * FROM category WHERE userId = ? and category_id=?", [
                data.userId,data.category_id
              ]);
              if (userExists.length) {
                await db.query("DELETE from category where userId=? and category_id=?",[
                    data.userId,data.category_id

                ])
             message = "Success";
              }
              else{
                message="Category Not Exists"
              }

           
            
           
          }
        } catch (error) {
         
          message = "Error";
        }
     

    return message;
    
  };


module.exports = {insertCategory, viewCategory, editCategory, deleteCategory};
