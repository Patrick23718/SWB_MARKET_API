const router = require("express").Router();
const productController = require("../controllers/productController");
const upload = require("../utils/uploadProduct");

router.post("/", upload.array('image', 8), productController.create_product);

 router.get("/", productController.get_all_product );

// router.get('/:id', categoryController.get_category);

// router.put("/:id", upload.single("categoryURL"), categoryController.update_category);

// router.delete('/:id', categoryController.delete_category);


module.exports = router;