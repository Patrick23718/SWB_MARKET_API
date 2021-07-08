const router = require("express").Router();
const adresseController = require("../controllers/adresseController");
;

router.post("/", adresseController.create_adresse);

//! 
router.get("/:id", adresseController.get_adresse);

//! 
router.put("/:id", adresseController.update_adresse);

router.delete('/:id', adresseController.delete_adresse)


module.exports = router;