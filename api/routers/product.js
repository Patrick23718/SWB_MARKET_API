const router = require("express").Router();
const productController = require("../controllers/productController");
const upload = require("../utils/uploadProduct");

router.post("/", upload.array('image', 8), productController.create_product);

 router.get("/", productController.get_all_client_product );

 router.get("/all", productController.get_all_product );

router.get('/:id', productController.get_product);

router.put("/:id", productController.update_product);


router.put("/remove/:id", productController.remove_image);


router.delete('/:id', productController.delete_product);


module.exports = router;