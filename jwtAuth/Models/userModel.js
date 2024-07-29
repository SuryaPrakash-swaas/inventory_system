const db = require("./db"); 
async function insertUser(data) {
  let message;
  try {
    const [rows] = await db.query("SELECT * FROM login WHERE email = ?", [
      data.email,
    ]);
    if (rows.length) {
      message = "Already Exists";
    } else {
      await db.execute(
        "INSERT INTO login(userName, email, password) VALUES (?, ?, ?)",
        [data.username, data.email, data.password]
      );
      message = "Success";
    }
  } catch (error) {
    
    message = "Failed";
  }
 
  return message;
}

async function userLogin(data){
    let message;
    let queryResult;
    try{
        const[rows]=await db.query("SELECT * FROM login WHERE email = ? and password = ?", [
            data.email,data.password,
          ]);
          if (rows.length) {
         
            message = "Success";
            queryResult = rows[0]
          }
          else{
            message = "Failed";
          }
    }
    catch (error) {
        
        message = "Error";
      }
      
      return {message, queryResult};
    }


module.exports = { insertUser, userLogin };
