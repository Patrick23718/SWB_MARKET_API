const Product = require('../models/Product');
var fs = require('fs');
var path = require('path');

exports.create_product = (req, res) => {
    let product = new Product({
        name: req.body.name,
        brand: req.body.brand,
        shop: req.body.shop,
        description: req.body.description,
        prix: req.body.prix,
        qte: req.body.qte,
        category: req.body.category
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


exports.get_product = (req, res) => {
    const id = req.params.id;

    if(id.length != 24) return res.status(400).json({message: "Identifiant invalide"})
    Product.findById(id)
        .populate("shop category")
        .exec()
        .then((docs) =>{
            if(docs){
                res.status(200).json({
                    count: docs.length,
                    data: docs
                })
            }else{
                res.status(404).json({
                    message: "Oups!! aucune information pour l'identifiant fourni",
                  });  
            }
            
        }
            
        )
        .catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "Oups!! une erreur est survenue",
            error: err,
        });
    });
}


exports.get_all_client_product = (req, res) => {
    let query = "";
    let page = 0;
    let limit = 20
    if (req.query.page) page = parseInt(req.query.page) - 1;
    if (req.query.limit) limit = parseInt(req.query.limit);
    if (req.query.s) query = req.query.s;
    Product.find({ name: { $regex: query, $options: "$i" }, qte: { $gt: 0 }})
        .populate("shop category")
        .sort({ _id: 1 })
        .limit(limit)
        .skip(page * limit)
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


exports.get_all_product = (req, res) => {
    let query = "";
    let page = 0;
    let limit = 20
    if (req.query.page) page = parseInt(req.query.page) - 1;
    if (req.query.limit) limit = parseInt(req.query.limit);
    if (req.query.s) query = req.query.s;
    Product.find({ name: { $regex: query, $options: "$i" }})
        .populate("shop category")
        .sort({ _id: 1 })
        .limit(limit)
        .skip(page * limit)
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


exports.remove_image = (req, res) => {
    const id = req.params.id;
    if(id.length != 24) return res.status(400).send('Identifiant invalide')

    Product.findOneAndUpdate({_id: id}, { $pull: { images: req.body.image} }).exec().then(doc => {
        if (!doc)
        return res.status(404).json({
          message: "Oups!! aucune information pour l'identifiant fourni",
        });

        var dir = path.dirname(require.main.filename || process.mainModule.filename)
        var imagePath = dir + '\\' + req.body.image;
            console.log(imagePath);
            fs.unlink(imagePath, function (err) {
                if (err) console.log(err);
                // if no error, file has been deleted successfully
                console.log('File deleted!');
            });
      res.status(200).json({
        message: "Mise à jour reussie",
        data: doc,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
    
    // console.log("remove")
    // images.push(element.path)
    
}

// exports.add_image = (req, res) => {
//     const id = req.params.id;
//     if(id.length != 24) return res.status(400).send('Identifiant invalide')

//     Product.findOneAndUpdate({_id: id}, { $push: { images: req.file.path} }).exec().then(doc => {
//         if (!doc)
//         return res.status(404).json({
//           message: "Oups!! aucune information pour l'identifiant fourni",
//         });

//         // var dir = path.dirname(require.main.filename || process.mainModule.filename)
//         // var imagePath = dir + '\\' + req.body.image;
//         //     console.log(imagePath);
//         //     fs.unlink(imagePath, function (err) {
//         //         if (err) console.log(err);
//         //         // if no error, file has been deleted successfully
//         //         console.log('File deleted!');
//         //     });
//       res.status(200).json({
//         message: "Mise à jour reussie",
//         data: doc,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         message: "Oups!! une erreur est survenue",
//         error: err,
//       });
//     });
    
//     // console.log("remove")
//     // images.push(element.path)
    
// }


exports.update_product = (req, res) => {

    const id = req.params.id;
    if(id.length != 24) return res.status(400).send('Identifiant invalide')

    let productModifie = {};

    productModifie.is_visible = req.body.is_visible;
  if (req.body.name) productModifie.name = req.body.name;
  if (req.body.is_visible) productModifie.is_visible = req.body.is_visible;
  if (req.body.brand) productModifie.brand = req.body.brand;
  if (req.body.description) productModifie.description = req.body.description;
  if (req.body.prix) productModifie.prix = req.body.prix;
  if (req.body.qte) productModifie.qte = req.body.qte;
  if (req.body.category) productModifie.category = req.body.category;
  //if (req.file) productModifie.categoryURL = req.file.path;

  Product.updateOne({ _id: id }, { $set: productModifie })
    .exec()
    .then((doc) => {
      if (!doc)
        return res.status(404).json({
          message: "Oups!! aucune information pour l'identifiant fourni",
        });
      res.status(200).json({
        message: "Mise à jour reussie",
        data: doc,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
}

exports.delete_product = (req, res) => {
    const id = req.params.id;
    if(id.length != 24) return res.status(400).send('Identifiant invalide')

    Product.findByIdAndRemove(id)
        .exec()
        .then(docs => {
            if(docs){
                var dir = path.dirname(require.main.filename || process.mainModule.filename)
                var imagePath
                docs.images.forEach(element => {
                    imagePath = dir + '\\' + element;
                    console.log(imagePath);
                    fs.unlink(imagePath, function (err) {
                        if (err) throw err;
                        // if no error, file has been deleted successfully
                        console.log('File deleted!');
                    });
                })
                
                
                res.status(200).json({
                    message: "Suppression réussie",
                    data: docs
                })
            }else{
                res.status(404).json({
                    message: "Oups!! aucune information pour l'identifiant fourni",
                  });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
            message: "Oups!! une erreur est survenue",
            error: err,
            });
        });
}