const mongoose=require('mongoose');

const appliedParamsModelSchema=new mongoose.Schema(
    {
        filters:[{
            type:String,
        }],
        geoFilters:[{
            type:String,
        }],
        rangeFilters:[{
            type:String,
        }],
        sort:{
            type:String
        }
    },
    {timestamps:true}
)

module.exports=mongoose.model('AppliedParams',appliedParamsModelSchema);