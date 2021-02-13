const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        landingPageUrl: {
            type: String,
            required: true,
        },
        productId: {
            type: Number,
            required: true
        },
        productName: {
            type: String,
            required: true
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
            required: true,
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
            type: ObjectId,
            ref: "InventoryInfo",
            required: true
        }],
        sizes: {
            type: String
        },
        images: {
            type: ObjectId,
            ref: "Category",
            required: true
        },
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