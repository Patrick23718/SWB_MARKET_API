const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../utils/validation");

exports.Hello_Word = (req, res) => {
  res.send("Hello Utilisateur.");
};

exports.user_register = async (req, res) => {
  // Lets validate the data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the user email already exist
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Adresse mail déjà utilisée!");

  // Hash password
  const salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create a new user
  const user = new User({
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    phone: req.body.phone,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.status(201).json({
      message: "Utilisateur créé avec succès",
      doc: savedUser,
    });
    //res.send({user : user._id})
  } catch (err) {
    res.status(400).json({
      message: "Erreur serveur",
      error: err,
    });
  }
};

exports.user_login = async (req, res) => {
  // Lets validate the data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the user email exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email ou mot de passe incorrect");

  //Password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Email ou mot de passe incorrect");

  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  // res.header("access_token", token).send(token);
  res.header("access_token", token).json({
    message: "Log in successfuly",
    token: token,
    doc: user,
  });
};

exports.user_update = async (user, req, res, next) => {
  const id = req.params.userid;
  if (id !== user._id && user.role == 0)
    return res.status(400).json({
      message: "Vous n'avez pas le droit de modifier un autre utilisateur",
    });
  let updateUser = {};
  if (req.body.password) {
    //Password is correct
    const password = await User.findById(id).select("password");

    const validPassword = await bcrypt.compare(
      req.body.oldPassword,
      password.password
    );
    if (!validPassword) return res.status(400).send("Wrong password");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    updateUser.password = hashedPassword;
  }
  if (req.body.nom) updateUser.nom = req.body.nom;
  if (req.body.numero) updateUser.numero = req.body.numero;
  User.updateOne({ _id: id }, { $set: updateUser })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User updated",
        doc: result,
        request: {
          type: "GET",
          url: "http://",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Erreur lors de la modification de l'utilisateur",
        error: err,
      });
    });
};