const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const methodOverride = require('method-override');
const app = express();
const Campground = require('./models/campground');

methodOverride('_method');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 

});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected');
})

app.set('view engine', 'ejs')
app.set('vies', path.join(__dirname, 'views'))



app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', async (req,res) => {
    const campgrounds = await Campground.find({})
    
    res.render('campgrounds', {campgrounds})
})

app.get('campgrounds/new', (req, res) => {
    
    res.render('campgrounds/new')
})

app.get('/campgrounds/:id', async (req, res) => {
    const {id} = req.params;
    const camp = await Campground.findById(id);
    
    res.render('campgrounds/show', {camp} )


})
app.put('/campgrounds/:id', async (req, res) => {
    const update = await Campground.findOneAndUpdate()
})




app.listen(3000, () => {
    console.log('port 3000')
})