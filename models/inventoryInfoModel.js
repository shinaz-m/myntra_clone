const mongoose=require('mongoose');

const inventoryInfoModelSchema=new mongoose.Schema(
    {
        skuId:{
            type:Number,
        },
        label:{
            type:String,
        },
        inventory:{
            type:Number,
        },
        availaible:{
            type:Boolean,
        },
    },
    {timestamps:true}
)

module.exports=mongoose.model('InventoryInfo',inventoryInfoModelSchema);