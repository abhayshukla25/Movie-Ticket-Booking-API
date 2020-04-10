const Joi = require('joi');
const mongoose = require('mongoose');

const Rental=mongoose.model('Rental',new mongoose.Schema({
    customer:{
        type:new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
              },
              isGold: {
                type: Boolean,
                default: false
              },
              phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
              }
        }),
          required:true
    },
    movie:{
        type:new mongoose.Schema({
            title:String,
            dailyRentalRate:Number,
        }),
        required:true
    },
    dayOut:{
        type:Date,
        required:true,
        default:Date.now
    },
    returnedDate:{
        type:Date,
    },
    rentalFee:Number
}));
function validateRes(rent)
{
    const schema={
        customerId:Joi.objectId().required(),
        movieId:Joi.objectId().required()
    }
    return Joi.validate(rent,schema);
}
exports.Rental=Rental;
exports.validate=validateRes;