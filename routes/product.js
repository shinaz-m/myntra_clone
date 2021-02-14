const express = require("express");
const router = express.Router();

const {
    create,
    list,
    filters
}=require("../controllers/productController");

router.post("/product/create", create);
router.get("/products", list);
router.get("/filters",filters)

module.exports = router;