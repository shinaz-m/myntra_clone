const mongoose=require('mongoose');

const guidedNavigationModelSchema=new mongoose.Schema(
    {
        name:{
            type:String,
        },
        guidedNavEntries:[{
            type:String,
        }],
    },
    {timestamps:true}
)

module.exports=mongoose.model('GuidedNavigation',guidedNavigationModelSchema);