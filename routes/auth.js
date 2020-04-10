const config=require('config');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const _=require('lodash');
const Joi=require('joi');
const {User}=require('../models/user');
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();
router.use(express.json());

router.post('/',async (req,res)=>{
    const {error}=validate(req.body)
    if(error)
    return res.status(400).send(error.details[0].message);
    let user=await User.findOne({email:req.body.email});
    if(!user)
    return res.status(400).send('invalid userId or password');
       const valid=await bcrypt.compare(req.body.password,user.password);
       if(!valid)
       return res.status(400).send('invalid userId or password');
       const token=user.generateAuthToken();
     res.send(token); 
});
function validate(user){
const schema={
    email:Joi.string().required().email(),
    password:Joi.string().required()
}
return Joi.validate(user,schema);
}
module.exports=router;