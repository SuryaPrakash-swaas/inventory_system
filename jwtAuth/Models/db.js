
const mysql=require('mysql2'); 
            const connection=mysql.createConnection(  
                {
                    host:'localhost',  
                    user:'root',  
                    password:'swaas@123',  
                    database:'inventory_system'  
                }  
            );  
            connection.connect((err)=>  
            {  
                if(err)  
                {  
                    console.log("An error occured",err.stack);  
                    return  
                }  
                    console.log("Connected Successfully",connection.threadId);  
            }); 
            module.exports = connection.promise();