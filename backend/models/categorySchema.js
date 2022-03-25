const mongoose=require('mongoose');

const categorySchema=new mongoose.Schema({
    category_name:{
        type:String,
        unique:true
    }

})


module.exports=mongoose.model('category',categorySchema)