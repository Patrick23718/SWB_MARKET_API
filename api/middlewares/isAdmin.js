const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const token = req.header("access_token");
  if (!token) return res.status(401).send("Unauthenticated");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(verified.role);
    if (verified.role >= 3) {
      req.user = verified;

      next();
    } else {
      return res
        .status(401)
        .send(
          "Vous n'avez pas le niveau d'acreditation neccessaire pour obtenir cette ressource. Veuillez contacter l'administrateur"
        );
    }
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};