
const auth=require('../middleware/auth');
const admin=require('../middleware/admin');
const mongoose=require('mongoose'); 
const express=require('express');
const router=express.Router();

router.use(express.json());
//this is use for parsing of json() object to request body
 const {validateRes,Genre,generSchema}=require('../models/genre');

     

router.get('/',async (req,res)=>{
//throw new Error('could not get genre');
    const generas=await Genre.find().sort('name');
    res.send(generas);
  });

router.get('/:id',async (req,res)=>{
const gener=await Genre.findById(req.params.id);
if(!gener)
return res.status(404).send('course with given id was not found');
res.send(gener);
});

router.post('/',auth,async (req,res)=>{
    const { error }=validateRes(req.body);
    if(error)
    return res.status(400).send(error.details[0].message);
    const gener=new Genre({
        name:req.body.name
  });
    const result=await gener.save();
    res.send(result);
});

router.put('/:id',async (req,res)=>{
    const { error }=validateRes(req.body);
    if(error)
    return res.status(400).send(error.details[0].message);
  const gener=await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
  if(!gener)
  return res.status(404).send('course with given id was not found');
  res.send(gener);
});

router.delete('/:id',[auth,admin], async (req,res)=>{

    const gener=await Genre.findByIdAndRemove(req.params.id);
 
    if(!gener)
    return res.status(404).send('course with given was not found');
    res.send(gener);
});

module.exports=router;