const mongoose=require('mongoose');

const subCategorySchema=new mongoose.Schema({
    sub_category_name:{
        type:String,
        unique:true,
    },
    category_id:{
        type:String,
    }

})


module.exports=mongoose.model('sub-category',subCategorySchema)