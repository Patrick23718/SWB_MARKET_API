const Product = require('../models/Product');
var fs = require('fs');
var path = require('path');

exports.create_product = (req, res) => {
    let product = new Product({
        name: req.body.name
    })

    let images = [];
    
    if(req.files){
        // let array = req.files
        // console.log(array);
        req.files.forEach(element => {
            images.push(element.path)
        });
        product.images = images;
    }

    product.save().then((doc) => {
        res.status(201).json({
          message: "Enregistrement réussi",
          data: doc,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Oups!! une erreur est survenue",
          error: err,
        });
      })
}


exports.get_all_product = (req, res) => {
    let query = "";
  if (req.query.s) query = req.query.s;
    Product.find({ name: { $regex: query, $options: "$i" }})
        .exec()
        .then((docs) =>
        res.status(200).json({
            count: docs.length,
            data: docs
        })
        )
        .catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "Oups!! une erreur est survenue",
            error: err,
        });
    });
}