const mongoose=require('mongoose');

const upsInfoModelSchema=new mongoose.Schema(
    {
        personalizationSortAlgoUsed:{
            type:String,
        },
        numPersonalizedProductShown:{
            type:Number,
        },
        isPersonalized:{
            type:Boolean,
        }
    },
    {timestamps:true}
)

module.exports=mongoose.model('UpsInfo',upsInfoModelSchema);