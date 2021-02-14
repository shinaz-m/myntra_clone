const express = require("express");
const router = express.Router();

const {
    create,
    list,
    filters,
    filterByGender,
    listSearch
}=require("../controllers/productController");

router.post("/product/create", create);
router.get("/products", list);
router.get("/filters",filters)
router.get("/products/filterByGender", filterByGender);
router.get("/products/search", listSearch);


module.exports = router;