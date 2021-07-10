const Category = require('../models/Category');
var fs = require('fs');
var path = require('path');

exports.create_category = (req, res) => {

    let newCat = new Category({
        catName: req.body.catName,
        catDescription: req.body.catDescription,
        categoryURL: "uploads\\catDefault.jpg",
    })

    if (req.file) newCat.categoryURL = req.file.path;

    newCat.save()
    .then((doc) => {
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
    });
}


exports.get_all_category = (req, res) => {
    let query = "";
  if (req.query.s) query = req.query.s;
    Category.find({ catName: { $regex: query, $options: "$i" }})
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

exports.get_category = (req, res) => {
    const id = req.params.id;

    if(id.length != 24) return res.status(400).json({message: "Identifiant invalide"})
    Category.findById(id)
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

exports.update_category = (req, res) => {

    const id = req.params.id;
    if(id.length != 24) return res.status(400).send('Identifiant invalide')

    let catModifie = {};

  if (req.body.catName) catModifie.catName = req.body.catName;
  if (req.body.catDescription) catModifie.catDescription = req.body.catDescription;
  if (req.file) catModifie.categoryURL = req.file.path;

  Category.update({ _id: id }, { $set: catModifie })
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

exports.delete_category = (req, res) => {
    const id = req.params.id;
    if(id.length != 24) return res.status(400).send('Identifiant invalide')

    Category.findByIdAndRemove(id)
        .exec()
        .then(docs => {
            if(docs){
                var dir = path.dirname(require.main.filename || process.mainModule.filename)
                dir += '\\' + docs.categoryURL;
                console.log(dir);
                fs.unlink(dir, function (err) {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log('File deleted!');
                });
                
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
