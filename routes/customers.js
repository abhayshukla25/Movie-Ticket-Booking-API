const auth=require('../middleware/auth');
const {validate ,Customer}=require('../models/customer');
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();
router.use(express.json());


router.get('/',async (req,res)=>{
    const result=await Customer.find();
    res.send(result);
});

router.get('/:id',async (req,res)=>{
   const result=await Customer.findById(req.params.id);
   if(!result)
   return res.status(404).send('course with given was not found');
   res.send(result);
});

router.post('/',auth,async (req,res)=>{
    const {error}=validate(req.body)
    if(error)
    return res.status(400).send(error.details[0].message);
    let customers=new Customer({
        isGold:req.body.isGold,
        name:req.body.name,
        phone:req.body.phone
    });
       customers=await customers.save();
        res.send(customers); 
});

router.put('/:id',async (req,res)=>{
    const {error}=validate(req.body)
    if(error)
    return res.status(400).send(error.details[0].message);
    const result=await Customer.findByIdAndUpdate(req.params.id,{
        isGold:req.body.isGold,
        name:req.body.name,
        phone:req.body.phone
    },{new:true});
    if(!result)
   return res.status(404).send('course with given was not found');
   res.send(result);
});

router.delete('/:id',async (req,res)=>{
    const result=await Customer.findByIdAndRemove(req.params.id);
    if(!result)
    return res.status(404).send('course with given was not found');
    res.send(result);
});

module.exports=router;