const express = require("express");
const router = express.Router();

const {
    create
}=require("../controllers/productController");

router.post("/product/create", create);

module.exports = router;