const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const PORT=8000;
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static('./'));

app.use(cors());

//db connection
const db="mongodb://localhost:27017/project-management";
const connectDB=async()=>{
    try{
        await mongoose.connect(db,{useNewUrlParser:true});
        console.log("MOngoDB connected");
    }
    catch(err){
        console.log(err.message);
    }
}
connectDB();
//end


//routes
//load routes
const categoryRoutes=require('./routes/categoryRoutes');
const { urlencoded } = require('express');
app.use('/category',categoryRoutes);

// const { urlencoded } = require('express');



app.listen(PORT,(err)=>{
    if (err) throw err
    console.log(`Work on ${PORT}`);
})