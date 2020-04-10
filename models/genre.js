const Joi=require('joi');
//this fuction add schema simpler for complex validation
const mongoose=require('mongoose'); 

       const generSchema=new mongoose.Schema({
        //id:Number, this is self generated by mongodb
        name:String
    });

 const Genre=mongoose.model('Genre',generSchema);
 

// const generas=[
//     {id:1,name:'action'},
//     {id:2,name:'horror'},
//     {id:3,name:'comedy'}
// ]

function validateRes(gener)
{
const schema={
    name: Joi.string().min(3).required()
}
return Joi.validate(gener,schema);
}
exports.generSchema=generSchema;
exports.validateRes=validateRes;
exports.Genre=Genre;