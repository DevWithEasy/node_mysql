const db = require("./database");

const initDatabase = ()=>{
    db.connect(function(err) {
        if (err) {
          console.log("Connection failed");
        }else{
          console.log("Connection established");
        }
        
    })
}
module.exports = initDatabase;