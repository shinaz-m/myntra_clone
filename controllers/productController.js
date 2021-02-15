const Product = require('../models/productModel');
const OrderDetails = require('../models/orderDetailsModel');
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
            orderDetails.products = products;
            orderDetails.totalCount = products.length;
            orderDetails.totalPLAShown = -1;
            orderDetails.totalPLACount = -1;
            orderDetails.sortOptions = ["new", "price_desc", "popularity", "discount", "price_asc", "delivery_time"];
            orderDetails.storefrontId = "test12";
            res.json(orderDetails);
        });

};

exports.filters = async (req, res) => {
    var obj = {
        "gender": [],
        "brand": [],
        "primaryColour": [],
        "category": [],
        "price": []

    };

    //gender filter
    await Product.distinct('gender', {}, (err, genders) => {
        if (!err) {
            obj.gender = genders
        }
    });
    //brand filter
    await Product.distinct('brand', {}, (err, brands) => {
        if (!err) {
            obj.brand = brands
        }
    });
    //primaryColour filter
    await Product.distinct('primaryColour', {}, (err, primaryColour) => {
        if (!err) {
            obj.primaryColour = primaryColour
        }

    });
    //category filter
    await Product.distinct('category', {}, (err, category) => {
        if (!err) {
            obj.category = category
        }

    });

    await Product.aggregate([{
        "$group": {
            "_id": null,
            "max": { "$max": "$price" },
            "min": { "$min": "$price" }
        }
    }]
        , (err, price) => {
            if (!err) {
                let max=price[0].max
                let min=price[0].min
                let interval=(max-min)/4
                let list=[]
                var obj2={}
                for (let i = min; i<=max; i=i+interval) {
                    if (i == min)  obj2 = i + '-' + parseInt(i+interval);
                    if (i != min)  obj2= parseInt(i + 1) + '-' + parseInt(i+interval);
                    
                    list.push(obj2)   
                    }
                obj.price=list
            }

        })
        res.json(obj); 
};


exports.listByFilter = (req, res) => {
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
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
    Product.find(findArgs)
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'Products not found'
            });
        }
        res.json({
            size: data.length,
            data
        });
    });
}

exports.listSearch = (req, res) => {
    // create query object to hold search value 
    const query = {};
    // assign search value to query.name
    
    if (req.body.search) {
        query.productName = { $regex: '^'+req.body.search, $options: 'i' };

        // find the product based on query object 
        Product.find(query, (err, products) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(products);
        })
    }
}
