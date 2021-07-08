const router = require("express").Router();
const userController = require("../controllers/authcontroller");
// const isManager = require("../middlewares/isManger");
// const isAdmin = require("../middlewares/isAdmin");

router.get("/", userController.Hello_Word);

//! REGISTER
router.post("/register", userController.user_register);

//! LOGIN
router.post("/login", userController.user_login);

// //! UPDATE USER
// router.put("/edit/:userid", isManager, userController.user_update);

module.exports = router;