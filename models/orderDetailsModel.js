const mongoose=require('mongoose');
const { ObjectId } = mongoose.Schema;

const orderDetailsSchema=new mongoose.Schema(
    {
        totalCount:{
            type:Number,default:-1
        },
        totalPLAShown:{
            type:Number,default:-1
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
            type:String,default:null
        },
        storefrontId:{
            type:String,default:null
        },
        guidedNavigation:{
            name:{type:String,default:null},
            guidedNavEntries:[{type:String}]
        },
        upsInfo:{
            personalizationSortAlgoUsed:{type:String,default:null},
            numPersonalizedProductShown:{type:Number,default:0},
            isPersonalized:{type:Boolean,default:true}
        },
        changeLog:[{
            type:String,
        }],
        appliedParams:{
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
        templateMessage:{
            type:String,default:null
        },
        querySubstitution:{
            type:String,default:null
        },
    },
    {timestamps:true}
)

module.exports=mongoose.model('OrderDetails',orderDetailsSchema);