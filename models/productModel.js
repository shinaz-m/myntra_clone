const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        landingPageUrl: {
            type: String,
        },
        productId: {
            type: Number,
        },
        productName: {
            type: String,
        },
        rating: {
            type: Number
        },
        ratingCount: {
            type: Number,
        },
        discount: {
            type: Number,
        },
        brand: {
            type: String,
            maxlength: 100
        },
        searchImage: {
            type: String,
        },
        effectiveDiscountPercentageAfterTax: {
            type: Number,
        },
        effectiveDiscountAmountAfterTax: {
            type: Number,
        },
        inventoryInfo: [{
            skuId: Number,
            label:String,
            inventory:Number,
            availaible:Boolean
            }
         ],
        sizes: {
            type: String
        },
        images: [{
            view:String,
            src:String
        }],
        gender: {
            type: String,
        },
        primaryColour: {
            type: String,
        },
        discountLabel: {
            type: String,
        },
        discountDisplayLabel: {
            type: String,
        },
        additionalInfo: {
            type: String,
        },
        category: {
            type: String,
        },
        mrp: {
            type: Number,
        },
        Price: {
            type: Number,
        },
        colorVariantAvailable: {
            type: Boolean,
        },
        discountType: {
            type: String,
        },
        catalogDate: {
            type: String,
        },
        season: {
            type: String,
        },
        year: {
            type: String,
        },
        systemAttributes: {
            type : Array , "default" : [] 
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);