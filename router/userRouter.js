const { inserData, updateData, deleteData, getData } = require("../controllers/userControllers");

const router = require("express").Router();

router.post("/add", inserData)
      .put("/update",updateData)
      .delete("/delete",deleteData)
      .get("/",getData)

module.exports = router;