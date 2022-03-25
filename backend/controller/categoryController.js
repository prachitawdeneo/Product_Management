const categoryModel=require('../models/categorySchema') 
const subCategoryModel=require('../models/subCategorySchema') 

async function addCat(req,res){
    console.log(req.body)    
    let ins= new categoryModel({category_name:req.body.cat});
     ins.save((err,data)=>{
        if(err){
            res.json({
                err:1,
                msg:"Category already Added!"
            })
        }
        else{
            console.log(data._id);
            console.log("category Added")
            console.log();
            if(req.body.subcat!==undefined){
                console.log(req.body.subcat.length);
                console.log(req.body.subcat.length>1);
                if(req.body.subcat.length>1){       
                 req.body.subcat.map(sub=>
                    {
                    let ins= new subCategoryModel({category_id:data._id,sub_category_name:sub})
                    ins.save((err)=>{
                        if(err){
                            res.json({
                                err:1,
                                msg:"Sub-Category already Added!"
                            })
                        }
                        // console.log(res);
                        else{
                            console.log("Sub category Added") 
                            // res.json({
                            //     err:0,
                            //     msg:"Data Saved.Category Added!"
                            // })
                        }
                        
                    
                    })
                })
                res.json({
                    err:0,
                    msg:"Data Saved.Category Added!"
                })
                }
                else{
                    let ins= new subCategoryModel({category_id:data._id,sub_category_name:req.body.subcat[0]})
                    ins.save((err)=>{
                        if(err){
                            res.json({
                                err:1,
                                msg:"Sub-Category already Added!"
                            })
                        }
                        // console.log(res);
                        else{
                            console.log("Sub category Added")  
                            res.json({
                                err:0,
                                msg:"Data Saved.Category Added!"
                            })

                        }
                    })
                }
            }
        
        }
    })
}

async function getCat(req,res){
    categoryModel.find({},(err,data)=>{
        if (err){
            res.json({
                err:1,
                msg:"Data Not Found!"
            })
        }
        else{
            res.json({
                err:0,
                msg:"Categories Fetched!",
                categories:data
            })
        }
    })
}

async function getSubCat(req,res){
    subCategoryModel.find({},(err,data)=>{
        if (err){
            res.json({
                err:1,
                msg:"Data Not Found!"
            })
        }
        else{
            res.json({
                err:0,
                msg:"Sub-Categories Fetched!",
                sub_categories:data
            })
        }
    })
}

async function getSubSpec(req,res){
    console.log(req.body);
    subCategoryModel.find({category_id:req.body.id},(err,data)=>{
        if (err){
            res.json({
                err:1,
                msg:"Data Not Found!"
            })
        }
        else{
            console.log(data);
            res.json({
                err:0,
                msg:"Sub-Categories Fetched!",
                sub_categories:data
            })
        }
    })
}

async function delSubCat(req,res){
    console.log(req.body);
    subCategoryModel.deleteOne({_id:req.body.id},(err,result)=>{
        if(err){
            console.log(err);
            res.json({
                err:1,
                msg:"Data Not Found!"
            })
        }
        else{
            console.log(result);
            res.json({
                err:0,
                msg:"Sub-Category Deleted!",
            })
        }
    })
}

async function delCat(req,res){
    console.log(req.body);
    
    categoryModel.deleteOne({_id:req.body.id},(err,result)=>{
        if(err){
            console.log(err);
            res.json({
                err:1,
                msg:"Data Not Found!"
            })
        }
        else{
            console.log(result);
            // res.json({
            //     err:0,
            //     msg:"Category Deleted!",
            // })
           
            subCategoryModel.deleteMany({category_id:req.body.id},(err,result)=>{
                if(err){
                    console.log(err);
                    res.json({
                        err:1,
                        msg:"Sub-Category Not Found!"
                    })
                }
                else{
                    console.log(result);
                    res.json({
                        err:0,
                        msg:"Category Deleted!",
                    })
        
                }
            })
        }
    })

    
}


async function editSubCat(req,res){
    console.log(req.body);
    subCategoryModel.updateOne({_id:req.body.id},{sub_category_name:req.body.subcat},(err,result,data)=>{
        console.log(data);
        if (err){
            console.log(err);
            res.json({
                err:1,
                msg:"Data Not Found!"
            })
        }
        else{
            console.log(result);
            res.json({
                err:0,
                msg:"Sub-Category Updated!",
            })
        }
    })
    
}

module.exports={addCat,getCat,getSubCat,delSubCat,editSubCat,delCat,getSubSpec}