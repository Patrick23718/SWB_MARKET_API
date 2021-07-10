const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const upload = require("../utils/upload");

router.post("/", upload.single("categoryURL"), categoryController.create_category);

router.get("/", categoryController.get_all_category );

router.get('/:id', categoryController.get_category);

router.put("/:id", upload.single("categoryURL"), categoryController.update_category);

router.delete('/:id', categoryController.delete_category);


module.exports = router;