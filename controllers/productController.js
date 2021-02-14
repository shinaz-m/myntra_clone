const Product = require('../models/productModel');
const OrderDetails=require('../models/orderDetailsModel');
const { errorHandler } = require('../helpers/dbErrorHandler');



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

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    let orderDetails = new OrderDetails()
    Product.find()
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
             orderDetails.products=products;
            orderDetails.totalCount=products.length;
            orderDetails.totalPLAShown=-1;
            orderDetails.totalPLACount=-1;
            orderDetails.sortOptions=["new", "price_desc", "popularity", "discount", "price_asc", "delivery_time"];
            orderDetails.storefrontId="test12";  
            res.json(orderDetails);
        });
         
};

exports.filters = (req, res) => {
    
    Product.distinct('gender', {}, (err, genders) => {
        if (err) {
            return res.status(400).json({
                error: 'genders not found'
            });
        }
        res.json(genders);
    });
};