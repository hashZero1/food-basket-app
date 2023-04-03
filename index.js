const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
// TO link product file models in main file index.js
const Product= require('./models/product');
//require to work with other requests
const methodOverride = require('method-override')

mongoose.connect('mongodb://127.0.0.1:27017/farmHouse', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
    console.log('connection established')
})
.catch(err => {
    console.log('connection error')
    console.log(err)
})

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/views/products'));
app.use(methodOverride('_method'))

// setting up the Routes
//to show all product on page
app.get('/products', async (req, res) =>{
    const allProduct = await Product.find({})
    //to render the products
    res.render('products/index', {allProduct})
})
//Routes to make new product
app.get('/products/new', (req, res) =>{
    res.render('products/new')
}) 
//Routes to add new product
app.post('/products', async (req, res) =>{
    const newProduct = new Product(req.body);
    await newProduct.save();
    //whether redirect to main page or to product created using - /${newProduct._id}
    res.redirect(`/products`);
})
//Routes to select particular product
app.get('/products/:id', async (req, res) =>{
    const {id} = req.params;
    const selected = await Product.findById(id)
    res.render('products/show', {selected})
})

//Routes to EDIT Product 
app.get('/products/:id/edit', async (req, res) =>{
    const {id} = req.params;
    const product  =await Product.findById(id)
    res.render('products/edit', {product})
})
app.put('/products/:id', async(req, res) =>{
    const {id} = req.params;
    const product =await Product.findByIdAndUpdate(id , req.body, {runValidators: true, new: true});
    res.redirect(`/products/${product._id}`)    
})
// Routes to DELETE Product
app.delete('/products/:id', async (req, res) =>{
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000, () =>{
    console.log('listening on port 3000')
}) 