const router = require("express").Router();
const shopController = require("../controllers/shopController");
const upload = require("../utils/upload");

router.post("/", upload.single("shopBannerURL"), shopController.create_shop);

//! 
router.get("/", shopController.get_shop);

// //! 
// router.put("/:id", adresseController.update_adresse);

// router.delete('/:id', adresseController.delete_adresse)


module.exports = router;