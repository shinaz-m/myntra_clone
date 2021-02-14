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

exports.filterByGender = (req, res) => {
    Product.find({gender: req.body.gender})
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json(products);
        });
};

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }