//Video 88
const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactInterior', { useNewUrlParser: true, useUnifiedTopology: true }); //Database with name "contactInterior" is created
const port = 80;

//mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
    email: String,
    address : String
});

const contact = mongoose.model('contact', contactSchema); //collection with name "contacts" will be made

app.use('/static', express.static('static')); //for serving static files
app.use(express.urlencoded());    // helps to bring the data to the express

// PUG SPECIFIC STUFFS
app.set('view engine', 'pug') //set the template engine as pug
app.set('views', path.join(__dirname, 'views')); //set the views directory


app.get("/", (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get("/contact", (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post("/contact", (req, res) => {
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.send("The data has been saved");
    }).catch(()=>{
        res.status(400).send("Item was not saved in the data base")
    });
    //res.status(200).render('contact.pug');
})


//START THE SERVER
app.listen(port, () => {
    console.log(`This application has been successfull started on ${port}`)
})