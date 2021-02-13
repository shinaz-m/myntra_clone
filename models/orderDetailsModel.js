const mongoose=require('mongoose');

const orderDetailsSchema=new mongoose.Schema(
    {
        totalCount:{
            type:Number,
        },
        totalPLAShown:{
            type:Number,
        },
        totalPLACount:{
            type:Number,
        },
        products:[{
            type: ObjectId,
            ref: "Product",
            required: true
        }],
        sortOptions:[{
            type:String,
        }],
        nextBestResults:[{
            type:String,
        }],
        pageTitle:{
            type:String,
        },
        storefrontId:{
            type:String,
        },
        guidedNavigation:{
            type: ObjectId,
            ref: "GuidedNavigation",
        },
        upsInfo:{
            type: ObjectId,
            ref: "UpsInfo",
        },
        changeLog:[{
            type:String,
        }],
        appliedParams:{
            type: ObjectId,
            ref: "AppliedParams",
        },
        templateMessage:{
            type:String,
        },
        querySubstitution:{
            type:String,
        },
    },
    {timestamps:true}
)

module.exports=mongoose.model('OrderDetails',orderDetailsSchema);