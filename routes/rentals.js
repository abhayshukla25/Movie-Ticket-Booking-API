const auth=require('../middleware/auth');
const {Rental,validate}=require('../models/rental');
const {Customer}=require('../models/customer');
const {Movie}=require('../models/movie');
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();
router.use(express.json());
const Fawn=require('fawn');
Fawn.init(mongoose);

router.get('/',async (req,res)=>{
    const rentals=await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.get('/:id',async (req,res)=>{
    const rentals=await Rental.findById(req.params.id);
    if(!rentals)
    return res.status(404).send('rental with given id was not found');
    res.send(rentals);
});

router.post('/',auth,async (req,res)=>{
    const {error}=validate(req.body)
    if(error)
    return res.status(400).send(error.details[0].message);
    const customer=await Customer.findById(req.body.customerId);
    if(!customer)
    return res.status(400).send('invalid customer...');
    const movie=await Movie.findById(req.body.movieId);
    if(!movie)
    return res.status(400).send('invalid movie...');
    let rentals=new Rental({
       customer:{
           name:customer.name,
           isGold:customer.isGold,
           phone:customer.phone
       },
       movie:{
           title:movie.title,
           dailyRentalRate:movie.dailyRentalRate
       }
    });
   
    //    rentals=await rentals.save();
    //    movie.numberInStock--;
    //    movie.save();
    try{
       new Fawn.Task()
          .save('rentals',rentals)
          .update('movies',{_id:movie._id},{
              $inc:{numberInStock:-1}
          })
          .run();
          res.send(rentals); 
    }
    catch(ex){
        res.status(500).send('something  wrong...');
    }
        
});


module.exports=router;