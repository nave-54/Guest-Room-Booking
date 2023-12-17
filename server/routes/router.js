
const express = require("express");
const router = new express.Router();
const conn = require('../db/conn');
const multer = require('multer');

var imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./upload");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  }
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(null, Error("Only image is allowed"));
  }
};

var upload = multer({
  storage: imgconfig,
  fileFilter: isImage
});

router.post("/register", upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
]), (req, res) => {
  const files = req.files;
  const {num } = req.body;
  const {name} = req.body;
  const {rooms} = req.body;
  const {minduration} = req.body;
  const {maxduration} = req.body;
  const {rent} = req.body;
  const {amenities} = req.body;
  const image1 = files['image1'][0].filename;
  const image2 = files['image2'][0].filename;

  try {
    conn.query("INSERT INTO pics (number,name, rooms, minduration, maxduration, rent, amenities, image, imagea) VALUES (?,?,?,?,?,?,?,?,?)",
      [num,name, rooms, minduration,maxduration,rent,amenities, image1, image2], (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 500, error: "Internal Server Error" });
        } else {
          console.log("Data added");
          res.status(201).json({ status: 201, data: req.body });
        }
      });
  } catch (error) {
    res.status(422).json({ status: 422, error });
  }
});

router.delete("/deleteProperty/:id", async (req, res) => {
  const propertyId = req.params.id;

  try {
    conn.query("DELETE FROM pics WHERE name = ?", [propertyId], (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 500, error: "Internal Server Error" });
      } else {
        console.log("Property deleted");
        res.status(200).json({ status: 200, message: "Property deleted successfully" });
      }
    });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(422).json({ status: 422, error: "Unprocessable Entity" });
  }
});

router.get("/getdata", (req, res) => {
  try {
    console.log(req.query.phone)
    conn.query("SELECT * FROM pics WHERE number = ?", [req.query.phone], (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 500, error: "Internal Server Error" });
      } else {
        console.log("Data displayed");
        res.status(201).json({ status: 201, data: result });
      }
    });
  } catch (error) {
    res.status(422).json({ status: 422, error });
  }
});

router.get("/getf", (req, res) => {
  try {
    console.log(req.query.phone)
    conn.query("SELECT * FROM pics", (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 500, error: "Internal Server Error" });
      } else {
        console.log("Data displayed");
        res.status(201).json({ status: 201, data: result });
      }
    });
  } catch (error) {
    res.status(422).json({ status: 422, error });
  }
});



router.post('/logout', (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log('Received Token:', token);

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put("/editProperty/:id", async (req, res) => {
  const propertyId = req.params.id;
  const { minduration, maxduration } = req.body;

  try {
    conn.query("UPDATE pics SET minduration=?, maxduration=? WHERE number=?", [minduration, maxduration, propertyId], (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 500, error: "Internal Server Error" });
      } else {
        console.log("Property updated");
        res.status(200).json({ status: 200, message: "Property updated successfully" });
      }
    });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(422).json({ status: 422, error: "Unprocessable Entity" });
  }
});


module.exports = router;
