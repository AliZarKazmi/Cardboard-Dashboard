const express =  require ("express")
const mongoose =  require ("mongoose")
const cors =  require ("cors")
const ProductModel = require ('./Models/ProductsItems')
const OrderModel = require ('./Models/Orders')
const CostsModel = require("./Models/Costs")
const MaterialModel = require("./Models/MaterailEntity")
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
app.get('/orderDetails/:id',(req,res)=>{
    const id = req.params.id
    console.log(req.params);
    OrderModel.findById({_id:id})
    .then(users=>{ 
        console.log(users)
        res.json(users)
    })
    .catch(error=>res.json(error))
})


app.get('/cost-Info',(req,res)=>{
    
    CostsModel.find({})
    .then(users=>res.json(users))
    .catch(error=>res.json(error))
})

app.get('/costprice/:id',(req,res)=>{
    const id = req.params.id
    console.log(req.params);
    CostsModel.findById({_id:id})
    .then(users=>{ 
        console.log(users)
        res.json(users)
    })
    .catch(error=>res.json(error))
})


app.put("/update-Cost-Price/:id",(req,res)=>{
    const id = req.params.id 
    CostsModel.findByIdAndUpdate({_id:id},{
        labor:req.body.labor,
         rent:req.body.rent,
         printedSides :req.body.printedSides ,
          })
    .then(users=>res.json(users))
    .catch(error=>res.json(error))
})

app.get("/material-details",(req,res)=>{
    MaterialModel.find({})
    .then(data=>{
        console.log(data)
        res.json(data)
    })
    .catch(err=>res.json(err))
})


//run server
app.listen(3001,()=>{ 
    console.log("server is running")
})