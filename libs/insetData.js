function inserData(con){

    const insertQuery = "INSERT INTO `users`(`name`, `email`, `password`) VALUES ('Robiul Awal','robiulawal68@gmail.com','@Error404@')"

    con.query(insertQuery,function(err){
        if(err){
            console.log(err)
        }else{
            console.log("inset query successful")
        }
    })
}
module.exports = inserData; 