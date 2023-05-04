function updateData(con){

    const updateQuery = "UPDATE `users` SET `name`='Robiul Awal update',`email`='updatail@gmail.com',`password`='@Error404@' WHERE `id`='6' ";

    con.query(updateQuery,function(err){
        if(err){
            console.log(err)
        }else{
            console.log("Update query successful")
        }
    })
}
module.exports = updateData; 