function deleteData(con){

    const deleteQuery = "DELETE FROM `users` WHERE `id` = '5'";

    con.query(deleteQuery,function(err){
        if(err){
            console.log(err)
        }else{
            console.log("Delete query successful")
        }
    })
}
module.exports = deleteData; 