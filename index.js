const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const methodOverride = require('method-override');
const app = express();
const Campground = require('./models/campground');
const ejsMate = require('ejs-mate');



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


app.engine('ejs', ejsMate)
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));




app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', async (req,res) => {
    const campgrounds = await Campground.find({})
    
    res.render('campgrounds', {campgrounds})
})

app.get('/campgrounds/new', (req, res) => {
    
    res.render('campgrounds/new')
})

app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
})


app.get('/campgrounds/:id', async (req, res) => {
    const {id} = req.params;
    const camp = await Campground.findById(id);
    
    res.render('campgrounds/show', {camp} )

})

app.get('/campgrounds/:id/edit', async (req, res) => {
    
    const campground = await Campground.findById(req.params.id) ;
    res.render(`campgrounds/edit`, {campground})
})

app.put('/campgrounds/:id', async (req,res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground}, {useFindAndModify: false})
    res.redirect(`${campground._id}`)
 })

 app.delete('/campgrounds/:id', async (req, res) => {
     const {id} = req.params;
    const campground = await Campground.findByIdAndDelete(id, {useFindAndModify: false})
    res.redirect('/campgrounds')
 })







app.listen(3000, () => {
    console.log('port 3000')
})