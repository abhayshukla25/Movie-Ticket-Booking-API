const winston=require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports=function(){

winston.exceptions.handle(
    new winston.transports.Console({colorize:true,prettyPrint:true}),
    new winston.transports.File({filename:'uncaughtexceptions.log'})
    );
   
process.on('unhandledRejection',(ex)=>{
throw(ex);
});

const files = new winston.transports.File({ filename: 'combined.log' });
winston.add(files);
//winston.add(new winston.transports.MongoDB({
//db:'mongodb://localhost/vidly',level:'error'},{useUnifiedTopology:true}));

}
  