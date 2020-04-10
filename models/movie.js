const mongoose=require('mongoose');
const Joi=require('joi');
const {generSchema}=require('./genre');
const Movie=mongoose.model('Movie',new mongoose.Schema({
title:String,
genre:{
    type:generSchema,
    required:true
 },
 numberInStock:Number,
 dailyRentalRate:Number
}));

function validateRes(movies){
    const schema={
     title:Joi.string().min(3).required(),
     genreId:Joi.objectId().required(),
     numberInStock:Joi.number(),
     dailyRentalRate:Joi.number().required()
    }
    return Joi.validate(movies, schema);
}
module.exports.Movie=Movie;
module.exports.validate=validateRes;