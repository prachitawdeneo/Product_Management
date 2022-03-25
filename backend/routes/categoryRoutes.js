const express=require('express');
const router=express.Router();
const {addCat,getCat,getSubCat, delSubCat,editSubCat,delCat,getSubSpec}=require('../controller/categoryController')

router.post('/addcategory',addCat)

router.get('/getcategory',getCat)

router.get('/getsubcategory',getSubCat)

router.post('/getspecsub',getSubSpec)

router.put('/delsubcategory',delSubCat)

router.put('/updatesubcategory',editSubCat)

router.put('/delcategory',delCat)


module.exports=router;