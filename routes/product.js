const express = require("express");
const router = express.Router();

const {
    create,
    list,
    filters,
    filterByGender,
    listBySearch
}=require("../controllers/productController");

router.post("/product/create", create);
router.get("/products", list);
router.get("/filters",filters)
router.get("/products/filterByGender", filterByGender);
router.post("/products/by/search", listBySearch);


module.exports = router;