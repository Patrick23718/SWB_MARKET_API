const Adresse = require('../models/Adresse')

exports.create_adresse = (req, res) => {
    const newAdresse = new Adresse({
        country: req.body.country,
        countryCode: req.body.countryCode,
        town: req.body.town,
        quarter: req.body.quarter
    })

    newAdresse.save().then(doc => {
        res.status(201).json({
            message: 'Nouvelle adresse ajoutée',
            data: doc
        })
    }).catch(err => {
        console.log(err),
        res.status(500).json({
            message: 'Oops...\nNous avons rencontré une erreur inatendu.',
            error: err
        })
    })
}

exports.get_adresse = (req, res) => {
    
    const id = req.params.id;
    if(id.length != 24) return res.status(400).json({message: 'Identifiant invalide'})

    Adresse.findById(id).exec().then(doc => {
        // if(doc.length == 0) return res.status(404).json({message: 'Aucune addresse trouvée'})

        res.status(200).json({
            message: '',
            data: doc
        })
    }).catch(err => {
        console.log(err),
        res.status(500).json({
            message: 'Oops...\nNous avons rencontré une erreur inatendu.',
            error: err
        })
    })
}

exports.update_adresse = (req, res) => {

    const id = req.params.id;
    if(id.length != 24) return res.status(400).send('Identifiant invalide')

    let adresseModifie = {};

  if (req.body.country) adresseModifie.country = req.body.country;
  if (req.body.countryCode) adresseModifie.countryCode = req.body.countryCode;
  if (req.body.town) adresseModifie.town = req.body.town;
  if (req.body.quarter) adresseModifie.quarter = req.body.quarter;

  Adresse.update({ _id: id }, { $set: adresseModifie })
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

exports.delete_adresse = (req, res) => {

    const id = req.params.id;
    if(id.length != 24) return res.status(400).send('Identifiant invalide')

    Adresse.remove({ _id: id })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Suppression réussie",
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

