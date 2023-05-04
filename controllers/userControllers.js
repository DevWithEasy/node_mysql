const db = require("../database/database")

function inserData(req,res){
    const {name , email, password}=(req.body)
    
    const insertQuery = `INSERT INTO users (name, email, password) VALUES ( ?, ?, ?)`;
    const value = [name , email, password]

    db.query(insertQuery,value,function(err){
        if(err){
            console.log(err)
        }else{
            res.send("inset query successful")
        }
    })
}

function updateData(req,res){
    const {name , email, password,id}=(req.body)

    const updateQuery = `UPDATE users SET name = ? , email = ? , password = ? WHERE id = ? `;
    const value = [name , email, password, id]

    db.query(updateQuery,value,function(err){
        if(err){
            console.log(err)
        }else{
            res.send("Update query successful")
        }
    })
}

function deleteData(req,res){

    const deleteQuery = "DELETE FROM `users` WHERE `id` = '5'";

    db.query(deleteQuery,function(err){
        if(err){
            console.log(err)
        }else{
            console.log("Delete query successful")
        }
    })
}

function getData(req, res){
    const getQuery = "SELECT * FROM `users`"
    db.query(getQuery,function(err,data){
        if(err){
            console.log(err)
        }else{
            res.send(data)
        }
    })
}

module.exports = {getData,inserData,updateData,deleteData}