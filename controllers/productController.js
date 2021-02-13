const Product = require('../models/productModel');



exports.create = (req, res) => {
    const product = new Product(req.body);
    product.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
};