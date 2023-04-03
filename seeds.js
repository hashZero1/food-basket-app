//seed file is created to seed yout database separately from your web app just for development purposes

const mongoose = require('mongoose');
// for link product file in models
const Product= require('./models/product');
mongoose.connect('mongodb://127.0.0.1:27017/farmHouse', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
    console.log('connection established')
})
.catch(err => {
    console.log('connection error')
    console.log(err)
})

const seedProducts =[
    {
        name: 'Fairy Eggplant',
        price:1.00,
        category:'vegetable'
    },
    {
        name: 'Organic Goddess Melons',
        price:4.99,
        category:'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelons',
        price:5.00,
        category:'fruit'
    },
    {
        name: 'Organic Celery',
        price:2.99,
        category:'vegetable'
    },
    {
        name: 'Chocolate Milk',
        price:2.59,
        category:'dairy'    
    },
]
// One thing to know about INSERT MANY is that if anything does not pass validation nothing will be inserted ITs default Behavior...

//pass the array object in insertMany
Product.insertMany(seedProducts)
.then(res => {
    console.log(res)
})
.catch(err => {
    console.log(err)
})
 
// const p = new Product({
//     name: 'Chocolate',
//     price: '2.59',
//     category: 'dairy'
// })
// p.save().then(() => {
//     console.log(p);
// })