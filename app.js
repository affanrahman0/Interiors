const express = require('express');
const app = express();
const path = require('path');
const port =80;


app.use('/static',express.static('static')); //for serving static files
app.use(express.urlencoded());    // helps to bring the data to the express

// PUG SPECIFIC STUFFS
app.set('view engine', 'pug') //set the template engine as pug
app.set('views',path.join(__dirname,'views')); //set the views directory


app.get("/",(req,res)=>{
    const params = {}
    res.status(200).render('home.pug',params);
})
app.get("/contact",(req,res)=>{
    const params = {}
    res.status(200).render('contact.pug',params);
})


//START THE SERVER
app.listen(port,()=>{
    console.log(`This application has been successfull started on ${port}`)
})