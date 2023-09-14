const express =  require ("express")
const mongoose =  require ("mongoose")
const cors =  require ("cors")
const ProductModel = require ('./Models/ProductsItems')
const OrderModel = require ('./Models/Orders')
const app = express()
app.use(cors()) //sever side to frontend
app.use(express.json()) // conversion



mongoose.connect("mongodb://127.0.0.1:27017/Cardboard")


//Get all data from Data base
app.get('/',(req,res)=>{
    ProductModel.find({})
    .then(users=>res.json(users))
    .catch(error=>res.json(error))
})


//Get Single Item
app.get("/cardboard/getItem/:id",(req,res)=>{
    const id = req.params.id
    ProductModel.findById({_id:id})
    .then(users=>res.json(users))
    .catch(error=>res.json(error))
})
// Modify/Update the specific data in db
app.put("/updateItems/:id",(req,res)=>{
    const id = req.params.id 
    ProductModel.findByIdAndUpdate({_id:id},{
        cardboardname:req.body.cardboardname,
         length:req.body.length,
         width :req.body.width ,
          depth :req.body.depth,
           quatity :req.body.quatity,
           rate :req.body.rate})
    .then(users=>res.json(users))
    .catch(error=>res.json(error))
})


// adding data to the db
app.post('/orderDetails', (req, res)=>{
    OrderModel.create(req.body)
    .then(users=>res.json(users))
    .catch(error=>res.json(error))
})

app.get('/orders',(req,res)=>{
    OrderModel.find({})
    .then(users=>res.json(users))
    .catch(error=>res.json(error))
})
//run server
app.listen(3001,()=>{ 
    console.log("server is running")
})