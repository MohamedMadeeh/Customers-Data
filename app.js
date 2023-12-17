const express = require("express");
const mongoose = require("mongoose");
const Customer = require("./models/customerSchema");
var moment = require("moment");
var methodOverride = require("method-override");
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

mongoose
  .connect(
    "mongodb+srv://Madeeh:OgcHxSYljQ0DqHmF@cluster0.qcdzykv.mongodb.net/Customer_Data?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
// for automatic refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();

liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// get request ...

app.get("/", (req, res) => {
  Customer.find()
    .then(result => {
      // console.log(result);
      res.render("index.ejs", { arr: result, moment: moment });
    })
    .catch(err => {
      console.log(err);
    });
});
app.get("/user/add", (req, res) => {
  res.render("user/add.ejs");
});

app.get("/user/edit/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then(result => {
      res.render("user/edit.ejs", { arr: result, moment: moment });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/user/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then(result => {
      res.render("user/view.ejs", { arr: result, moment: moment });
    })
    .catch(err => {
      console.log(err);
    });
  // console.log(req.params.id);
});

// get post

// app.post("/user/add", (req, res) => {
//   console.log(req.body);
//   Customer.create(req.body)
//     .then(() => {
//       res.redirect("/");
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

app.post("/user/add", async (req, res) => {
  try {
    //console.log(req.body);
    await Customer.create(req.body);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/search", (req, res) => {
  Customer.find({ fName: req.body.searchText })
    .then(result => {
      //console.log(result);
      res.render("user/search.ejs", { arr: result });
    })
    .catch(err => {
      console.log(err);
    });
});

// get put

app.put("/user/edit/:id", (req, res) => {
  //console.log(req.body);
  Customer.updateOne({ _id: req.params.id }, req.body)
    .then(params => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
});

// delete
app.delete("/delete/:id", (req, res) => {
  Customer.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
});
