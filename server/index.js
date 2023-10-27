const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ProductModel = require("./Models/ProductsItems");
const OrderModel = require("./Models/Orders");
const CostsModel = require("./Models/Costs");
const MaterialModel = require("./Models/MaterailEntity");
const RollsModel = require("./Models/Rolls");
const ReelsModel = require("./Models/Reels");
const app = express();
app.use(cors()); //sever side to frontend
app.use(express.json()); // conversion
mongoose.connect("mongodb://127.0.0.1:27017/Cardboard");

//Carboard Box APIS
app.get("/", (req, res) => {
  ProductModel.find({})
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

//Get Single Item
app.get("/cardboard/getItem/:id", (req, res) => {
  const id = req.params.id;
  ProductModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});
// Modify/Update the specific data in db
app.put("/updateItems/:id", (req, res) => {
  const id = req.params.id;
  ProductModel.findByIdAndUpdate(
    { _id: id },
    {
      cardboardname: req.body.cardboardname,
      length: req.body.length,
      width: req.body.width,
      depth: req.body.depth,
      quatity: req.body.quatity,
      rate: req.body.rate,
    }
  )
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

// adding data to the db
app.post("/orderDetails", (req, res) => {
  OrderModel.create(req.body)
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

app.get("/orders", (req, res) => {
  OrderModel.find({})
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});
app.get("/orderDetails/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  OrderModel.findById({ _id: id })
    .then((users) => {
      console.log(users);
      res.json(users);
    })
    .catch((error) => res.json(error));
});

app.get("/cost-Info", (req, res) => {
  CostsModel.find({})
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

app.get("/costprice/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  CostsModel.findById({ _id: id })
    .then((users) => {
      console.log(users);
      res.json(users);
    })
    .catch((error) => res.json(error));
});

app.put("/update-Cost-Price/:id", (req, res) => {
  const id = req.params.id;
  CostsModel.findByIdAndUpdate(
    { _id: id },
    {
      labor: req.body.labor,
      rent: req.body.rent,
      printedSides: req.body.printedSides,
    }
  )
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

app.get("/material-details", (req, res) => {
  MaterialModel.find()
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => res.json(err));
});

app.get("/material-Cost-Price/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  MaterialModel.findById({ _id: id })
    .then((users) => {
      console.log(users);
      res.json(users);
    })
    .catch((error) => res.json(error));
});
app.put("/update-material-Cost-Price/:id", (req, res) => {
  const id = req.params.id;
  MaterialModel.findByIdAndUpdate(
    { _id: id },
    {
      materailName: req.body.materailName,
      paperRate: req.body.paperRate,
      rollRate: req.body.rollRate,
      gamrige: req.body.gamrige,
    }
  )
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

// Cardboard : Rolls APIS

//API#1 : Getting all Rolls Data
app.get("/rolls", (req, res) => {
  RollsModel.find({})
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

//API#2: Getting Single Roll Data by its Name to get its size for Stock data
app.get("/singleroll/:typename", (req, res) => {
  const typename = req.params.typename;
  console.log(req.params.typename);
  RollsModel.find({ Type: typename })
    .select({ "Sizes.Size": 1 })
    .limit(1)
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      res.json(err);
    });
});
//API#1: Getting Single Roll Data by its ID
app.get("/singleroll/:id", (req, res) => {
  const id = req.params.id;
  RollsModel.findById({ _id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

//filter Quantity on the basis of Size and id
app.get("/singleroll/:id/:size", (req, res) => {
  const id = req.params.id;
  const size = req.params.size;
  RollsModel.findOne({ _id: id, "Sizes.Size": size })
    .select({ Sizes: 1 })
    .exec()
    .then((data) => {
      const Size = data.Sizes.filter((obj) => obj.Size == size)[0];
      console.log(Size);
      res.json(Size);
    })
    .catch((error) => res.json(error));
});


//Adding New Quantity stocks in the actual avalaible stock
app.put("/add-roll-stock", async (req, res) => {
  const { type, size, quantity } = req.body;
  console.log(type, size, quantity);

  try {
    const roll = await RollsModel.findOne({ Type: type });

    if (roll) {
      const sizeData = roll.Sizes.find((obj) => obj.Size == size);

      if (sizeData) {
        sizeData.Quantity += quantity;
        await roll.save();

        console.log("Updated Quantity:", sizeData.Quantity);
        res.json({ message: "Stock updated successfully" });
      } else {
        console.log("Size not found");
        res.status(404).json({ error: "Size not found" });
      }
    } else {
      console.log("Type not found");
      res.status(404).json({ error: "Type not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Reducing Stock Quantity
app.put("/reduce-roll-stock", async (req, res) => {
  const { type, size, quantity } = req.body;
  console.log(type, size, quantity);

  try {
    const roll = await RollsModel.findOne({ Type: type });

    if (roll) {
      const sizeData = roll.Sizes.find((obj) => obj.Size == size);

      if (sizeData) {
        sizeData.Quantity -= quantity;
        await roll.save();

        console.log("Updated Quantity:", sizeData.Quantity);
        res.json({ message: "Stock updated successfully" });
      } else {
        console.log("Size not found");
        res.status(404).json({ error: "Size not found" });
      }
    } else {
      console.log("Type not found");
      res.status(404).json({ error: "Type not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//Update Rate of Rolls
app.put("/updaterolls/:id", async (req, res) => {
  const id = req.params.id;
  const { Rate, size, Quantity } = req.body;

  try {
    const rollObj = await RollsModel.findOne({ _id: id, "Sizes.Size": size });

    if (rollObj) {
      // Update Rate and Quantity
      rollObj.Rate = Rate;
      rollObj.Sizes.find((obj) => obj.Size == size).Quantity = Quantity;

      // Save the updated roll
      await rollObj.save();

      console.log("Updated Rate:", rollObj.Rate);
      console.log("Updated Quantity:", Quantity);
    } else {
      console.log("Roll not found");
    }

    res.json({ rollObj });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Cardboard : Reels APIS
app.get("/reels", (req, res) => {
  ReelsModel.find({})
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

app.get("/singlereel/:id/:size", (req, res) => {
  const id = req.params.id;
  const size = req.params.size;
  console.log(size);
  ReelsModel.findOne({ _id: id, "Sizes.Size": size })
    .select({ Sizes: 1 })
    .exec()
    .then((data) => {
      const Size = data.Sizes.filter((obj) => obj.Size == size)[0];
      console.log(Size);
      res.json(Size);
    })
    .catch((error) => res.json(error));
});

app.put("/updatereels/:id", async (req, res) => {
  const id = req.params.id;
  const { Rate, size, Weight } = req.body;

  try {
    const reelObj = await ReelsModel.findOne({ _id: id, "Sizes.Size": size });

    if (reelObj) {
      // Update Rate and Weight
      reelObj.Rate = Rate;
      reelObj.Sizes.find((obj) => obj.Size == size).Weight = Weight;

      // Save the updated roll
      await reelObj.save();

      console.log("Updated Rate:", reelObj.Rate);
      console.log("Updated Weight:", Weight);
    } else {
      console.log("Reel not found");
    }

    res.json({ reelObj });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//run server
app.listen(3001, () => {
  console.log("server is running");
});
