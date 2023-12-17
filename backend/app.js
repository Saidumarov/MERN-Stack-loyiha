const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// Config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect
mongoose.connect(
  `mongodb+srv://saidumarovjafarxon:NItpL7wziDXP4gMy@cluster0.rli84ck.mongodb.net/contact?retryWrites=true&w=majority`
);
//password
const pass = "NItpL7wziDXP4gMy";

//data sechema
const contactSchema = {
  name: String,
  user: String,
  number: Number,
};

// data model
const Contact = mongoose.model("Contact", contactSchema);

// read route
app.get("/contact", (req, res) => {
  Contact.find()
    .then((contacts) => res.json(contacts))
    .catch((err) => res.status(400).json(err));
});

// create route
app.post("/newContact", (req, res) => {
  const newContact = new Contact({
    name: req.body.name,
    user: req.body.user,
    number: req.body.number,
  });
  newContact
    .save()
    .then((contact) => console.log(contact))
    .catch((err) => res.status(400).join(err));
});

// delete route
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Contact.findByIdAndDelete({ _id: id })
    .then((result) => {
      if (result) {
        res.status(200).json({ message: "Delete successful" });
      } else {
        res.status(404).json({ message: "Contact not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// update route
app.put("/put/:id", async (req, res) => {
  const updateContact = {
    name: req.body.name,
    user: req.body.user,
    number: req.body.number,
  };
  const id = req.params.id;

  try {
    const result = await Contact.findByIdAndUpdate(
      { _id: id },
      { $set: updateContact },
      { new: true }
    );

    if (result) {
      console.log("Update successful");
      res
        .status(200)
        .json({ message: "Update successful", updatedContact: result });
    } else {
      console.log("Contact not found");
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Port
app.listen(5000, () => {
  console.log("Server ishgaga tushdi port 5000...");
});
