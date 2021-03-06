const { response } = require('express');
const express=require('express')
const router=express.Router();
const userSchema=require('../models/UserSchaema')
router.get('/',async(req,res)=>{
    try{
          const users=await userSchema.findOne({"email":req.body.email})
          res.json(users)
    }catch(err)
    {
        res.send('Error'+err)
    }
})
router.get('/:email',async(req,res)=>{
    try{
          const users=await userSchema.findOne({"email":req.params.email})
          res.json(users)
    }catch(err)
    {
        res.send('Error'+err)
    }
})

// router.post('/',async(req,res)=>{
//     console.log(req.body.name)
//     res.send("okay")
//     // const userData=new  userSchema({
//     //     // name: req.body.name,
//     //     age: req.body.age,
//     //     weight: req.body.weight,
//     //     // email: req.body.email
//     // })
//     // try{
//     //    const response=await userData.save()
//     //    console.log(response)
//     //    res.json(response)
//     // }catch(err)
//     // {
//     //     res.send('Error')
//     // }
// })
router.post('/',async(req,res)=>{
    console.log(req.body);
   const userdata=new userSchema({
       name:req.body.name,
       age:req.body.age,
       weight:req.body.weight,
       email:req.body.email
   })
   try{

      
        const usersExist=await userSchema.findOne({"email":userdata.email})
    console.log(usersExist);
       if(usersExist)
       {
        console.log('Exists')
        if(req.body.calories)
        {
            const data=await userSchema.updateOne({email:userdata.email },{$set:{calories:( parseInt(usersExist.calories)+parseInt(req.body.calories))}});
            res.json(data); 
        }
        else
        {
            const data=await userSchema.updateOne({email:userdata.email },{$set:{ name:req.body.name,
                age:req.body.age,
                weight:req.body.weight,
                email:req.body.email}});
            res.json(data); 
        }
        }
           else
           {
            console.log('Doesnt Exists')
            const data= await userdata.save()
            res.json(data);    
           }
        
           
        }catch(err)
   {
       res.send(err)
   }

      
   
})

module.exports=router