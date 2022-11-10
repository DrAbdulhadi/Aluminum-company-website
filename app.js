const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const fs = require('fs');
const path = require('path');
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
require('dotenv/config')

const app = express();
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
    );
    app.use(bodyParser.json());
app.set("view engine", "ejs");
    
app.use(express.static("public"));

const databaseSchema = new mongoose.Schema({
    user: {
       
        date: Date,
        name: String ,
         address: String,
         phoneNumber: Number,
         length: String,
         kitchenType: String ,
         upSide: Boolean ,
    }
        
});

const Alitimad=new mongoose.model("AlItimad",databaseSchema)
//$       Image Upload          //

let multer = require("multer");

let storage = multer.diskStorage({
    destination: (req, file, cb) =>
    {
        cb(null, "uploads")
    },
    filename: (req, file, cb) =>
    {
        cb(null, file.fieldname + "-" + Date.now())
    }
});

let upload = multer({ storage: storage });

var imgModel = require("./model");


app.get("/Admin", (req, res) =>
{
    imgModel.find({}, (err, items) =>
    {
        if (err)
        {
            console.log(err);
            res.status(500).send("An Error Occured", err);
        } else
        {
            res.render("imagesPage", { items: items });
        }
    });
});

app.post("/", upload.single("image"), (req, res, next) =>
{
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + "/uploads/" + req.file.filename)),
            contentType: "image/png"
        }
    }
    imgModel.create(obj, (err, item) =>
    {
        if (err)
        {
            console.log(err);
        } else
        {
            item.save();
            res.redirect("/")
        }
    })
});
//#                               //



//$         Database Declarations   //
mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() =>
{
    console.log('connected-to-DB');
}).catch(err =>
{
    console.log(err.message)
});



app.get("/", function (req, res)
{
    res.render("index")
    
});
app.get("/admin/orders", function (req, res)
{
    
    
    
    Alitimad.find({}, function (err, ordrs)
    {
        // console.log(ordrs);
        
        res.render("orders", {
            orders: ordrs
        });
    });
    
});

app.post("/callOrders", function (req, res)
{
    let date = new Date();
    let name = req.body.name;
    let phone = req.body.phone;
    let address = req.body.address;
    let length = req.body.length;
    let top = req.body.top;
    let type = req.body.type
    
    // console.log(req.body, type);
    // Alitimad.find({},function (err,obj) {
    //     console.log(obj);
    // })
    var registerOrder = new Alitimad({
        user: {
            
            date: date,
            name: name   ,
             address: address,
             phoneNumber: phone,
             length: length,
             kitchenType: type ,
             upSide: true ,
        }
    })
    registerOrder.save();
    setTimeout(() => res.redirect("/"), 2660);
});


//$         GET & POST Requests     //
// app.get("/main", function (req, res)
// {
//     res.render("index.html")
// });

// app.get("/Admin", function (req, res)
// {
    
// });

// app.post("/infoRequest", function (req, res)
// {
    
// });




//$          Listening Port         //
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));