const Shop = require('../models/Shop');

exports.create_shop = (req, res) => {
    const userID = req.query.userID
    let newShop = new Shop({
        _id: userID,
        userID: userID,
        shopName: req.body.shopName,
        shopDescription: req.body.shopDescription,
        shopBannerURL: "uploads\\shop\\default.jpg",
        shopAdresse: req.body.shopAdresse
    })

    if (req.file) newShop.shopBannerURL = req.file.path;

    newShop.save()
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

exports.get_shop = (req, res) => {
    let query = "";
  if (req.query.s) query = req.query.s;
Shop.find({ shopName: { $regex: query, $options: "$i" }/*, shopDescription: { $regex: query, $options: "$i" }*/ })
  .populate('userID', 'nom prenom avatar email phone')
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

