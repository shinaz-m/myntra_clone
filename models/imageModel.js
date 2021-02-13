const mongoose=require('mongoose');

const imageModelSchema=new mongoose.Schema(
    {
        view:{
            type:String,
        },
        src:{
            type:String,
        },
    },
    {timestamps:true}
)

module.exports=mongoose.model('Image',imageModelSchema);